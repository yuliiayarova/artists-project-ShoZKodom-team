import { fetchArtistsById } from '../../api/artists-api';
import refs from '../../utills/refs';
import {
  initElementScroll,
  lockBodyScroll,
  unlockBodyScroll,
} from '../../utills/scrolling';
import { renderAlbumsSection } from '../modal-artist-render-02';
import { renderArtistModalContent } from './modal-artist-renderer';
import { showLoader, hideLoader } from '../../loader/loader';

refs.artistList.addEventListener('click', onArtistListClick);
refs.artistModal.addEventListener('click', onArtistModalClick);
refs.artistModal.addEventListener('cancel', onArtistModalCancel);

const ANIMATION_DURATION = 300;
let isArtistModalLoading = false;

export async function onArtistListClick(event) {
  const btn = event.target.closest('.js-learn-more-btn');
  if (!btn) return;
  if (isArtistModalLoading) return;
  const { artistId } = btn.dataset;
  if (!artistId) return;

  refs.artistModal.classList.remove('closing');

  try {
    isArtistModalLoading = true;
    showLoader(document.body);

    const artistInfo = await fetchArtistsById(artistId);
    renderArtistModalContent(artistInfo, refs.artistModal);

    // Albums section rendering with tracks
    const albumsContainer = refs.artistModal.querySelector('.js-albums');

    if (artistInfo.tracksList && albumsContainer) {
      const albumsMap = {};
      artistInfo.tracksList.forEach(track => {
        const albumName = track.strAlbum ?? 'Unknown Album';
        if (!albumsMap[albumName]) albumsMap[albumName] = [];
        albumsMap[albumName].push(track);
      });

      const albums = Object.entries(albumsMap).map(([strAlbum, tracks]) => ({
        strAlbum,
        tracks,
      }));

      renderAlbumsSection(albums, albumsContainer);
    }

    refs.artistModal.showModal();
    lockBodyScroll();

    const scrollElements = refs.artistModal.querySelectorAll(
      '.js-modal-scroll, .biography-descr-wrapper, .tracks-scroll'
    );

    scrollElements.forEach(el =>
      initElementScroll(el, {
        overflow: {
          x: 'hidden',
          y: 'scroll',
        },
      })
    );

    const closeBtn = refs.artistModal.querySelector('.js-modal-btn-close');
    if (!closeBtn) return;

    function onCloseClick() {
      closeModal();

      closeBtn.removeEventListener('click', onCloseClick);
    }

    closeBtn.addEventListener('click', onCloseClick);
  } catch (error) {
    console.error(error.message);
  } finally {
    hideLoader(document.body);
    isArtistModalLoading = false;
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
    unlockBodyScroll();
  }, ANIMATION_DURATION);
}
