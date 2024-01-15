import mongoose from 'mongoose';

const student = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
  },
});

export default mongoose.model('Students', student);
