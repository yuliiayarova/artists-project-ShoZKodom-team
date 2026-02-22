import { fetchArtistsById } from '../../api/artists-api';
import refs from '../../utills/refs';
import { renderArtistModalContent } from './modal-artist-renderer';

refs.artistList.addEventListener('click', onArtistListClick);
refs.artistModal.addEventListener('click', onArtistModalClick);
refs.artistModal.addEventListener('cancel', onArtistModalCancel);

const ANIMATION_DURATION = 300;

export async function onArtistListClick(event) {
  const btn = event.target.closest('.js-learn-more-btn');
  if (!btn) return;
  const { artistId } = btn.dataset;
  if (!artistId) return;

  refs.artistModal.classList.remove('closing');

  try {
    const artistInfo = await fetchArtistsById(artistId);
    renderArtistModalContent(artistInfo, refs.artistModal);
    refs.artistModal.showModal();

    const closeBtn = refs.artistModal.querySelector('.js-modal-btn-close');
    if (!closeBtn) return;

    function onCloseClick() {
      closeModal();
      closeBtn.removeEventListener('click', onCloseClick);
    }

    closeBtn.addEventListener('click', onCloseClick);
  } catch (error) {
    console.error(error.message);
  }
}

function onArtistModalClick(event) {
  const isCloseBtn = event.target.closest('.js-modal-btn-close');
  const isBackdrop = event.target === refs.artistModal;

  if (!isCloseBtn && !isBackdrop) return;

  closeModal();
}

function onArtistModalCancel(event) {
  event.preventDefault();
  closeModal();
}

function closeModal() {
  if (refs.artistModal.classList.contains('closing')) return;

  refs.artistModal.classList.add('closing');

  setTimeout(() => {
    refs.artistModal.close();
    refs.artistModal.classList.remove('closing');
  }, ANIMATION_DURATION);
}
