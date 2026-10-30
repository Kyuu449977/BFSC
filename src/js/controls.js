/* Bespoke visual controls. Native values remain the application data interface. */
const CustomControls = (() => {
  const selects = new Map(),
    disclosures = new Map();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let opened = null;
  let tooltip = null,
    tooltipTarget = null,
    tooltipTimer;
  function hideTooltip() {
    clearTimeout(tooltipTimer);
    if (tooltipTarget) {
      const remaining = (tooltipTarget.getAttribute('aria-describedby') || '')
        .split(' ')
        .filter((id) => id && id !== 'appTooltip');
      if (remaining.length) tooltipTarget.setAttribute('aria-describedby', remaining.join(' '));
      else tooltipTarget.removeAttribute('aria-describedby');
    }
    tooltip?.remove();
    tooltip = null;
    tooltipTarget = null;
  }
  function showTooltip(target, delay = 300) {
    if (target === tooltipTarget) return;
    hideTooltip();
    tooltipTarget = target;
    tooltipTimer = setTimeout(() => {
      if (!target.isConnected || target.disabled) {
        hideTooltip();
        return;
      }
      tooltip = document.createElement('div');
      tooltip.id = 'appTooltip';
      tooltip.className = 'control-tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.textContent = target.getAttribute('aria-label') || target.dataset.tooltip;
      document.body.append(tooltip);
      const rect = target.getBoundingClientRect(),
        width = tooltip.offsetWidth,
        height = tooltip.offsetHeight;
      Object.assign(tooltip.style, {
        left:
          Math.max(12, Math.min(innerWidth - width - 12, rect.left + (rect.width - width) / 2)) +
          'px',
        top:
          (rect.bottom + height + 16 < innerHeight ? rect.bottom + 8 : rect.top - height - 8) +
          'px',
      });
      target.setAttribute(
        'aria-describedby',
        [target.getAttribute('aria-describedby'), 'appTooltip'].filter(Boolean).join(' ')
      );
      Experience.animate(
        tooltip,
        { opacity: [0, 1], transform: ['translateY(-3px)', 'translateY(0px)'] },
        { duration: 0.14 }
      );
    }, delay);
  }
  function closeAll() {
    hideTooltip();
    if (!opened) return;
    opened.list.hidden = true;
    opened.trigger.setAttribute('aria-expanded', 'false');
    opened.trigger.removeAttribute('aria-activedescendant');
    opened = null;
  }
  function sync(control) {
    const { source, trigger, label, list } = control;
    label.textContent = source.selectedOptions[0]?.textContent || 'Chọn';
    trigger.disabled = source.disabled;
    list.querySelectorAll('[role=option]').forEach((option, index) => {
      option.setAttribute('aria-selected', String(index === source.selectedIndex));
      if (source.options[index]) option.textContent = source.options[index].textContent;
    });
    if (source.disabled && opened === control) closeAll();
  }
  function activate(control, index) {
    const options = [...control.source.options];
    if (!options[index] || options[index].disabled) return;
    control.active = index;
    control.list
      .querySelectorAll('[role=option]')
      .forEach((item, i) => item.toggleAttribute('data-active', i === index));
    const option = control.list.children[index];
    control.trigger.setAttribute('aria-activedescendant', option.id);
    const top = option.offsetTop,
      bottom = top + option.offsetHeight;
    if (top < control.list.scrollTop) control.list.scrollTop = top;
    else if (bottom > control.list.scrollTop + control.list.clientHeight)
      control.list.scrollTop = bottom - control.list.clientHeight;
  }
  function position(control) {
    const rect = control.trigger.getBoundingClientRect();
    const viewport = window.visualViewport;
    const height = viewport?.height || innerHeight;
    if (rect.bottom < 0 || rect.top > innerHeight) {
      closeAll();
      return false;
    }
    const topOffset = viewport?.offsetTop || 0;
    const below = topOffset + height - rect.bottom - 12,
      above = rect.top - topOffset - 12;
    const upward = below < 180 && above > below;
    control.upward = upward;
    const width = Math.min(rect.width, innerWidth - 24);
    const maxHeight = Math.max(48, Math.min(288, upward ? above : below));
    Object.assign(control.list.style, {
      width: width + 'px',
      maxHeight: maxHeight + 'px',
      left: Math.max(12, Math.min(rect.left, innerWidth - width - 12)) + 'px',
    });
    control.list.style.top =
      (upward ? rect.top - control.list.offsetHeight - 6 : rect.bottom + 6) + 'px';
    return true;
  }
  function show(control) {
    if (control.source.disabled) return;
    if (opened === control) return;
    closeAll();
    opened = control;
    control.list.hidden = false;
    if (!position(control)) return;
    control.trigger.setAttribute('aria-expanded', 'true');
    activate(control, control.source.selectedIndex);
    Experience.animate(
      control.list,
      {
        opacity: [0, 1],
        transform: [
          `translateY(${control.upward ? 4 : -4}px) scale(.99)`,
          'translateY(0px) scale(1)',
        ],
      },
      { duration: 0.16 }
    );
  }
  function choose(control, index) {
    if (control.source.options[index]?.disabled) return;
    const changed = control.source.selectedIndex !== index;
    control.source.selectedIndex = index;
    sync(control);
    closeAll();
    control.trigger.focus({ preventScroll: true });
    if (changed) {
      control.source.dispatchEvent(new Event('input', { bubbles: true }));
      control.source.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  function enhanceSelect(source) {
    if (selects.has(source)) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.id = source.id + 'Control';
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.className = 'custom-select-label';
    const chevron = document.createElement('span');
    chevron.className = 'control-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    trigger.append(label, chevron);
    const list = document.createElement('div');
    list.className = 'custom-select-list';
    list.id = source.id + 'Options';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    trigger.setAttribute('aria-controls', list.id);
    const name = document.querySelector(`label[for="${source.id}"]`);
    if (name) {
      name.htmlFor = trigger.id;
      if (!name.id) name.id = source.id + 'Label';
      trigger.setAttribute('aria-labelledby', name.id + ' ' + trigger.id);
      list.setAttribute('aria-labelledby', name.id);
    } else trigger.setAttribute('aria-label', source.getAttribute('aria-label') || 'Chọn');
    source.before(wrapper);
    wrapper.append(source, trigger);
    source.classList.add('select-source');
    source.tabIndex = -1;
    source.setAttribute('aria-hidden', 'true');
    document.body.append(list);
    const control = { source, trigger, label, list, active: source.selectedIndex };
    selects.set(source, control);
    [...source.options].forEach((option, index) => {
      const item = document.createElement('div');
      item.setAttribute('role', 'option');
      item.id = source.id + 'Option' + index;
      item.textContent = option.textContent;
      if (option.disabled) item.setAttribute('aria-disabled', 'true');
      item.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse') e.preventDefault();
      });
      item.onclick = () => choose(control, index);
      list.append(item);
    });
    trigger.onclick = () => (opened === control ? closeAll() : show(control));
    source.addEventListener('change', () => sync(control));
    let typed = '',
      typedAt = 0;
    trigger.onkeydown = (event) => {
      const key = event.key;
      if (key === 'Escape' && opened === control) {
        event.preventDefault();
        event.stopPropagation();
        closeAll();
        return;
      }
      if (key === 'Tab') {
        closeAll();
        return;
      }
      if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(key)) {
        event.preventDefault();
        if (key === 'Enter' || key === ' ') {
          if (opened === control) choose(control, control.active);
          else show(control);
          return;
        }
        const wasOpen = opened === control;
        show(control);
        let index =
          key === 'Home'
            ? 0
            : key === 'End'
              ? source.options.length - 1
              : wasOpen
                ? control.active + (key === 'ArrowDown' ? 1 : -1)
                : source.selectedIndex;
        index = Math.max(0, Math.min(source.options.length - 1, index));
        activate(control, index);
        return;
      }
      if (key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        const now = performance.now();
        typed = now - typedAt > 700 ? key : typed + key;
        typedAt = now;
        const normalize = (value) =>
          value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/đ/g, 'd');
        const index = [...source.options].findIndex((option) =>
          normalize(option.textContent).startsWith(normalize(typed))
        );
        if (index >= 0) {
          show(control);
          activate(control, index);
        }
      }
    };
    sync(control);
  }
  function enhanceDisclosure(details) {
    if (disclosures.has(details)) return;
    const summary = details.querySelector(':scope > summary');
    if (!summary) return;
    const body = document.createElement('div');
    body.className = 'disclosure-body';
    for (const child of [...details.childNodes]) if (child !== summary) body.append(child);
    details.append(body);
    const state = { animation: null, expanded: details.open };
    disclosures.set(details, state);
    summary.addEventListener('click', (event) => {
      event.preventDefault();
      const target = state.animation ? !state.expanded : !details.open;
      state.animation?.cancel();
      state.expanded = target;
      details.open = target;
      if (reduced.matches || document.hidden) {
        details.style.removeProperty('overflow');
        state.animation = null;
        return;
      }
      details.open = true;
      details.style.overflow = 'hidden';
      const animation = body.animate(
        {
          opacity: target ? [0, 1] : [1, 0],
          transform: target
            ? ['translateY(-4px)', 'translateY(0)']
            : ['translateY(0)', 'translateY(-4px)'],
        },
        { duration: 200, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
      state.animation = animation;
      animation.finished
        .then(() => {
          if (state.animation !== animation) return;
          details.open = target;
          details.style.removeProperty('overflow');
          state.animation = null;
          animation.cancel();
        })
        .catch(() => {});
    });
  }
  function refresh() {
    document.querySelectorAll('[title]').forEach((element) => {
      element.dataset.tooltip = element.title;
      element.removeAttribute('title');
    });
    document.querySelectorAll('select').forEach(enhanceSelect);
    document.querySelectorAll('details').forEach(enhanceDisclosure);
    syncAll();
    // Detached result cards must not remain retained after rerolls.
    for (const [details, state] of disclosures)
      if (!details.isConnected) {
        state.animation?.cancel();
        disclosures.delete(details);
      }
  }
  function syncAll() {
    selects.forEach(sync);
  }
  function syncVisualViewport() {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const root = document.documentElement;
    root.style.setProperty('--visual-viewport-height', `${Math.round(viewport.height)}px`);
    root.style.setProperty('--visual-viewport-offset-top', `${Math.round(viewport.offsetTop)}px`);
    const dialog = document.querySelector('dialog[open]');
    const focused = document.activeElement;
    if (!dialog || !focused || !dialog.contains(focused)) return;
    const rect = focused.getBoundingClientRect();
    const visibleTop = viewport.offsetTop + 12;
    const visibleBottom = viewport.offsetTop + viewport.height - 16;
    if (rect.top >= visibleTop && rect.bottom <= visibleBottom) return;
    let scrollable = focused.parentElement;
    while (
      scrollable &&
      scrollable !== dialog &&
      scrollable.scrollHeight <= scrollable.clientHeight
    ) {
      scrollable = scrollable.parentElement;
    }
    scrollable = scrollable || dialog;
    if (rect.bottom > visibleBottom) scrollable.scrollTop += rect.bottom - visibleBottom;
    else if (rect.top < visibleTop) scrollable.scrollTop -= visibleTop - rect.top;
  }
  function settle() {
    closeAll();
    for (const [details, state] of disclosures) {
      if (state.animation) {
        state.animation.cancel();
        details.open = state.expanded;
        details.style.removeProperty('overflow');
        state.animation = null;
      }
    }
  }
  document.addEventListener('pointerover', (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target && event.pointerType === 'mouse' && matchMedia('(hover:hover)').matches)
      showTooltip(target);
  });
  document.addEventListener('pointerout', (event) => {
    if (
      tooltipTarget &&
      tooltipTarget.contains(event.target) &&
      !(event.relatedTarget instanceof Node && tooltipTarget.contains(event.relatedTarget))
    )
      hideTooltip();
  });
  document.addEventListener('focusin', (event) => {
    if (event.target.matches('[data-tooltip]:focus-visible')) showTooltip(event.target, 150);
  });
  document.addEventListener('focusout', hideTooltip);
  document.addEventListener('click', hideTooltip);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') hideTooltip();
  });
  document.addEventListener('pointerdown', (event) => {
    if (opened && !opened.trigger.contains(event.target) && !opened.list.contains(event.target))
      closeAll();
  });
  document.addEventListener(
    'scroll',
    (event) => {
      hideTooltip();
      if (opened && !opened.list.contains(event.target)) position(opened);
    },
    true
  );
  window.addEventListener('resize', closeAll);
  window.visualViewport?.addEventListener('resize', closeAll);
  window.visualViewport?.addEventListener('resize', syncVisualViewport);
  window.visualViewport?.addEventListener('scroll', syncVisualViewport);
  document.addEventListener('focusin', (event) => {
    if (event.target.matches('input, textarea, select')) requestAnimationFrame(syncVisualViewport);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) settle();
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) settle();
  });
  document.addEventListener('DOMContentLoaded', refresh);
  return { refresh, syncAll, closeAll, settle };
})();
