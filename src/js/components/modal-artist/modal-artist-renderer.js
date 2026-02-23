export function renderArtistModalContent(artistData = {}, el) {
  const genresMarkup = Array.isArray(artistData.genres)
    ? artistData.genres
        .map(genre => `<li class="genre-item">${genre}</li>`)
        .join('')
    : '';

  const metaMarkup = `<div class="meta-row">
            <dt>Years active</dt>
            <dd>${
              artistData.intFormedYear
                ? `${artistData.intFormedYear}-${artistData.intDiedYear ?? 'present'}`
                : 'information missing'
            }</dd>
          </div>
          <div class="meta-row">
            <dt>Sex</dt>
            <dd>${artistData.strGender ?? 'Unknown'}</dd>
          </div>

          <div class="meta-row">
            <dt>Members</dt>
            <dd>${artistData.intMembers ?? 'N/A'}</dd>
          </div>

          <div class="meta-row">
            <dt>Country</dt>
            <dd>${artistData.strCountry ?? 'Unknown'}</dd>
          </div>`;

  const markup = `<div class="artist-modal-content js-modal-scroll" data-artist-id="${artistData._id}">
    <button
      class="modal-btn-close js-modal-btn-close"
      type="button"
      aria-label="Close artist modal"
    >
      <svg class="btn-close-icon" width="32" height="32">
        <use href="../assets/icons/sprite.svg#icon-x"></use>
      </svg>
    </button>
    <h2 class="artist-title" id="artist-title">${artistData.strArtist ?? 'Unknown Artist'}</h2>
    <div class="artist-wrapper">
     <div class="artist-ill-wrapper">
      <img
        class="artist-ill"
        src="${artistData.strArtistThumb ?? ''}"
        alt="${artistData.strArtist ?? 'Artist image'}"
      />
      </div>

      <div class="artist-info-wrapper">
        <dl class="meta"> 
        ${metaMarkup}
        </dl>
        <div class="biography">
          <h3 class="biography-caption">Biography</h3>
           <div class="biography-descr-wrapper">
          <p class="biography-descr">
            ${artistData.strBiographyEN ?? 'No biography available'}
          </p>
          </div>
        </div>

        <ul class="genres-list">
          ${genresMarkup}
        </ul>
      </div>
    </div>
     <section class="albums js-albums"></section>
     </div>
    `;
  el.innerHTML = markup;
}
