import { fetchArtists } from '../api/artists-api';
import { showArtistsSkeleton, removeArtistsSkeleton } from './artists-skeleton';
import { ARTIST_LIMIT, DEFAULT_PAGE } from '../config/config';
import { getPaginationParams, nextPage } from './pagination';
import { createArtistAvatar } from '../helpers/avatarMarkup';
import spriteUrl from '@/assets/icons/sprite.svg';
import iziToast from 'izitoast';
import '../../css/artist.css';
import '../../css/artists-skeleton.css';
import 'izitoast/dist/css/iziToast.min.css';
import { hideLoader, showLoader } from '../loader/loader';

const list = document.querySelector('.js-artists');
const loadMoreBtn = document.querySelector('.load-more-btn');
let isLoadingArtists = false;

export function loadArtistCard(artist) {
  return artist.map(createCardMarkup).join('');
}

function createCardMarkup({
  _id,
  strArtist,
  strBiographyEN,
  strArtistThumb,
  genres,
}) {
  const avatar = createArtistAvatar({
    name: strArtist,
    imageUrl: strArtistThumb,
  });
  return `<li class="artist-card" data-id="${_id}">
  ${avatar}
  </div>
          <div class="artist-card-body">
            <ul class="tag-list">
              ${genres.map(genre => `<li class="tags">${genre}</li>`).join('')}
            </ul>
            <h3 class="artist-card-name">${strArtist ?? 'Unknown Artist'}</h3>
            <p class="artist-card-desc">
             ${strBiographyEN ?? 'No biography available'}
            </p>
            <button class="artist-card-link js-learn-more-btn" type="button" data-artist-id="${_id}">
              Learn More<svg class="icon icon-play" width="20" height="20">
                <use href="${spriteUrl}#icon-play"></use>
              </svg>
            </button>
          </div>
        </li>`;
}

export async function renderArtist(params) {
  const listArtist = document.querySelector('.js-artists');
  if (!listArtist) return;

  const isFirstLoad = params.page === DEFAULT_PAGE;
  if (loadMoreBtn) loadMoreBtn.style.display = 'none';
  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');

  showArtistsSkeleton(listArtist, {
    count: params?.limit ?? 8,
    mode: isFirstLoad ? 'replace' : 'append',
  });

  const timeoutId = setTimeout(() => {
    iziToast.error({
      title: 'Error',
      message: 'Server is not responding. Please try again later.',
      position: 'topRight',
    });
  }, 8000);

  try {
    const res = await fetchArtists(params);
    const artists = res.artists ?? [];

    clearTimeout(timeoutId);

    removeArtistsSkeleton(listArtist);

    if (isFirstLoad) {
      listArtist.innerHTML = loadArtistCard(artists);
    } else {
      listArtist.insertAdjacentHTML('beforeend', loadArtistCard(artists));
    }

    if (loadMoreBtn) loadMoreBtn.style.display = '';

    if (loadMoreBtn) {
      
      if (artists.length < params.limit) {
        loadMoreBtn.classList.add('is-disabled');
      } else {
        loadMoreBtn.classList.remove('is-disabled');
      }
      
    }
  } catch (error) {
    clearTimeout(timeoutId);

    iziToast.error({
      title: 'Error',
      message: 'Failed to load artists. Please try again later.',
      position: 'topRight',
    });

    setTimeout(() => {
      removeArtistsSkeleton(listArtist);
    }, 8000);
  }
}

if (list) renderArtist({ limit: ARTIST_LIMIT, page: DEFAULT_PAGE });

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    showLoader(document.body)
    if (isLoadingArtists || loadMoreBtn.classList.contains('is-disabled'))
      return;
    if (loadMoreBtn.classList.contains('is-disabled')) return;

    nextPage();
    const params = getPaginationParams();
    await renderArtist(params);
    hideLoader(document.body)
  });
}
