/* Test-only diagnostics. Geometry is evidence, never a blanket visual pass/fail. */
function inspectPage({ requested, selectors = [], pairs = [], allowances = [] }) {
  const epsilon = 1;
  const rect = (r) => ({
    left: r.left,
    top: r.top,
    right: r.right,
    bottom: r.bottom,
    width: r.width,
    height: r.height,
  });
  const area = (r) => (r ? Math.max(0, r.right - r.left) * Math.max(0, r.bottom - r.top) : 0);
  const meaningfulOverlap = (r) => !!r && r.width > epsilon && r.height > epsilon;
  const intersection = (a, b) => {
    if (!a || !b) return null;
    const r = {
      left: Math.max(a.left, b.left),
      top: Math.max(a.top, b.top),
      right: Math.min(a.right, b.right),
      bottom: Math.min(a.bottom, b.bottom),
    };
    r.width = Math.max(0, r.right - r.left);
    r.height = Math.max(0, r.bottom - r.top);
    return r.width && r.height ? r : null;
  };
  const viewport = { left: 0, top: 0, right: innerWidth, bottom: innerHeight };
  function inspect(selector) {
    let nodes;
    try {
      nodes = document.querySelectorAll(selector);
    } catch {
      return { selector, found: false, reason: 'invalid-selector', matches: 0 };
    }
    if (nodes.length !== 1)
      return {
        selector,
        found: false,
        reason: nodes.length ? 'ambiguous-selector' : 'missing-element',
        matches: nodes.length,
      };
    const el = nodes[0],
      rawRect = rect(el.getBoundingClientRect()),
      reasons = [],
      clipChain = [];
    let painted = el.isConnected,
      interactive = true,
      visibleRect = rawRect;
    if (typeof el.checkVisibility === 'function' && !el.checkVisibility()) {
      painted = false;
      reasons.push('browser-not-visible');
    }
    for (let node = el; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (
        style.display === 'none' ||
        (node === el && ['hidden', 'collapse'].includes(style.visibility)) ||
        Number(style.opacity) === 0 ||
        style.contentVisibility === 'hidden'
      ) {
        painted = false;
        reasons.push(node === el ? 'hidden-style' : 'hidden-ancestor');
      }
      if (node.inert) {
        interactive = false;
        reasons.push('inert');
      }
      if (node.tagName === 'DETAILS' && !node.open) {
        const summary = node.querySelector(':scope > summary');
        if (!summary || (el !== node && !summary.contains(el))) {
          painted = false;
          reasons.push('closed-details-content');
        }
      }
      if (
        node !== el &&
        node !== document.documentElement &&
        node !== document.scrollingElement &&
        (/(hidden|clip|auto|scroll)/.test(style.overflowX) ||
          /(hidden|clip|auto|scroll)/.test(style.overflowY))
      ) {
        const box = node.getBoundingClientRect();
        const clip = { left: box.left + node.clientLeft, top: box.top + node.clientTop };
        clip.right = clip.left + node.clientWidth;
        clip.bottom = clip.top + node.clientHeight;
        const prior = visibleRect;
        if (prior) {
          const next = { ...prior };
          if (/(hidden|clip|auto|scroll)/.test(style.overflowX)) {
            next.left = Math.max(next.left, clip.left);
            next.right = Math.min(next.right, clip.right);
          }
          if (/(hidden|clip|auto|scroll)/.test(style.overflowY)) {
            next.top = Math.max(next.top, clip.top);
            next.bottom = Math.min(next.bottom, clip.bottom);
          }
          next.width = Math.max(0, next.right - next.left);
          next.height = Math.max(0, next.bottom - next.top);
          visibleRect = area(next) > 0 ? next : null;
          clipChain.push({
            ancestor: node.id ? '#' + node.id : node.tagName.toLowerCase(),
            overflowX: style.overflowX,
            overflowY: style.overflowY,
            rect: clip,
          });
        }
      }
    }
    if (!area(rawRect)) {
      painted = false;
      reasons.push('empty-box');
    }
    if (!visibleRect) reasons.push('fully-clipped');
    if (el.matches(':disabled') || el.getAttribute('aria-disabled') === 'true') {
      interactive = false;
      reasons.push('disabled');
    }
    if (getComputedStyle(el).pointerEvents === 'none') {
      interactive = false;
      reasons.push('pointer-events-none');
    }
    if (!painted) visibleRect = null;
    return {
      selector,
      found: true,
      painted,
      interactive: painted && interactive,
      hasVisibleArea: !!visibleRect,
      rawRect,
      visibleRect,
      inViewport: !!intersection(visibleRect, viewport),
      clipped: painted && area(visibleRect) < area(rawRect) - epsilon,
      reasons: [...new Set(reasons)],
      clipChain,
    };
  }
  const all = [...new Set([...selectors, ...pairs.flatMap((p) => [p.a, p.b])])];
  const elements = Object.fromEntries(all.map((s) => [s, inspect(s)]));
  const candidates = pairs.map((pair, index) => {
    const a = elements[pair.a],
      b = elements[pair.b],
      intersectionRect = intersection(a.rawRect, b.rawRect);
    const result = {
      id: pair.id || `pair-${index + 1}`,
      selectors: [pair.a, pair.b],
      rawIntersectionArea: area(intersectionRect),
      visibleIntersectionArea: area(intersection(a.visibleRect, b.visibleRect)),
      expected: pair.expected || 'independent visible blocks do not obscure each other',
    };
    if (!a.found || !b.found)
      return {
        ...result,
        classification: 'insufficient-evidence',
        reason: 'missing-or-ambiguous-element',
      };
    const ea = document.querySelector(pair.a),
      eb = document.querySelector(pair.b);
    if (!a.painted || !b.painted)
      return { ...result, classification: 'rejected', reason: 'not-painted' };
    if (ea.contains(eb) || eb.contains(ea))
      return { ...result, classification: 'rejected', reason: 'ancestor-descendant' };
    if (!meaningfulOverlap(intersectionRect))
      return {
        ...result,
        classification: 'rejected',
        reason: result.rawIntersectionArea ? 'edge-contact' : 'no-geometric-overlap',
      };
    if (!meaningfulOverlap(intersection(a.visibleRect, b.visibleRect)))
      return { ...result, classification: 'rejected', reason: 'clipped-away' };
    const visibleIntersection = intersection(a.visibleRect, b.visibleRect);
    if (!intersection(visibleIntersection, viewport))
      return {
        ...result,
        classification: 'insufficient-evidence',
        reason: 'overlap-outside-viewport',
      };
    const allow = allowances.find((rule) => {
      if (
        !(
          (rule.overlay === pair.a && rule.underlay === pair.b) ||
          (rule.overlay === pair.b && rule.underlay === pair.a)
        )
      )
        return false;
      const overlay = document.querySelector(rule.overlay);
      if (rule.kind === 'dropdown')
        return (
          overlay &&
          !overlay.hidden &&
          overlay.id &&
          [...document.querySelectorAll('[aria-controls]')].some(
            (trigger) =>
              trigger.getAttribute('aria-controls') === overlay.id &&
              trigger.getAttribute('aria-expanded') === 'true'
          ) &&
          ['absolute', 'fixed'].includes(getComputedStyle(overlay).position)
        );
      if (rule.kind === 'dialog') return overlay?.matches('dialog[open]:modal');
      if (rule.kind === 'fixed-navigation')
        return overlay?.tagName === 'NAV' && getComputedStyle(overlay).position === 'fixed';
      return false;
    });
    if (allow)
      return {
        ...result,
        classification: 'intentional-overlap',
        reason: allow.kind,
        requiresInteractionVerification: true,
      };
    return {
      ...result,
      classification: 'visible-overlap',
      reason: 'independent-painted-regions-intersect',
      requiresReview: true,
    };
  });
  const actual = {
    width: innerWidth,
    height: innerHeight,
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  };
  const valid =
    !!requested && requested.width === actual.width && requested.height === actual.height;
  return {
    requested,
    actual,
    measurement: valid ? 'valid' : 'invalid-measurement',
    horizontalOverflow: actual.scrollWidth > actual.clientWidth + epsilon,
    state: {
      language: document.documentElement.lang,
      appearance: document.documentElement.dataset.appearance,
      openDetails: [...document.querySelectorAll('details[open]')].map(
        (el) => el.id || el.className
      ),
      openDialogs: [...document.querySelectorAll('dialog[open]')].map((el) => el.id),
      scrollX,
      scrollY,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    },
    elements,
    candidates,
    counts: {
      raw: candidates.length,
      visibleOverlap: candidates.filter((c) => c.classification === 'visible-overlap').length,
      rejected: candidates.filter((c) => c.classification === 'rejected').length,
      intentional: candidates.filter((c) => c.classification === 'intentional-overlap').length,
      insufficient: candidates.filter((c) => c.classification === 'insufficient-evidence').length,
    },
    conclusion: valid ? 'diagnostics-only' : 'invalid-measurement-no-breakpoint-conclusion',
  };
}

function sampleHits({ selector, box }) {
  if (!box) return [];
  const target = document.querySelector(selector),
    left = Math.max(0, box.left),
    right = Math.min(innerWidth, box.right),
    top = Math.max(0, box.top),
    bottom = Math.min(innerHeight, box.bottom);
  if (!target || right - left < 1 || bottom - top < 1) return [];
  return [
    [0.5, 0.5],
    [0.25, 0.25],
    [0.75, 0.25],
    [0.25, 0.75],
    [0.75, 0.75],
  ].map(([fx, fy]) => {
    const x = left + (right - left) * fx,
      y = top + (bottom - top) * fy,
      hit = document.elementsFromPoint(x, y)[0];
    return {
      x,
      y,
      reachesTarget: !!hit && target.contains(hit),
      blocker:
        hit && !target.contains(hit) ? (hit.id ? '#' + hit.id : hit.tagName.toLowerCase()) : null,
    };
  });
}

async function probeControl(page, selector, { scroll = true, timeout = 1500, screenshot } = {}) {
  const locator = page.locator(selector);
  const before = await page.evaluate(inspectPage, {
    requested: page.viewportSize(),
    selectors: [selector],
  });
  if (!before.elements[selector].found)
    return {
      selector,
      status: 'insufficient-evidence',
      reason: before.elements[selector].reason,
      before: before.elements[selector],
    };
  if (!before.elements[selector].interactive)
    return { selector, status: 'not-interactive', before: before.elements[selector] };
  if (scroll) {
    try {
      await locator.scrollIntoViewIfNeeded({ timeout });
    } catch (error) {
      return {
        selector,
        status: 'insufficient-evidence',
        reason: 'could-not-scroll',
        message: error.message.split('\n')[0],
        before: before.elements[selector],
      };
    }
  }
  const after = await page.evaluate(inspectPage, {
    requested: page.viewportSize(),
    selectors: [selector],
  });
  const element = after.elements[selector];
  const hits = await page.evaluate(sampleHits, { selector, box: element.visibleRect });
  if (!hits.length)
    return {
      selector,
      status: 'insufficient-evidence',
      reason: 'outside-viewport',
      before: before.elements[selector],
      after: element,
      hits,
    };
  let trial = { passed: false };
  try {
    await locator.click({ trial: true, timeout });
    trial = { passed: true };
  } catch (error) {
    trial = { passed: false, message: error.message.split('\n')[0] };
  }
  // Trial may itself scroll an overflow container. Keep both samples and final geometry.
  const final = await page.evaluate(inspectPage, {
    requested: page.viewportSize(),
    selectors: [selector],
  });
  const finalHits = await page.evaluate(sampleHits, {
    selector,
    box: final.elements[selector].visibleRect,
  });
  if (screenshot) await page.screenshot({ path: screenshot, fullPage: false });
  const obstructed = finalHits.some((hit) => !hit.reachesTarget);
  const status = trial.passed
    ? obstructed
      ? 'partially-obstructed'
      : 'actionable'
    : obstructed
      ? 'interaction-blocked'
      : 'insufficient-evidence';
  return {
    selector,
    status,
    before: before.elements[selector],
    after: element,
    final: final.elements[selector],
    pageStates: { before: before.state, after: after.state, final: final.state },
    hits,
    finalHits,
    trial,
    evidence: { screenshot: screenshot || null },
  };
}

async function waitForLayout(page, selectors, { timeout = 3000 } = {}) {
  return page.evaluate(
    ({ selectors, timeout }) =>
      new Promise((resolve) => {
        const start = performance.now();
        let previous = null,
          stableFrames = 0,
          samples = 0;
        const step = () => {
          const nodes = selectors.flatMap((selector) => {
            try {
              return [...document.querySelectorAll(selector)];
            } catch {
              return [];
            }
          });
          const boxes = nodes.map((node) => {
            const r = node.getBoundingClientRect();
            return [r.left, r.top, r.width, r.height];
          });
          const moving = document.getAnimations().some((animation) => {
            const target = animation.effect?.target;
            return (
              target &&
              animation.effect.getTiming().iterations !== Infinity &&
              (animation.playState === 'running' || animation.pending) &&
              nodes.some((node) => node.contains(target) || target.contains(node))
            );
          });
          const pendingImages = nodes.some(
            (node) => node.tagName === 'IMG' && !node.complete && node.loading !== 'lazy'
          );
          const equal =
            previous &&
            previous.length === boxes.length &&
            boxes.every((box, i) => box.every((n, j) => Math.abs(n - previous[i][j]) <= 1));
          stableFrames = equal && !moving && !pendingImages ? stableFrames + 1 : 0;
          previous = boxes;
          samples++;
          if (stableFrames >= 2) return resolve({ stable: true, samples });
          if (performance.now() - start >= timeout)
            return resolve({ stable: false, samples, reason: 'layout-or-animation-not-settled' });
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
    { selectors, timeout }
  );
}

async function auditPage(
  page,
  {
    requested = page.viewportSize(),
    selectors = [],
    pairs = [],
    allowances = [],
    controls = [],
    meta = {},
    screenshot,
    stabilityTimeout = 3000,
  } = {}
) {
  await page.evaluate(() => document.fonts.ready);
  const stability = await waitForLayout(
    page,
    [...new Set([...selectors, ...pairs.flatMap((pair) => [pair.a, pair.b])])],
    { timeout: stabilityTimeout }
  );
  const snapshot = await page.evaluate(inspectPage, { requested, selectors, pairs, allowances });
  if (screenshot) await page.screenshot({ path: screenshot, fullPage: false });
  const interactions = [];
  for (const [index, selector] of controls.entries())
    interactions.push(
      await probeControl(page, selector, {
        screenshot: screenshot
          ? `${screenshot.replace(/\.[^./\\]+$/, '')}-control-${index + 1}.png`
          : undefined,
      })
    );
  return {
    schemaVersion: 1,
    meta,
    ...snapshot,
    stability,
    evidence: { screenshot: screenshot || null },
    conclusion:
      snapshot.measurement !== 'valid'
        ? snapshot.conclusion
        : !stability.stable
          ? 'unstable-layout-no-layout-conclusion'
          : snapshot.conclusion,
    interactions,
  };
}
module.exports = { auditPage, probeControl, inspectPage, waitForLayout };
