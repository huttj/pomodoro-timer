import { observable } from 'mobx';

class TaskStore {

  @observable currentTask = '';
  @observable tasks = [];

  setCurrentTask(task) {
    this.currentTask = task;
  }

  clearCurrentTask() {
    this.currentTask = '';
  }

  addCurrentTask() {
    if (!this.currentTask) return;

    this.tasks.push({
      id: Math.random()*10000 | 0,
      name: this.currentTask,
      createdAt: Date.now(),
      completed: false
    });
    this.currentTask = '';
    this.sort();
  }

  removeTask(task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  toggleComplete(task) {
    task.completed = !task.completed;
    this.sort();
  }

  sort() {
    this.tasks = this.tasks.sort((a,b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (b.completed && !a.completed) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log(this.tasks);
  }

}

export default new TaskStore();
