export class Tasks {
  constructor(tasks = []) {
    this.all = tasks
  }

  addDescription(descr) {
    this.description = descr;
  }

  addTasks(...tasks) {
    this.all = [...this.all, ...tasks.filter(task => !this.all.map(t => t.name).includes(task.name))];
    return tasks;
  }

  replaceTasks(...tasks) {
    this.all = [...tasks];
    return tasks;
  }

  returnTask({name}) {
    return this.all.filter(t => t.name === name)[0];
  }

  filterTasks(phrase) {
    return this.all.filter(t => t.name.includes(phrase));
  }

  getDetails({name}) {
    return this.all.filter(t => t.name === name)[0];
  }

  deleteTask({name}) {
    this.all = this.all.filter(t => t.name !== name)
  }

  editTask(taskToEdit, data) {
    this.all = this.all.map(task => (task.name === taskToEdit.name) ? {...task, ...data} : task)
  }

}

