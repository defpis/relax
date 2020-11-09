import { rest } from 'msw';

export const ping = rest.get('/api/ping', (request, response, context) => {
  return response(
    context.status(200, 'OK'),
    context.json({
      msg: 'pong',
    }),
  );
});
