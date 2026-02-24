import { fetchFeetbacks } from './js/api/feedback-api';
import { createFeedbackList } from '../src/js/feedback/feedbacks';
import '../src/js/feedback/feedbacks';
import './js/artist/render-artist';
import './js/close-open.js/mobile-menu';
import './js/components/modal-artist/modal';
import './js/feedback/feedback-modal';
import '/assets/icons/sprite.svg';

fetchFeetbacks().then(createFeedbackList);
