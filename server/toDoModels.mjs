import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DescriptionSchema = new Schema({
  description: {
    type: String,
  },
  tasksNames: {
    type: [{
      type: String
    }]
  }
})

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
export const descriptionModel = mongoose.model('Description', DescriptionSchema);
