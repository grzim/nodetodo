import {deleteTaskDispatch, editTaskDispatch} from "./viewDispatchers.js"

const toggleCompletionTask = function (tasks, listItem) {
  return function () {
    const checkbox = listItem.querySelector("[type='checkbox']")
    const isCompleted = checkbox.checked
    const label = listItem.querySelector("label")
    const originalName = label.innerHTML
    editTaskDispatch(originalName, {isCompleted})(listItem);
  }
}



const editTask = function (tasks, listItem) {
  return function () {
    const editInput = listItem.querySelector('input[type=text]')
    const label = listItem.querySelector("label")
    const originalName = label.innerHTML
    const containsClass = listItem.classList.contains("editMode")
    if (containsClass) {
      label.innerText = editInput.value
      editTaskDispatch(originalName, {name: label.innerText})(listItem);
    } else {
      editInput.value = label.innerText
    }
    listItem.classList.toggle("editMode")
  }
}
export const createTaskNode = tasks => ({name, isCompleted = false}, i) => {

  const incompletetasks = document.getElementById('incompletetasks')
  const completedtasks = document.getElementById('completedtasks')

  const [listItem, checkBox, label, editInput, editButton, deleteButton] = ["li", "input", "label", "input", "button", "button"].map(t => document.createElement(t))

  label.innerText = name

  checkBox.type = "checkbox"
  editInput.type = "text"
  checkBox.checked = isCompleted

  editButton.innerText = "Edit"//innerText encodes special characters, HTML does not.
  editButton.className = "edit"
  deleteButton.innerText = "Delete"
  deleteButton.className = "delete";
  [checkBox, label, editInput, editButton, deleteButton].forEach(item => listItem.appendChild(item))

  const edit = editTask(tasks, listItem)
  const remove = deleteTaskDispatch(tasks, listItem, label.innerText).bind(null, deleteButton)
  const toggleCompletion = toggleCompletionTask(tasks, listItem)

  checkBox.addEventListener('change', toggleCompletion)
  editButton.addEventListener('click', edit)
  deleteButton.addEventListener('click', remove)

  isCompleted ?
    completedtasks.appendChild(listItem) :
    incompletetasks.appendChild(listItem)

  return () => {
    checkBox.removeEventListener('change', toggleCompletion)
    editButton.removeEventListener('click', edit)
    deleteButton.removeEventListener('click', remove)
  }
}
