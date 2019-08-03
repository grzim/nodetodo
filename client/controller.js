import {get, post, put, remove} from "./toDo.js"
import {view} from "./view.js"
import {Tasks} from "./model.js"

const makeReactiveProxy = obj => new Proxy(obj, {
  set
})

const makeServerProxy = (obj) =>  new Proxy(obj, {
  get(target, prop){
    if(typeof target[prop] === 'function') {
      return async (taskArg, payload) => {
        const task = target.returnTask(taskArg) || taskArg;
        task.taskId = task._id;
        const actions = {
          deleteTask: remove,
          addTasks: post,
          editTask: put
        }
        await actions[prop](task, payload);

        const serverTasks = await get();
        target.replaceTasks(...serverTasks);
      }
    }
    else return target[prop]
  }
})



const tasks = new Tasks()
const renderer = view()
const reactiveTasks = makeReactiveProxy(tasks);
const serverProxy = makeServerProxy(reactiveTasks)

function set(target, prop, value) {
  target[prop] = value
  renderer(serverProxy)
  return value;
}

export async function init() {
  const serverTasks = await get()
  reactiveTasks.replaceTasks(...serverTasks);
}
