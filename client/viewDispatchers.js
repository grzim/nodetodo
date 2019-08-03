import {addTasksEvent, deleteTaskEvent, editTaskEvent, filterTasksEvent, addDescription} from "./events.js"

export const addTaskDispatch = function (name) {
  return function (node) {
    node.dispatchEvent(addTasksEvent({name, isCompleted: false}))
  }
}

export const filterTasksDispatch = function (value) {
  return function (node) {
    node.dispatchEvent(filterTasksEvent(value))
  }
}

export const deleteTaskDispatch = function (tasks, listItem, name) {
  return function (node) {
    node.dispatchEvent(deleteTaskEvent({name}))
  }
}

export const editTaskDispatch = function (originalName, data) {
  return function (node) {
    node.dispatchEvent(editTaskEvent([{name: originalName}, data]))
  }
}

export const addDescriptionDispatch = function (value) {
  return function (node) {
    node.dispatchEvent(addDescription(value))
  }
}
