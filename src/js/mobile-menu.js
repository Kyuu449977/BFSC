/* One accessible disclosure for the eight tools; bottom navigation stays available. */
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('mobileMenuBtn');
  const tools = document.getElementById('toolNav');
  const header = button.closest('header');
  const mobile = matchMedia('(max-width: 899px)');
  let expanded = false;
  function apply() {
    tools.hidden = mobile.matches && !expanded;
    tools.inert = tools.hidden;
    button.setAttribute('aria-expanded', String(mobile.matches && expanded));
    header.classList.toggle('tools-open', mobile.matches && expanded);
  }
  function close(restoreFocus = false) {
    expanded = false;
    apply();
    if (restoreFocus && mobile.matches) button.focus({ preventScroll: true });
  }
  button.addEventListener('click', () => {
    expanded = !expanded;
    apply();
  });
  // Safari does not focus buttons on pointer clicks. Capture the actual trigger
  // before its dialog opens so closing that dialog restores focus correctly.
  tools.addEventListener(
    'click',
    (event) => {
      const trigger = event.target.closest('button');
      if (trigger && !trigger.disabled) trigger.focus({ preventScroll: true });
    },
    true
  );
  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      mobile.matches &&
      expanded &&
      !document.querySelector('dialog[open]')
    ) {
      close(true);
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (expanded && !header.contains(event.target) && !document.querySelector('dialog[open]'))
      close();
  });
  // Collapse when leaving the menu, but keep dialog-return focus meaningful.
  document.addEventListener('focusin', (event) => {
    if (expanded && !header.contains(event.target) && !event.target.closest('dialog')) close();
  });
  mobile.addEventListener('change', () => {
    const hadToolFocus = tools.contains(document.activeElement);
    close(hadToolFocus);
  });
  apply();
});
