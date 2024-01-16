import { ICourse, ICourseLoginRequest } from '@common/interfaces';
import { ServiceResponse } from '@common/models/serviceResponse';
import CourseModel from './CourseModel';
import { generateSlug } from '@common/helpers/generateSlug';

export interface ICourseService {
  createCourse(course: ICourse): Promise<ServiceResponse<string>>;
  findOne(id: string): Promise<ServiceResponse<ICourse> | null>;
  findBySlug(slug: string): Promise<ServiceResponse<ICourse> | null>;
  findAll(): Promise<ServiceResponse<ICourse[]>>;
  logCourse(credentials: ICourseLoginRequest): Promise<ServiceResponse<ICourse> | null>;
}

export class courseService implements ICourseService {
  async createCourse(course: ICourse): Promise<ServiceResponse<string>> {
    const slug = generateSlug(course.name);
    const courseExists = await CourseModel.findOne({ slug });
    if (courseExists) {
      return new ServiceResponse<string>(false, 'Duplicate course', null);
    }
    const newCourse = CourseModel.create();
  }
  async findOne(id: string): Promise<ServiceResponse<ICourse> | null> {
    throw new Error('Method not implemented.');
  }
  async findBySlug(slug: string): Promise<ServiceResponse<ICourse> | null> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<ServiceResponse<ICourse[]>> {
    throw new Error('Method not implemented.');
  }
  async logCourse(credentials: ICourseLoginRequest): Promise<ServiceResponse<ICourse> | null> {
    throw new Error('Method not implemented.');
  }
}
