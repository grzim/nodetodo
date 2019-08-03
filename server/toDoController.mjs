import {debounce} from "../commons/commons.mjs"

import mongoose from 'mongoose';

const Task = mongoose.model('Tasks');
const debounced = debounce()

const exports = {};

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.list_tasks_including = async function({params: {phrase}}, res) {
  await debounced(2000, null, (_, phrase, res) =>{
    if(!phrase) exports.list_all_tasks(_, res);
    else Task.find(phrase ? {name: {$regex: phrase}} : {}, function(err, task) {
        if (err)
          res.send(err);
        res.json(task);
      },
    )},(_, res) => res.end(), phrase, res);
};


exports.create_a_task = function(req, res) {
  const new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
    Task.findById(req.params.taskId, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    })

};


exports.update_a_task = function(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
  })
};


exports.delete_a_task = function(req, res) {
  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

export default exports;
