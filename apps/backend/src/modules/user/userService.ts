import { IAuthRequest, IUser } from '@common/interfaces';
import { IUSerData } from '@common/interfaces/IUserData';
import { ServiceResponse } from '@common/models/serviceResponse';
import generateRandomToken from '@common/utils/generateRandomToken';
import { sendVerification } from '@modules/services/sendMail';
import userModel from '@modules/user/userModel';
import { IVerificationService } from '@modules/verification/verificationService';
import { logger } from '@src/server';
import { Schema } from 'mongoose';

export interface IUserService {
  findAll(): Promise<ServiceResponse<IUser[] | null>>;
  findById(id: string): Promise<ServiceResponse<IUser | null>>;
  login(credentials: IAuthRequest): Promise<ServiceResponse<IUser | null>>;
  register(credentials: IAuthRequest): Promise<ServiceResponse<Schema.Types.UUID | null>>;
  onBoard(request: IUSerData): Promise<ServiceResponse<IUser | null>>;
}

export class UserService implements IUserService {
  private readonly _verificationService: IVerificationService;

  constructor(service: IVerificationService) {
    this._verificationService = service;
  }
  public async onBoard(request: IUSerData): Promise<ServiceResponse<IUser | null>> {
    const { id, avatar, firstName, lastName, intro, qualifications, title } = request;
    const userExists = await userModel.findById(id);
    if (!userExists) {
      return new ServiceResponse<IUser>(false, "User doesn't exist!", null);
    }
    const user = await userModel.findByIdAndUpdate(userExists._id, {
      firstName,
      lastName,
      intro,
      avatar,
      title,
      qualifications,
    });
    return new ServiceResponse<IUser>(true, 'User onboarded!', user);
  }

  public async login(credentials: IAuthRequest): Promise<ServiceResponse<IUser | null>> {
    try {
      const userExists = await userModel.findOne({ email: credentials.email }).select('+password');
      if (!userExists) {
        return new ServiceResponse<IUser>(false, 'Invalid email/password', null);
      }
      const isValidPassword = await userExists.verifyPassword(credentials.password);
      if (!isValidPassword) {
        return new ServiceResponse<IUser>(false, 'Invalid password', null);
      }
      if (!userExists.verified) {
        const token = generateRandomToken();
        await this._verificationService.createVerification({ token: token, userId: userExists._id });
        return new ServiceResponse<IUser>(false, 'Unverified! check your mailbox', null);
      }
      return new ServiceResponse<IUser>(true, 'Login successful', null);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<IUser>(false, 'Service error', null, ex);
    }
  }
  public async register(credentials: IAuthRequest): Promise<ServiceResponse<Schema.Types.UUID | null>> {
    try {
      const userExists = await userModel.findOne({ email: credentials.email });
      if (userExists) {
        return new ServiceResponse<Schema.Types.UUID>(false, 'Duplicate credentials', null);
      }
      const newUser = await userModel.create({ email: credentials.email, password: credentials.password });
      //send verification email
      const token = generateRandomToken();
      const result = await this._verificationService.createVerification({ token: token, userId: newUser._id });
      if (!result.success) {
        return new ServiceResponse<Schema.Types.UUID>(false, 'Error creating verification token', null);
      }
      await sendVerification(newUser.email, { name: newUser.email, token: token });
      return new ServiceResponse<Schema.Types.UUID>(true, 'User created', newUser._id);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<Schema.Types.UUID>(false, 'Service error', null, ex);
    }
  }

  public async findAll() {
    try {
      const users = await userModel.find();
      return new ServiceResponse<IUser[]>(true, 'Users found.', users);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<IUser[]>(false, 'Error finding users.', [], ex);
    }
  }

  public async findById(id: string) {
    try {
      const user = await userModel.findById(id);
      if (!user) return new ServiceResponse<IUser>(false, 'User not found.', null);
      return new ServiceResponse<IUser>(true, 'User found.', user);
    } catch (ex) {
      logger.error(ex);
      return new ServiceResponse<IUser>(false, 'Error finding user.', null, ex);
    }
  }
}
