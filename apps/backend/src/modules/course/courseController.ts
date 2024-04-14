import { UserService } from '@modules/user/userService';
import { ICourseService } from './courseService';
import { Request, Response } from 'express';
import { handleServiceResponse } from '@common/utils/responseHandler';

export class CourseController {
  private readonly _service: ICourseService;
  private readonly _userService: UserService;

  constructor(service: ICourseService, userService: UserService) {
    this._service = service;
    this._userService = userService;
  }

  createCourse = async (req: Request, res: Response) => {
    const { user } = req;
    const { name, code, avatar, description } = req.body;
    const userExists = await this._userService.findById(user as unknown as string);
    if (!userExists) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    const response = await this._service.createCourse({ avatar, code, description, name, lecturer: user });
    return handleServiceResponse(response, res);
  };

  getCourseById = async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;
    const userExists = await this._userService.findById(user as unknown as string);
    if (!userExists) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    const response = await this._service.findOne(id!);
    return handleServiceResponse(response, res);
  };
  getCourseBySlug = async (req: Request, res: Response) => {
    const { slug } = req.params;
    const course = await this._service.findBySlug(slug!);
    return handleServiceResponse(course, res);
  };
  getAllCourses = async (_: Request, res: Response) => {
    const courses = await this._service.findAll();
    return handleServiceResponse(courses, res);
  };
  getCourseByLecturer = async (req: Request, res: Response) => {
    const { user } = req;
    const userExists = await this._userService.findById(user as unknown as string);
    if (!userExists) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    const courses = await this._service.findByLecturer(user as unknown as string);
    return handleServiceResponse(courses, res);
  };
}
