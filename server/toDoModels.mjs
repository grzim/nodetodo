
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  isCompleted: {
    type: Number,
    default: false
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Tasks', TaskSchema);
