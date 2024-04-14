import express, { Router } from 'express';
import { ICourseService, courseService } from './courseService';
import { UserService } from '@modules/user/userService';
import { IVerificationService, VerificationService } from '@modules/verification/verificationService';
import { CourseController } from './courseController';
import { deserializeUser } from '@common/middleware/auth';

const router: Router = express.Router();
const verificationService: IVerificationService = new VerificationService();
const userService = new UserService(verificationService);
const service: ICourseService = new courseService();
const controller = new CourseController(service, userService);

router.post('/course', deserializeUser, controller.createCourse);
router.get('/courses', controller.getAllCourses);
router.get('/course/:id', controller.getCourseById);
router.get('/mycourses', deserializeUser, controller.getCourseByLecturer);
router.get('/course/:slug', controller.getCourseBySlug);

export const courseRouter = router;
