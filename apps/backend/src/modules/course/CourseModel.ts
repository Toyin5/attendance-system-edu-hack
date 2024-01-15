import mongoose from 'mongoose';

const course = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lecturer_name: {
    type: String,
  },
  email: {
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
  // students:
});

export default mongoose.model('Courses', course);
