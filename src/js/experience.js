/* Interaction choreography built with the vendored MIT-licensed Motion library. */
const Experience = (() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set(),
    byElement = new WeakMap();
  function animate(element, frames, options = {}) {
    if (!element || reduced.matches || document.hidden || !window.Motion?.animate) return;
    const previous = byElement.get(element);
    if (previous) {
      previous.stop();
      active.delete(previous);
    }
    const control = Motion.animate(element, frames, {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
      ...options,
    });
    byElement.set(element, control);
    active.add(control);
    Promise.resolve(control.finished)
      .catch(() => {})
      .finally(() => {
        active.delete(control);
        if (byElement.get(element) === control) {
          byElement.delete(element);
          element.style.removeProperty('opacity');
          element.style.removeProperty('transform');
          control.cancel?.();
        }
      });
    return control;
  }
  function reveal(elements) {
    [...elements]
      .slice(0, 12)
      .forEach((el, index) =>
        animate(
          el,
          { opacity: [0, 1], transform: ['translateY(8px)', 'translateY(0px)'] },
          { duration: 0.222, delay: index * 0.018 }
        )
      );
  }
  function dialog(element) {
    animate(
      element,
      { opacity: [0, 1], transform: ['translateY(10px) scale(.992)', 'translateY(0px) scale(1)'] },
      { duration: 0.22 }
    );
  }
  function feature(element) {
    animate(
      element,
      { opacity: [0.4, 1], transform: ['translateY(6px)', 'translateY(0px)'] },
      { duration: 0.22 }
    );
  }
  function stop() {
    active.forEach((control) => {
      control.complete();
      control.cancel?.();
    });
    active.clear();
  }
  reduced.addEventListener('change', () => {
    if (reduced.matches) stop();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
  });
  document.addEventListener('pointerdown', (event) => {
    const button = event.target.closest('button');
    if (button && !button.disabled && event.button === 0) button.classList.add('is-pressing');
  });
  const release = () =>
    document.querySelectorAll('.is-pressing').forEach((el) => el.classList.remove('is-pressing'));
  ['pointerup', 'pointercancel', 'dragstart'].forEach((type) =>
    document.addEventListener(type, release)
  );
  window.addEventListener('blur', release);
  document.addEventListener('click', (event) => {
    const button = event.composedPath().find((element) => element instanceof HTMLButtonElement);
    if (
      !button ||
      button.disabled ||
      reduced.matches ||
      button.classList.contains('custom-select-trigger')
    )
      return;
    animate(button, { opacity: [1, 0.78, 1] }, { duration: 0.18 });
  });
  return { animate, reveal, dialog, feature, stop };
})();
