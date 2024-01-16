import mongoose from 'mongoose';

const course = new mongoose.Schema(
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
    avatar_url: {
      type: String,
    },
    course_code: {
      type: String,
      unique: true,
    },
    lecturer: {
      type: mongoose.Types.ObjectId,
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
