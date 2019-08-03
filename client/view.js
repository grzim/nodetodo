import {createTaskNode} from "./createTaskNode.js"

const addTask = tasks => () => {
  const newtask = document.getElementById('newtask');
  tasks.addTasks({name: newtask.value, isCompleted: false})
}

const clearHTML = (container, containerCopy, body) => {
  document.getElementById('incompletetasks').innerHTML = ''
  document.getElementById('completedtasks').innerHTML = ''
  document.getElementById('newtask').value = "";
  container.remove();
  body.append(containerCopy)

}

const actionAdd = (tasks) => {
  const toDo = document.getElementById('todo');
  const add = addTask(tasks);
  toDo.addEventListener('click', add) ;
  return (() => toDo.removeEventListener('click' ,add));
}

export const view = () => {
  let tasksCleaner = [];
  const body = document.getElementsByTagName('body')[0];
  const container = document.getElementById('container');
  const containerCopy = container.cloneNode(true);
  return (tasks) => {
    tasksCleaner.forEach(cleaner => cleaner(), );
    clearHTML(container, containerCopy, body);
    tasksCleaner = [...tasks.all.map(createTaskNode(tasks)), actionAdd(tasks)];
  }
}
