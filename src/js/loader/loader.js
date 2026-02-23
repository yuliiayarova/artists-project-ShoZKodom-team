import '../../css/loader.css';
import '../../css/animations.css';
import 'loaders.css/loaders.min.css';

const LOADER_CLASS = 'js-section-loader';

function getLoaderMarkup() {
  return `
    <div class="${LOADER_CLASS}">
      <div class="loader-inner line-scale">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `;
}

export function showLoader(container) {
  if (!container) return;
  if (container.querySelector(`.${LOADER_CLASS}`)) return;

  container.insertAdjacentHTML('beforeend', getLoaderMarkup());
}

export function hideLoader(container) {
  if (!container) return;

  const loader = container.querySelector(`.${LOADER_CLASS}`);
  if (!loader) return;

  loader.remove();
}
