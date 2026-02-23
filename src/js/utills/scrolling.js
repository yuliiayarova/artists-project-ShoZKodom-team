import 'overlayscrollbars/overlayscrollbars.css';
import { OverlayScrollbars, SizeObserverPlugin } from 'overlayscrollbars';

let osBody = null;
const osElements = new Map();

export function initBodyScroll(el) {
  if (!el) return null;

  osBody = OverlayScrollbars(el, {
    scrollbars: {
      autoHide: 'scroll',
      autoHideDelay: 300,
      dragScroll: true,
    },
    plugins: {
      SizeObserverPlugin: true,
    },
  });

  return osBody;
}

export function initElementScroll(el, options = {}) {
  if (!el) return null;

  if (osElements.has(el)) {
    return osElements.get(el);
  }

  const instance = OverlayScrollbars(el, {
    scrollbars: {
      autoHide: 'scroll',
      autoHideDelay: 300,
      dragScroll: true,
    },
    plugins: {
      SizeObserverPlugin: true,
    },
    ...options,
  });

  osElements.set(el, instance);
  return instance;
}

export function lockBodyScroll() {
  if (!osBody) return;
  osBody.options({
    overflow: { x: 'hidden', y: 'hidden' },
  });
}

export function unlockBodyScroll() {
  if (!osBody) return;
  osBody.options({
    overflow: { x: 'hidden', y: 'scroll' },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBodyScroll(document.body);
});
