export function renderAlbumsSection(albums, container) {
  if (!container) return;

  container.innerHTML = `
   
      <h3 class="albums-title">Albums</h3>
      <ul class="albums-list">
        ${albums
          .map(
            album => `
          <li class="album">
            <h4 class="album-title" title="${album.strAlbum}">${album.strAlbum}</h4>
            <div class="tracks-scroll">
            <table class="tracks-table">
              <thead>
                <tr>
                  <th scope="col">Track</th>
                  <th scope="col">Time</th>
                  <th scope="col">Link</th>
                </tr>
              </thead>

              <tbody>
                ${album.tracks
                  .map(track => {
                    const durationSec = Math.floor(track.intDuration / 1000);
                    const minutes = Math.floor(durationSec / 60);
                    const seconds = String(durationSec % 60).padStart(2, '0');

                    const hasVideo =
                      track.movie &&
                      track.movie !== 'null' &&
                      track.movie.startsWith('http');

                    return `
                    <tr>
                      <td title="${track.strTrack}">${track.strTrack}</td>
                      <td>${minutes}:${seconds}</td>
                      <td>
                        ${
                          hasVideo
                            ? `
                          <a href="${track.movie}" target="_blank"
                             aria-label="Play ${track.strTrack}">
                            <svg class="play-icon" width="24" height="24">
                              <use href="../assets/icons/sprite.svg#icon-youtube"></use>
                            </svg>
                          </a>
                        `
                            : ''
                        }
                      </td>
                    </tr>
                  `;
                  })
                  .join('')}
              </tbody>
            </table>
            </div>
          </li>
        `
          )
          .join('')}
      </ul>
    
  `;
}
