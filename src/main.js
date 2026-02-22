import {
  fetchArtists,
  fetchArtistsAlbums,
  fetchArtistsById,
} from './js/api/artists-api';
import { fetchFeetbacks } from './js/api/feedback-api';
import { fetchGenres } from './js/api/genres-api';
import { DEFAULT_PAGE, FEEDBACKS_LIMIT } from './js/config/config';

import './js/artist/render-artist';
import './js/close-open.js/mobile-menu';
import './js/components/modal-artist/modal';
import './js/utills/scrolling';

import 'loaders.css/loaders.min.css';
