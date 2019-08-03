import expressws from 'express-ws'
import mongoose from "mongoose"

const Description = mongoose.model('Description')
const Task = mongoose.model('Tasks')

const updateDescription = (ws, data) =>
  Description.findOneAndUpdate({}, data, {useFindAndModify: false}, function (err, task) {
    console.log(data)
    Task.find({}, function (err, tasks) {
      if (err) return
      const taskNames = tasks.map(({name}) => name)
      ws.send(JSON.stringify({...data, tasksNames: taskNames.join(" ")}))
    })
  })



export const init = (app, expressWs) => {
  const emit = {
    namesUpdated(){}
  }
  expressWs.getWss().on('connection', function (ws) {
    ws.send('connection open')
    Task.find({}, function (err, tasks) {
      if(!Description.count({})) {
        const tasksNames = tasks.map(({name}) => name)
        const defaultDesc = {description: "", tasksNames};
        const newDesc = new Description(defaultDesc);
        newDesc.save();
        ws.send(JSON.stringify(defaultDesc))

      }
      Description.findOne({}, function (err, desc) {
        const tasksNames = tasks.map(({name}) => name)
        ws.send(JSON.stringify({description: desc.description, tasksNames}))
      })
    })
  })
  const ws = (ws, req) => {
    ws.on('message', msg => {
      let parsed
      try {
        parsed = JSON.parse(msg)
        const description = parsed.addDescription
        if (description)
          updateDescription(ws, {description});
      } catch (e) {
        parsed = msg
      }
    })
    ws.on('open', msg => {
      ws.send('hello')
    })
    emit.namesUpdated = () => Description.findOne({}, (err, {description}) => updateDescription(ws, {description}));
  }
  app.ws('/ws', ws)
  return emit;
}


