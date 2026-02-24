import { getInitials, stringToColor } from '../utills/placeholder/placeholder';

export function createArtistAvatar({
  name,
  imageUrl,
  className = 'artist-card-img',
}) {
  const hasImage = Boolean(imageUrl);
  const safeName = name ?? 'Artist';
  const initials = getInitials(safeName) || 'A';
  const gradient = stringToColor(safeName);

  const imgMarkup = hasImage
    ? `<img
        class="${className}"
        src="${imageUrl}"
        alt="${safeName}"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
      />`
    : '';

  const placeholderMarkup = `<div
      class="artist-card-placeholder"
      style="background: ${gradient}; ${hasImage ? 'display:none;' : 'display:flex;'}"
      aria-label="${safeName}"
      role="region"
    >
      ${initials}
    </div>`;

  return imgMarkup + placeholderMarkup;
}
