export const events = ['addTasks','deleteTask','filterTasks','editTask'];

export const [addTasksEvent, deleteTaskEvent, filterTasksEvent, editTaskEvent] =
  events
    .map(eventName =>
      (detail) => new CustomEvent(eventName, {detail, bubbles: true }) )
