import {createTaskNode} from "./createTaskNode.js"

const addTask = tasks => () => {
  const newtask = document.getElementById('newtask');
  tasks.addTasks({name: newtask.value, isCompleted: false})
}

const clearHTML = (container, containerCopy, parent) => {
  document.getElementById('incompletetasks').innerHTML = ''
  document.getElementById('completedtasks').innerHTML = ''
  document.getElementById('newtask').value = "";
  container.remove();
  parent.append(containerCopy)

}

const actionAdd = (tasks) => {
  const toDo = document.getElementById('todo');
  const add = addTask(tasks);
  toDo.addEventListener('click', add) ;
  return (() => toDo.removeEventListener('click' ,add));
}

export const view = () => {
  let tasksCleaner = [];
  const container = document.getElementById('container');
  const containerCopy = container.cloneNode(true);
  const parent = container.parentNode;
  return (tasks) => {
    tasksCleaner.forEach(cleaner => cleaner(), );
    clearHTML(container, containerCopy, parent);
    tasksCleaner = [...tasks.all.map(createTaskNode(tasks)), actionAdd(tasks)];
  }
}
