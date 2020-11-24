import { Router } from 'express';

import postMessage from './handler';
import middlewares from '../../../middlewares';

const router = Router();
const { withMessageService } = middlewares;

router.post(
  '/messages',
  withMessageService,
  postMessage,
);

export default router;
