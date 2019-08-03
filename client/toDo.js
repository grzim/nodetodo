const serverUrl = 'http://localhost:3000/tasks/';

async function get() {
  const response = await fetch(serverUrl );
  return await response.json() || [];
}

async function post(data) {
  const response = await fetch(serverUrl, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return await response.json();
}


async function put({taskId}, data) {
  const response = await fetch(serverUrl + taskId, {method: "PUT",
    body: JSON.stringify({...data, taskId}) });
  return await response.json();
}

async function remove(data) {
  const response = await fetch(serverUrl + data.taskId, {method: "DELETE",
    body: JSON.stringify(data) });
  return await response.json();
}

export {get, post, put, remove};
