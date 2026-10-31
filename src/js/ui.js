const UI = {
  imageFallback(img) {
    img.onerror = () => {
      img.onerror = null;
      img.dataset.failed = 'true';
      img.hidden = true;
    };
    delete img.dataset.failed;
    img.hidden = false;
  },
  icon(name) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', `assets/icons.svg#${name}`);
    svg.append(use);
    return svg;
  },
  button(element, icon, label, iconOnly = false) {
    const span = document.createElement('span');
    span.textContent = label;
    if (iconOnly) span.className = 'sr-only';
    const tool = element.querySelector('[data-tool-label]');
    element.replaceChildren(UI.icon(icon), span);
    if (tool) element.append(tool);
  },
};
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('[data-icon]')
    .forEach((el) => el.replaceWith(UI.icon(el.dataset.icon)));
});

class BrowserActions {
  constructor(openDialog, toast) {
    this.openDialog = openDialog;
    this.toast = toast;
    this.installEvent = null;
    document.addEventListener('bfsc-languagechange', () => {
      if (this.installStepKeys) this.renderInstallSteps();
    });
    this.installButton = document.getElementById('installBtn');
    document.getElementById('shareBtn').onclick = () => this.share();
    document.getElementById('copyLinkBtn').onclick = () => this.copy();
    this.installButton.onclick = () => this.install();
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installEvent = event;
    });
    window.addEventListener('appinstalled', () => {
      this.installEvent = null;
      this.installButton.hidden = true;
      this.toast(UICopy.text('installed'));
    });
    if (matchMedia('(display-mode: standalone)').matches || navigator.standalone)
      this.installButton.hidden = true;
    const connection = () => (document.getElementById('offlineStatus').hidden = navigator.onLine);
    window.addEventListener('offline', connection);
    window.addEventListener('online', connection);
    connection();
  }

  url() {
    const url = new URL(location.href);
    url.hash = '';
    url.search = '';
    return url.href;
  }

  localLinkNotice() {
    return ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)
      ? ' ' + UICopy.text('localLink')
      : '';
  }

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: UICopy.text('seoTitle'),
          text: UICopy.text('shareText'),
          url: this.url(),
        });
        if (this.localLinkNotice()) this.toast(this.localLinkNotice().trim());
        return;
      } catch (error) {
        if (error.name === 'AbortError') return;
      }
    }
    await this.copy();
  }

  async copy() {
    try {
      await navigator.clipboard.writeText(this.url());
      this.toast(UICopy.text('linkCopied') + this.localLinkNotice());
    } catch (_) {
      const input = document.getElementById('shareUrl');
      input.value = this.url();
      if (!document.getElementById('shareDialog').open)
        this.openDialog(document.getElementById('shareDialog'));
      input.focus();
      input.select();
      this.toast(UICopy.text('copyManually') + this.localLinkNotice());
    }
  }

  async install() {
    if (this.installEvent) {
      const event = this.installEvent;
      this.installEvent = null;
      try {
        await event.prompt();
        const choice = await event.userChoice;
        if (choice.outcome === 'accepted') this.toast(UICopy.text('installing'));
        return;
      } catch (_) {
        /* Show manual instructions when the browser cannot install. */
      }
    }
    const ios =
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    this.installStepKeys = ios
      ? ['installIos1', 'installIos2', 'installIos3']
      : ['installOther1', 'installOther2', 'installOther3'];
    this.renderInstallSteps();
    this.openDialog(document.getElementById('installDialog'));
  }

  renderInstallSteps() {
    const steps = this.installStepKeys.map((key) => UICopy.text(key));
    document.getElementById('installSteps').replaceChildren(
      ...steps.map((step) => {
        const li = document.createElement('li');
        li.textContent = step;
        return li;
      })
    );
  }
}
