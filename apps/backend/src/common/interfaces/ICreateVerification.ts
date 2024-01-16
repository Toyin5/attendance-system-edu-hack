import { Schema } from 'mongoose';

export interface ICreateVerification {
  token: string;
  userId: Schema.Types.UUID;
}
