import { Schema } from 'mongoose';

export interface IUser {
  _id: Schema.Types.UUID;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title: string;
  avatar: string;
  intro: string;
  qualifications: [string];
  verified: boolean;
  isOnboardingCompleted: boolean;
  verifyPassword(candidatePassword: string): Promise<boolean>;
}
