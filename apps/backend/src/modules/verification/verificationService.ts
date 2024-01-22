import { ICreateVerification } from '@common/interfaces/ICreateVerification';
import { ServiceResponse } from '@common/models/serviceResponse';
import verificationModel from './verificationModel';
import { logger } from '@src/server';
import userModel from '@modules/user/userModel';

export interface IVerificationService {
  createVerification(credentials: ICreateVerification): Promise<ServiceResponse<void>>;
  verifyToken(credentials: ICreateVerification): Promise<ServiceResponse<boolean>>;
}

export class VerificationService implements IVerificationService {
  async createVerification(credentials: ICreateVerification): Promise<ServiceResponse<void>> {
    try {
      const { token, userId } = credentials;
      await verificationModel.create({ token, userId });
      return new ServiceResponse<void>(true, 'Token created', null);
    } catch (error) {
      logger.error(error);
      return new ServiceResponse<void>(false, 'Internal server error', null, error);
    }
  }
  async verifyToken(credentials: ICreateVerification): Promise<ServiceResponse<boolean>> {
    try {
      const { token, userId } = credentials;
      const verification = await verificationModel.findOne({ userId });
      console.log('body:', token);
      if (!verification) {
        return new ServiceResponse<boolean>(false, 'Link expired', null);
      }
      console.log('db:', verification.token);
      if (verification.token === token) {
        await userModel.findByIdAndUpdate(userId, { verified: true });
        await verificationModel.findOneAndDelete({ userId });
        return new ServiceResponse<boolean>(true, 'Verified successfully', null);
      }
      return new ServiceResponse<boolean>(false, 'Invalid link', null);
    } catch (error) {
      logger.error(error);
      return new ServiceResponse<boolean>(false, 'Internal server error', null, error);
    }
  }
}
