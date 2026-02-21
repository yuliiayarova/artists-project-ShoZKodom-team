import {
  fetchArtists,
  fetchArtistsAlbums,
  fetchArtistsById,
} from './js/api/artists-api';
import { fetchFeetbacks } from './js/api/feedback-api';
import { fetchGenres } from './js/api/genres-api';
import { DEFAULT_PAGE, FEEDBACKS_LIMIT } from './js/config/config';
import '../src/js/feedback/feedbacks';
import { createFeedbackList } from '../src/js/feedback/feedbacks';

fetchFeetbacks().then(createFeedbackList);
