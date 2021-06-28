import { Router } from 'express';
import UserController from './controllers/UserController';
import TagController from './controllers/TagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import ComplimentController from './controllers/ComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';

const router = Router();

const userController = new UserController();
const tagController = new TagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new ComplimentController();

router.post('/users', userController.store);
router.get('/users', ensureAuthenticated, userController.index);
router.post('/session', authenticateUserController.store);
router.post('/tags', ensureAuthenticated, ensureAdmin, tagController.store);
router.get('/tags', ensureAuthenticated, tagController.index);
router.post(
  '/users/compliments/create',
  ensureAuthenticated,
  complimentController.store
);
router.get(
  '/users/compliments/receive',
  ensureAuthenticated,
  complimentController.receive
);
router.get(
  '/users/compliments/send',
  ensureAuthenticated,
  complimentController.sender
);

export default router;
