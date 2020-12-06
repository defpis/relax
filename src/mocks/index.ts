import { setupWorker } from 'msw';
import { ping } from './test';

const worker = setupWorker(ping);

worker.start();
