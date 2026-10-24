/* Atomic collection increments. localStorage is a migration/compatibility mirror only. */
class CollectionStore {
  constructor(ids, legacy, onChange) {
    this.ids = new Set(ids);
    this.legacy = { ...legacy };
    this.onChange = onChange;
    this.revision = -1;
    this.db = null;
    try {
      this.channel = new BroadcastChannel('food_case_collection_updates');
      this.channel.onmessage = () => this.refresh();
    } catch (_) {}
    window.addEventListener('storage', (event) => {
      if (event.key === 'food_case_collection') this.refresh();
    });
    this.ready = this.open()
      .then(async (db) => {
        this.db = db;
        if (!db) return null;
        const state = await this.transaction([], true);
        this.apply(state);
        return state;
      })
      .catch(() => {
        this.db = null;
        return null;
      });
  }
  clean(counts) {
    const clean = {};
    if (counts && typeof counts === 'object' && !Array.isArray(counts))
      for (const id of this.ids)
        if (Number.isSafeInteger(counts[id]) && counts[id] > 0) clean[id] = counts[id];
    return clean;
  }
  open() {
    return new Promise((resolve) => {
      let request,
        settled = false;
      const finish = (value) => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          resolve(value);
        } else value?.close();
      };
      const timeout = setTimeout(() => finish(null), 2000);
      try {
        request = indexedDB.open('food_case_data', 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains('state'))
            request.result.createObjectStore('state');
        };
        request.onerror = () => finish(null);
        request.onblocked = () => finish(null);
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => {
            db.close();
            this.db = null;
          };
          finish(db);
        };
      } catch (_) {
        finish(null);
      }
    });
  }
  transaction(ids, initialize = false) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('state', ids.length || initialize ? 'readwrite' : 'readonly');
      const store = tx.objectStore('state'),
        request = store.get('collection');
      let output;
      request.onsuccess = () => {
        const raw = request.result;
        const state = {
          counts: this.clean(raw?.counts || this.legacy),
          revision: Number.isSafeInteger(raw?.revision) && raw.revision >= 0 ? raw.revision : 0,
          outcomes: [],
        };
        for (const id of ids) {
          if (!this.ids.has(id)) {
            tx.abort();
            return;
          }
          const count = state.counts[id] || 0;
          state.counts[id] = Math.min(Number.MAX_SAFE_INTEGER, count + 1);
          state.outcomes.push({ isNew: !count, count: state.counts[id] });
        }
        if (ids.length) state.revision++;
        if (ids.length || (initialize && !raw))
          store.put({ counts: state.counts, revision: state.revision }, 'collection');
        output = state;
      };
      tx.oncomplete = () => resolve(output);
      tx.onerror = tx.onabort = () => reject(tx.error || new Error('Không lưu được bộ sưu tập.'));
    });
  }
  apply(state) {
    if (!state || state.revision < this.revision) return;
    this.revision = state.revision;
    this.onChange({ ...state.counts });
  }
  async refresh() {
    await this.ready;
    if (!this.db) return;
    try {
      this.apply(await this.transaction([]));
    } catch (_) {}
  }
  async increment(ids) {
    await this.ready;
    if (!this.db) return null;
    const state = await this.transaction(ids);
    this.apply(state);
    // An old mirror cannot overwrite the transactional source of truth.
    if (state.revision === this.revision)
      try {
        localStorage.setItem('food_case_collection', JSON.stringify(state.counts));
      } catch (_) {}
    try {
      this.channel?.postMessage({ revision: state.revision });
    } catch (_) {}
    return state;
  }
}
