import { http } from './http';

export function fetchArtists() {
  return http.get('/artists');
}
export function fetchArtistsById(id) {
  return http.get(`/artists/${id}`);
}
export function fetchArtistsAlbums(id) {
  return http.get(`/artists/${id}/albums`);
}
