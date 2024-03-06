import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@common/interfaces';
import { randomUUID } from 'crypto';

const UserModel = new mongoose.Schema<IUser, unknown, unknown>(
  {
    _id: {
      type: Schema.Types.UUID,
      default: () => randomUUID(),
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    title: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    avatar: {
      type: String,
    },
    intro: {
      type: String,
    },
    qualifications: {
      type: [String],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isOnboardingCompleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    methods: {
      async verifyPassword(candidatePassword: string) {
        console.log(this.password);
        console.log(candidatePassword);
        if (!this.password) {
          return false;
        }
        const isValid = await bcrypt.compare(candidatePassword, this.password);
        return isValid;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

UserModel.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password!, salt);

  return next();
});

export default mongoose.model('Users', UserModel);
