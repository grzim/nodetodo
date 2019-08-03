
'use strict';
const mongoose = require('mongoose');
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

module.exports = mongoose.model('Tasks', TaskSchema);
