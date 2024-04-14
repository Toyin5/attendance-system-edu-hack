import { ICourse } from '@common/interfaces';
import { ServiceResponse } from '@common/models/serviceResponse';
import CourseModel from './CourseModel';
import { generateSlug } from '@common/helpers/generateSlug';
import generateRandomToken from '@common/utils/generateRandomToken';
import { logger } from '@src/server';

export interface ICourseService {
  createCourse(course: ICourse): Promise<ServiceResponse<void>>;
  findOne(id: string): Promise<ServiceResponse<ICourse | null>>;
  findBySlug(slug: string): Promise<ServiceResponse<ICourse | null>>;
  findAll(): Promise<ServiceResponse<ICourse[]>>;
  findByLecturer(id: string): Promise<ServiceResponse<ICourse[] | null>>;
}

export class courseService implements ICourseService {
  async findByLecturer(id: string): Promise<ServiceResponse<ICourse[] | null>> {
    try {
      const courses = await CourseModel.find({ lecturer: id });
      return new ServiceResponse<ICourse[]>(true, 'Fetched successfully', courses);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<ICourse[]>(false, 'Internal Server Error', null, ex);
    }
  }
  async createCourse(course: ICourse): Promise<ServiceResponse<void>> {
    const { description, avatar, code, lecturer, name } = course;
    let slug = generateSlug(course.name);
    try {
      const courseExists = await CourseModel.findOne({ slug });
      if (courseExists) {
        slug += generateRandomToken();
      }
      await CourseModel.create({ name, avatar, code, description, lecturer, slug });
      return new ServiceResponse<void>(true, 'Course created successfully', null);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<void>(false, 'Internal Server Error', null, ex);
    }
  }
  async findOne(id: string): Promise<ServiceResponse<ICourse | null>> {
    try {
      const course = await CourseModel.findById(id);
      if (course) {
        return new ServiceResponse<ICourse>(true, 'Fetched successfully', course);
      }
      return new ServiceResponse<ICourse>(false, 'Not found', null);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<ICourse>(false, 'Internal Server Error', null, ex);
    }
  }
  async findBySlug(slug: string): Promise<ServiceResponse<ICourse | null>> {
    try {
      const course = await CourseModel.findOne({ slug });
      if (course) {
        return new ServiceResponse<ICourse>(true, 'Fetched successfully', course);
      }
      return new ServiceResponse<ICourse>(false, 'Not found', null);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<ICourse>(false, 'Internal Server Error', null, ex);
    }
  }
  async findAll(): Promise<ServiceResponse<ICourse[]>> {
    try {
      const courses = await CourseModel.find();
      return new ServiceResponse<ICourse[]>(true, 'Fetched successfully', courses);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<ICourse[]>(false, 'Internal Server Error', null, ex);
    }
  }
}
