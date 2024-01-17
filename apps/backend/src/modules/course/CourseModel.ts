import { ICourse } from '@common/interfaces';
import mongoose from 'mongoose';

const course = new mongoose.Schema<ICourse, unknown, unknown>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
    code: {
      type: String,
      unique: true,
    },
    lecturer: {
      type: mongoose.Types.UUID,
      ref: 'Users',
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model('Courses', course);
