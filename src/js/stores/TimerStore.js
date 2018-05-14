import { observable } from 'mobx';
import differenceInMinutes from '../util/differenceInMinutes';


class TimerStore {

  @observable workLength = 25;
  @observable breakLength = 5;
  @observable currentTimer = null;
  @observable currentTask = '';
  
  startWork() {
    console.log('this', this);
    this.currentTimer = {
      workStart: Date.now(),
      workEnd: null,
      breakEnd: null,
    };
  }
  
  endWork() {
    this.currentTimer.workEnd = Date.now();
  }
  
  endBreak() {
    this.currentTimer.breakEnd = Date.now();
  }

  setTask(task) {
    console.log('setTask', task);
    this.currentTask = task;
  }

  reset() {
    this.currentTimer = null;
  }

  checkStatus() {
    const {
      currentTimer,
      breakLength,
      workLength,
    } = this;
        
    // Not running; do nothing
    if (!currentTimer) return;

    // Break done
    if (currentTimer.breakEnd) {
      return;

    // On break
    } else if (currentTimer.workEnd) {

      const remainingTime = breakLength - differenceInMinutes(currentTimer.workEnd, Date.now());

      if (remainingTime <= 0) {
        this.endBreak();
        alert('Break over!');
      }

    } else {

      const remainingTime = workLength - differenceInMinutes(currentTimer.workStart, Date.now());

      if (remainingTime <= 0) {
        this.endWork();
        alert('Time for a break!');
      }

    }
  }

  isRunning() {
    return this.currentTimer && !this.currentTimer.breakEnd;
  }

}

export default new TimerStore();
