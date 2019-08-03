const serverUrl = 'http://localhost:3000/tasks/';

async function get() {
  const response = await fetch(serverUrl);
  return await response.json() || [];
}

async function filterTasks(phrase) {
  const response = await fetch(serverUrl + 'includes/' + phrase);
  return await response.json() || [];
}

async function addTasks(data) {
  const response = await fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return await response.json();
}


async function editTask({taskId}, data) {
  const response = await fetch(serverUrl + taskId, {method: "PUT",
    body: JSON.stringify({...data, taskId}) });
  return await response.json();
}

async function deleteTask(data) {
  const response = await fetch(serverUrl + data.taskId, {method: "DELETE",
    body: JSON.stringify(data) });
  return await response.json();
}

export {get, addTasks, editTask, deleteTask, filterTasks};
