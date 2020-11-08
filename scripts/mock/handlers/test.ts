import { rest } from 'msw';

export const testHandlers = [
  rest.get('/api/ping', (request, response, context) => {
    return response(
      context.status(200, 'OK'),
      context.json({
        msg: 'pong',
      }),
    );
  }),
];
