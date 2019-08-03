import * as facade from "./facade.js"
import {view} from "./view.js"
import {Tasks} from "./model.js"
import {events} from "./events.js"

const makeReactiveProxy = obj => new Proxy(obj, {
  set
})

const makeServerProxy = (obj) =>  new Proxy(obj, {
  get(target, prop){
    if(typeof target[prop] === 'function') {
      return async (arg, payload) => {
        if(!facade[prop]) return target[prop];
        const item = target.returnTask(arg) || arg;
        if(typeof item === 'object') {
          item.taskId = item._id;
        }
        if(prop === 'filterTasks') {
          const serverTasks = await facade[prop](item, payload);
          if(serverTasks) target.replaceTasks(...serverTasks);
        }
        else {
          await facade[prop](item, payload);
          const serverTasks = await facade.get();
          target.replaceTasks(...serverTasks);
        }
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

function addEventListeners(htmlNode, tasks) {
  events.forEach((eventName) =>
    htmlNode.addEventListener(eventName, ({detail}) => {
      tasks[eventName](...[detail].flat())

    }))
}

export async function init() {
  const parentNode = document.getElementById('main-container');
  addEventListeners(parentNode, serverProxy);
  const serverTasks = await facade.get()
  reactiveTasks.replaceTasks(...serverTasks);
}
