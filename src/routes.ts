import { Router } from 'express';
import CreateUserController from './controllers/CreateUserController';
import CreateTagController from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import AuthenticateUserController from './controllers/AuthenticateUserController';
import CreateComplimentController from './controllers/CreateComplimentController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post('/users', createUserController.store);
router.post('/session', authenticateUserController.store);
router.post('/tags', ensureAdmin, createTagController.store);
router.post('/compliments', createComplimentController.store);

export default router;
