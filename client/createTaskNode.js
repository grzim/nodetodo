const toggleCompletionTask = (tasks,listItem) => () => {
  const checkbox=listItem.querySelector("[type='checkbox']");
  const isCompleted = checkbox.checked
  const label=listItem.querySelector("label");
  const originalName = label.innerHTML;
  tasks.editTask({name: originalName},{isCompleted})

}
const editTask = (tasks,listItem) => () => {

  const editInput=listItem.querySelector('input[type=text]');
  const label=listItem.querySelector("label");
  const originalName = label.innerHTML;
  const containsClass=listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    tasks.editTask({name: originalName},{name: label.innerText})
  } else {
    editInput.value=label.innerText;
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
}

const deleteTask =(tasks,listItem) => () => {
  const label=listItem.querySelector("label");
  tasks.deleteTask({name: label.innerText})
}

export const createTaskNode = tasks => ({name, isCompleted = false}, i) => {

  const incompletetasks = document.getElementById('incompletetasks');
  const completedtasks = document.getElementById('completedtasks');

  const [listItem, checkBox, label, editInput, editButton, deleteButton] = ["li", "input","label", "input", "button", "button"].map(t => document.createElement(t));

  label.innerText = name;

  checkBox.type="checkbox";
  editInput.type="text";
  checkBox.checked = isCompleted;

  editButton.innerText="Edit";//innerText encodes special characters, HTML does not.
  editButton.className="edit";
  deleteButton.innerText="Delete";
  deleteButton.className="delete";
  [checkBox,label,editInput,editButton,deleteButton].forEach(item => listItem.appendChild(item))

  const edit = editTask(tasks, listItem);
  const remove = deleteTask(tasks, listItem);
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

  };
}
