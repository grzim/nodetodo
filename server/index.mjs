import express from 'express';
import mongoose from 'mongoose';
import Task from './toDoModels';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './toDoRoutes';
import {init} from "./websocket"
import expressws from "express-ws"
const app = express(),
  port = process.env.PORT || 3000;

export const expressWs = expressws(app)
export const emit = init(app, expressWs);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/Tododb');

app.use(cors())
app.use(bodyParser.json({ type : '*/*' }));
// use it before all route definitions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app); //register the route

app.listen(port);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('todo list RESTful API server started on: ' + port);
