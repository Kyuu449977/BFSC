/* Settings works at every viewport; native dialogs preserve keyboard modality. */
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('mobileMenuBtn');
  const dialog = document.getElementById('settingsDialog');
  button.addEventListener('click', () => {
    if (dialog.open) dialog.close();
    else { dialog.showModal(); button.setAttribute('aria-expanded', 'true'); }
  });
  document.getElementById('toolNav').addEventListener('click', event => {
    const trigger = event.target.closest('button');
    if (trigger && !['bgmBtn','soundBtn'].includes(trigger.id)) dialog.close();
  }, true);
  dialog.addEventListener('close', () => {
    button.setAttribute('aria-expanded', 'false');
    if (!document.querySelector('dialog[open]')) button.focus({preventScroll:true});
  });
});
