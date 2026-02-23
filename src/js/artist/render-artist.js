import { fetchArtists } from '../api/artists-api';
import '../../css/artist.css';
import { ARTIST_LIMIT, DEFAULT_PAGE } from '../config/config';
import { getPaginationParams, nextPage } from './pagination';

const list = document.querySelector('.js-artists');
const loadMoreBtn = document.querySelector('.load-more-btn')

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
            <button class="artist-card-link" type="button">
              Learn More<svg class="icon icon-play" width="20" height="20">
                <use href="../assets/icons/sprite.svg#icon-play"></use>
              </svg>
            </button>
          </div>
        </li>`;
}

export async function renderArtist(params) {
  const listArtist = document.querySelector('.js-artists');
  if (!listArtist) return;

  const res = await fetchArtists(params);
  // console.log('response:', res);

  const artists = res.artists;
  // listArtist.innerHTML = loadArtistCard(artists);
  listArtist.insertAdjacentHTML('beforeend', loadArtistCard(artists));

  if (loadMoreBtn) {
  if (artists.length < params.limit) {
    loadMoreBtn.classList.add('is-disabled')
  }
  else {
    loadMoreBtn.classList.remove('is-disabled')
  }
}
}

if (list) renderArtist({ limit: ARTIST_LIMIT, page: DEFAULT_PAGE });

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', async () => {
    if (loadMoreBtn.classList.contains('is-disabled')) return 
    
    nextPage();
    const params = getPaginationParams();
    await renderArtist(params);
  })
}

