const UI = {
  imageFallback(img) {
    img.onerror = () => {
      img.onerror = null;
      img.dataset.failed = 'true';
      img.src = 'assets/image-unavailable.svg';
    };
    delete img.dataset.failed;
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
    element.replaceChildren(UI.icon(icon), span);
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
      this.toast('Đã thêm Ăn gì đây vào thiết bị.');
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
      ? ' Link localhost chỉ mở trên máy này; dùng link LAN hoặc link HTTPS để gửi sang thiết bị khác.'
      : '';
  }

  async share() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ăn gì đây? Chọn một bữa ngon',
          text: 'Chưa biết ăn gì? Cùng tìm một món ngon nhé.',
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
      this.toast(
        'Đã sao chép đường dẫn.' + (this.localLinkNotice() || ' Gửi cho bạn bè để cùng chọn món!')
      );
    } catch (_) {
      const input = document.getElementById('shareUrl');
      input.value = this.url();
      if (!document.getElementById('shareDialog').open)
        this.openDialog(document.getElementById('shareDialog'));
      input.focus();
      input.select();
      this.toast('Chọn và sao chép đường dẫn bên dưới.' + this.localLinkNotice());
    }
  }

  async install() {
    if (this.installEvent) {
      const event = this.installEvent;
      this.installEvent = null;
      try {
        await event.prompt();
        const choice = await event.userChoice;
        if (choice.outcome === 'accepted') this.toast('Đang thêm ứng dụng vào thiết bị…');
        return;
      } catch (_) {
        /* Show manual instructions when the browser cannot install. */
      }
    }
    const ios =
      /iPhone|iPad|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const steps = ios
      ? [
          'Mở website bằng Safari trên iPhone hoặc iPad.',
          'Chạm nút Chia sẻ của Safari, rồi chọn “Thêm vào Màn hình chính”.',
          'Chọn “Thêm” để mở Ăn gì đây nhanh hơn vào lần sau.',
        ]
      : [
          'Mở menu trình duyệt trên thiết bị.',
          'Tìm “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính” nếu có.',
          'Bạn vẫn có thể sử dụng đầy đủ website mà không cần cài đặt.',
        ];
    document.getElementById('installSteps').replaceChildren(
      ...steps.map((step) => {
        const li = document.createElement('li');
        li.textContent = step;
        return li;
      })
    );
    this.openDialog(document.getElementById('installDialog'));
  }
}
