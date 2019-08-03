import todoList from './toDoController';
import express from "express";
const router = express.Router();
export default function(app) {

  // todoList Routes
  app.route('/tasks')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);

  app.route('/tasks/includes/')
    .get(todoList.list_tasks_including)

  app.route('/tasks/includes/:phrase')
    .get(todoList.list_tasks_including)

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.use("/ws", router);

};
