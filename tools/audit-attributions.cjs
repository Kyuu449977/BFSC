const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
vm.runInContext(
  fs.readFileSync(path.join(root, 'src/js/data.js'), 'utf8') +
    ';globalThis.__regional=REGIONAL_DATABASES;',
  context
);
const databases = context.__regional;
const sources = JSON.parse(fs.readFileSync(path.join(root, 'src/images/sources.json'), 'utf8'));
const regions = Object.keys(databases);
const entries = [];
const counts = {};
const validUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch (_) {
    return false;
  }
};

for (const region of regions) {
  const summary = { total: 0, attributed: 0, reviewRequired: 0 };
  for (const group of Object.values(databases[region])) {
    for (const dish of group.dishes || []) {
      summary.total++;
      const candidates = Object.entries(sources).filter(([, record]) => record.file === dish.image);
      const complete = candidates.filter(
        ([, record]) =>
          typeof record.artist === 'string' &&
          record.artist.trim() &&
          typeof record.license === 'string' &&
          record.license.trim() &&
          validUrl(record.source)
      );
      const signatures = new Set(
        complete.map(([, record]) =>
          JSON.stringify([
            record.artist.trim(),
            record.license.trim(),
            record.source,
            record.licenseUrl || '',
          ])
        )
      );
      const assetExists =
        typeof dish.image === 'string' && fs.existsSync(path.join(root, 'src', dish.image));
      let attribution = null;
      let reason = 'missing-source-record';
      if (!assetExists) reason = 'missing-image-asset';
      else if (signatures.size > 1) reason = 'conflicting-source-records';
      else if (complete.length === 1) {
        const [sourceKey, record] = complete[0];
        attribution = {
          sourceKey,
          title: record.title || '',
          artist: record.artist.trim(),
          source: record.source,
          license: record.license.trim(),
          ...(validUrl(record.licenseUrl) ? { licenseUrl: record.licenseUrl } : {}),
          note: record.note || '',
        };
        reason = null;
      } else if (complete.length > 1 && signatures.size === 1) {
        const [sourceKey, record] = complete[0];
        attribution = {
          sourceKey,
          title: record.title || '',
          artist: record.artist.trim(),
          source: record.source,
          license: record.license.trim(),
          ...(validUrl(record.licenseUrl) ? { licenseUrl: record.licenseUrl } : {}),
          note: record.note || '',
        };
        reason = null;
      } else if (candidates.length) reason = 'incomplete-source-record';

      const reviewRequired = !attribution;
      summary[reviewRequired ? 'reviewRequired' : 'attributed']++;
      entries.push({
        region,
        id: dish.id,
        name: dish.name,
        file: dish.image,
        reviewRequired,
        ...(reason ? { reason } : {}),
        ...(attribution ? { attribution } : {}),
      });
    }
  }
  counts[region] = summary;
}
const report = {
  schemaVersion: 1,
  generatedFrom: ['src/js/data.js: REGIONAL_DATABASES', 'src/images/sources.json'],
  methodology:
    'Attribution is present only when an exact image-file record contains artist, license, and an HTTPS source. Conflicting records for the same image are flagged for review. This structural audit does not independently validate upstream claims.',
  summary: {
    total: entries.length,
    attributed: entries.filter((entry) => !entry.reviewRequired).length,
    reviewRequired: entries.filter((entry) => entry.reviewRequired).length,
    regions: counts,
  },
  entries,
};
const output = path.join(root, 'docs/reports/image-attribution-audit.json');
fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n', 'utf8');
console.log(JSON.stringify(report.summary, null, 2));
