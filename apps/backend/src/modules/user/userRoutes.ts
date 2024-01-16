import express, { Router } from 'express';
import { UserController } from '@modules/user/userController';
import { IUserService, UserService } from '@modules/user/userService';
import { IVerificationService, VerificationService } from '@modules/verification/verificationService';
import { deserializeUser } from '@common/middleware/auth';

const router: Router = express.Router();
const verificationService: IVerificationService = new VerificationService();
const userService: IUserService = new UserService(verificationService);
const controller: UserController = new UserController(userService, verificationService);

router.get('/users', controller.getAllUsers);
router.get('/user/:id', controller.getUserById);
router.post('/user/register', controller.register);
router.post('/user/login', controller.login);
router.post('/user/logout', controller.logout);
router.post('/user/verify', controller.verify);
router.post('/user/onboard', deserializeUser, controller.onBoard);

export const usersRouter: Router = router;
