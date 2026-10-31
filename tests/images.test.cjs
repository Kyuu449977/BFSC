const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');

const dataSource = fs.readFileSync('src/js/data.js', 'utf8');
const regionsContext = vm.createContext({});
vm.runInContext(dataSource + ';globalThis.__regional=REGIONAL_DATABASES;', regionsContext);
const regions = regionsContext.__regional;
const sources = JSON.parse(fs.readFileSync('src/images/sources.json', 'utf8'));
const audit = JSON.parse(fs.readFileSync('docs/reports/image-attribution-audit.json', 'utf8'));
const auditByDish = new Map(audit.entries.map((entry) => [`${entry.region}:${entry.id}`, entry]));

function allDishes() {
  return Object.entries(regions).flatMap(([region, database]) =>
    Object.values(database).flatMap((group) =>
      (group.dishes || []).map((dish) => ({ region, dish }))
    )
  );
}

test('all five regional catalogs have exact asset and attribution audit coverage', () => {
  const all = allDishes();
  assert.equal(all.length, 350);
  assert.equal(new Set(all.map(({ dish }) => dish.id)).size, 350);
  assert.equal(audit.entries.length, 350);
  assert.equal(audit.summary.total, 350);
  assert.deepEqual(Object.keys(audit.summary.regions).sort(), ['en', 'ja', 'ko', 'vi', 'zh']);

  for (const { region, dish } of all) {
    const row = auditByDish.get(`${region}:${dish.id}`);
    assert.ok(row, `${region}:${dish.id} audit row`);
    assert.equal(row.name, dish.name, `${region}:${dish.id} name`);
    assert.equal(row.file, dish.image, `${region}:${dish.id} image`);
    assert.ok(
      fs.existsSync(path.join('src', dish.image)),
      `${region}:${dish.id} image file exists`
    );

    if (row.reviewRequired) {
      assert.equal(
        row.attribution,
        undefined,
        `${region}:${dish.id} has no fabricated source/license`
      );
      continue;
    }
    const source = sources[row.attribution.sourceKey];
    assert.ok(source, `${region}:${dish.id} source record exists`);
    assert.equal(source.file, dish.image, `${region}:${dish.id} exact file match`);
    assert.equal(source.artist, row.attribution.artist);
    assert.equal(source.license, row.attribution.license);
    assert.equal(source.source, row.attribution.source);
  }
});

test('runtime attribution falls back without mutating catalog data and exposes localized note', () => {
  const recordMap = Object.fromEntries(
    audit.entries.map((entry) => [
      entry.id,
      {
        file: entry.file,
        reviewRequired: entry.reviewRequired,
        displayApproved: entry.displayApproved,
        reason: entry.reason,
        ...(entry.attribution ? { attribution: entry.attribution } : {}),
      },
    ])
  );
  const context = vm.createContext({ window: { BFSC_ATTRIBUTION_DATA: recordMap } });
  vm.runInContext(
    fs.readFileSync('src/js/attribution.js', 'utf8') + ';globalThis.__attribution=Attribution;',
    context
  );
  const dishes = allDishes();
  let known = dishes.find(
    ({ region, dish }) => !auditByDish.get(`${region}:${dish.id}`).reviewRequired && !auditByDish.get(`${region}:${dish.id}`).displayApproved
  );
  const unresolved = dishes.find(
    ({ region, dish }) => auditByDish.get(`${region}:${dish.id}`).reviewRequired && !auditByDish.get(`${region}:${dish.id}`).displayApproved
  );
  assert.ok(unresolved);
  const approved = dishes.find(({region,dish}) => auditByDish.get(`${region}:${dish.id}`).displayApproved);
  assert.ok(approved);
  assert.equal(context.__attribution.imageFor(approved.dish), approved.dish.image);
  if (!known) {
    // A fully replaced catalog may have no licensed entry. Exercise the verified
    // metadata branch with an independent fixture rather than skipping coverage.
    const fixture = { id: 'verified_fixture', image: 'images/verified.webp' };
    context.window.BFSC_ATTRIBUTION_DATA[fixture.id] = {
      file: fixture.image, reviewRequired: false,
      attribution: { source: 'https://example.org/photo', artist: 'Fixture', license: 'CC0' },
    };
    known = { dish: fixture };
  }

  const knownOriginal = known.dish.image;
  const unresolvedOriginal = unresolved.dish.image;
  assert.equal(context.__attribution.imageFor(known.dish), knownOriginal);
  assert.equal(context.__attribution.reviewRequired(known.dish), false);
  assert.ok(context.__attribution.metadataFor(known.dish));
  assert.equal(context.__attribution.imageFor(unresolved.dish), 'assets/image-unavailable.svg');
  assert.equal(context.__attribution.reviewRequired(unresolved.dish), true);
  assert.equal(context.__attribution.metadataFor(unresolved.dish), null);
  assert.equal(known.dish.image, knownOriginal);
  assert.equal(unresolved.dish.image, unresolvedOriginal);

  const custom = { id: 'custom_abc', image: 'data:image/webp;base64,AAAA', isUserCustom: true };
  assert.equal(context.__attribution.imageFor(custom), custom.image);
  assert.equal(context.__attribution.reviewRequired(custom), false);
  for (const language of ['vi', 'en', 'ja', 'ko', 'zh']) {
    assert.ok(context.__attribution.note(language).length > 0, `${language} message`);
  }
  assert.equal(context.__attribution.note('unknown'), context.__attribution.note('vi'));
});
