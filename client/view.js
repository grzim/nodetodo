import {createTaskNode} from "./createTaskNode.js"
import {addTaskDispatch, filterTasksDispatch, addDescriptionDispatch} from "./viewDispatchers.js";

const clearHTML = (container, containerCopy, parent) => {
  document.getElementById('incompletetasks').innerHTML = ''
  document.getElementById('completedtasks').innerHTML = ''
  document.getElementById('newtask').value = "";
  container.remove();
  parent.append(containerCopy)

}

const actionAdd = function(){
  const toDo =   document.getElementById('todo')
  const newtask = document.getElementById('newtask')
  const addTaskOfName = () => {
    addTaskDispatch(newtask.value)(toDo)
  }
  toDo.addEventListener('click', addTaskOfName) ;
  return (() => toDo.removeEventListener('click' ,addTaskOfName));
}


const getFiltered = () => {
  const filterNamesInput = document.getElementById('filter-names');
  const getFilteredCallback = () => filterTasksDispatch(filterNamesInput.value)(filterNamesInput);
  filterNamesInput.addEventListener('keyup', getFilteredCallback) ;
  return (() => filterNamesInput.removeEventListener('keyup' ,getFilteredCallback));
}

const addDescription = () => {
  const buttonSend = document.getElementById('websocket-send');
  const websocketInput = document.getElementById('websocket-input');
  const send = () => addDescriptionDispatch(websocketInput.value)(buttonSend);
  buttonSend.addEventListener('click', send);
  return () => {
    buttonSend.removeEventListener('click', send);
  }
}

const displayDescription = ({description, tasksNames} = {description: '', names: ''}) => {
  const placeholder = document.getElementById('websocket-placeholder');
  placeholder.innerHTML = `<p>Description</p>${description}<p>${tasksNames}</p>`
}


export const view = (mainContainer) => {
  let tasksCleaner = [];
  const container = document.getElementById('container');
  const containerCopy = container.cloneNode(true);
  const parent = container.parentNode;
  return (tasks) => {
    tasksCleaner.forEach(cleaner => cleaner());
    clearHTML(container, containerCopy, parent);
    displayDescription(tasks.description)
    tasksCleaner = [...tasks.all.map(createTaskNode(tasks)),
      actionAdd(parent), getFiltered(parent), addDescription()];
  }
}
