import { http } from './http';

export function fetchGenres() {
  return http.get('/genres');
}
