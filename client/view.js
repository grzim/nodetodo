import {createTaskNode} from "./createTaskNode.js"
import {addTaskDispatch, filterTasksDispatch} from "./viewDispatchers.js";



const clearHTML = (container, containerCopy, parent) => {
  document.getElementById('incompletetasks').innerHTML = ''
  document.getElementById('completedtasks').innerHTML = ''
  document.getElementById('newtask').value = "";
  container.remove();
  parent.append(containerCopy)

}

const actionAdd = function(parent){

  const toDo =   document.getElementById('todo')
  const newtask = document.getElementById('newtask')
  const addTaskOfName = () => {
    addTaskDispatch(newtask.value)(toDo)
  }
  toDo.addEventListener('click', addTaskOfName) ;
  return (() => toDo.removeEventListener('click' ,addTaskOfName));
}


const getFiltered = (container) => {
  const filterNamesInput = document.getElementById('filter-names');
  const getFilteredCallback = () => filterTasksDispatch(filterNamesInput.value)(filterNamesInput);
  filterNamesInput.addEventListener('keyup', getFilteredCallback) ;
  return (() => filterNamesInput.removeEventListener('keyup' ,getFilteredCallback));
}

export const view = () => {
  let tasksCleaner = [];
  const container = document.getElementById('container');
  const containerCopy = container.cloneNode(true);
  const parent = container.parentNode;
  return (tasks) => {
    tasksCleaner.forEach(cleaner => cleaner());
    clearHTML(container, containerCopy, parent);
    tasksCleaner = [...tasks.all.map(createTaskNode(tasks)), actionAdd(parent), getFiltered(parent)];
  }
}
