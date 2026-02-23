import { fetchArtists } from '../api/artists-api';
import '../../css/artist.css';
import { ARTIST_LIMIT, DEFAULT_PAGE } from '../config/config';
import { getPaginationParams, nextPage } from './pagination';
import { showLoader, hideLoader } from '../loader/loader';

const list = document.querySelector('.js-artists');
const loadMoreBtn = document.querySelector('.load-more-btn');
let isLoadingArtists = false;
let isLoadMoreExhausted = false;

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
  return `<li class="artist-card" data-id="${_id}">
          <img
            class="artist-card-img"
            src="${strArtistThumb}"
            alt="${strArtist}"
            loading="lazy"
          />
          <div class="artist-card-body">
            <ul class="tag-list">
              ${genres.map(genre => `<li class="tags">${genre}</li>`).join('')}
            </ul>
            <h3 class="artist-card-name">${strArtist}</h3>
            <p class="artist-card-desc">
             ${strBiographyEN}
            </p>
            <button class="artist-card-link js-learn-more-btn" type="button" data-artist-id="${_id}">
              Learn More<svg class="icon icon-play" width="20" height="20">
                <use href="../assets/icons/sprite.svg#icon-play"></use>
              </svg>
            </button>
          </div>
        </li>`;
}

function toggleLoadMoreState(isDisabled) {
  if (!loadMoreBtn) return;

  loadMoreBtn.disabled = isDisabled;
  loadMoreBtn.classList.toggle('is-disabled', isDisabled);
}

export async function renderArtist(params) {
  if (!list || isLoadingArtists) return;

  try {
    isLoadingArtists = true;
    list.classList.add('js-loader-container');
    list.setAttribute('aria-busy', 'true');
    toggleLoadMoreState(true);
    showLoader(list);

    const res = await fetchArtists(params);
    const artists = res.artists;

    list.insertAdjacentHTML('beforeend', loadArtistCard(artists));
    isLoadMoreExhausted = artists.length < params.limit;
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader(list);
    list.setAttribute('aria-busy', 'false');
    toggleLoadMoreState(isLoadMoreExhausted);
    isLoadingArtists = false;
  }
}

if (list) renderArtist({ limit: ARTIST_LIMIT, page: DEFAULT_PAGE });

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (isLoadingArtists || loadMoreBtn.classList.contains('is-disabled'))
      return;

    nextPage();
    const params = getPaginationParams();
    await renderArtist(params);
  });
}
