import { http } from './http';

export function fetchFeetbacks(page, limit) {
  return http.get('/feedbacks', {
    params: {
      page,
      limit,
    },
  });
}

export function sendFeetbacks(feedBackData) {
  return http.post('/feedbacks', {
    data: {
      feedBackData,
    },
  });
}
