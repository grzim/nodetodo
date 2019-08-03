export const events = ['addTasks','deleteTask','filterTasks','editTask', 'addDescription'];

export const [addTasksEvent, deleteTaskEvent, filterTasksEvent, editTaskEvent, addDescription] =
  events
    .map(eventName =>
      (detail) => new CustomEvent(eventName, {detail, bubbles: true }) )
