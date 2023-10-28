import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Number, // Representa un tinyint, 0 para false y 1 para true
      default: 0
    }
  }, {
  timestamps: true
});

export default mongoose.model('Task', taskSchema);
