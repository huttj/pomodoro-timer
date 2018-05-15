import { observable } from 'mobx';
import differenceInMinutes from '../util/differenceInMinutes';
import countdown from '../util/countdown';


class TimerStore {

  @observable workLength = 25;
  @observable breakLength = 5;
  @observable longBreakLength = 15;
  @observable currentTimer = null;
  @observable roundsCompleted = 0;
  @observable longBreakAfter = 4;

  startWork() {
    this.currentTimer = {
      workStart: Date.now(),
      workEnd: null,
      breakEnd: null,
      isLong: false,
    };

    // Create a long break after every four rounds
    const {longBreakAfter} = this;
    if (this.roundsCompleted % (longBreakAfter + 1) === longBreakAfter) {
      this.currentTimer.workEnd = this.currentTimer.workStart;
      this.currentTimer.isLong = true;
    }
  }
  
  endWork() {
    this.currentTimer.workEnd = Date.now();
  }
  
  endBreak() {
    this.currentTimer.breakEnd = Date.now();
  }

  reset() {
    this.currentTimer = null;
  }

  getRemainingTime() {
  
    const { currentTimer, workLength, breakLength, longBreakLength } = this;

    if (!currentTimer) return '';
  
    const actualBreakLength = currentTimer.isLong ? longBreakLength : breakLength;

    if (currentTimer.breakEnd) {
      return '';
  
    } else if (currentTimer.workEnd) {
      return countdown(currentTimer.workEnd, Date.now(), actualBreakLength);
  
    } else if (currentTimer.workStart) {
      return countdown(currentTimer.workStart, Date.now(), workLength);
    }
  
    throw new Error('Unknown state');
  }

  checkStatus() {
    const {
      currentTimer,
      breakLength,
      workLength,
      longBreakLength,
    } = this;

    // Not running; do nothing
    if (!currentTimer) return;

    const actualBreakLength = currentTimer.isLong ? longBreakLength : breakLength;
        
    // Break done
    if (currentTimer.breakEnd) {
      return '';

    // On break
    } else if (currentTimer.workEnd) {

      const remainingTime = actualBreakLength - differenceInMinutes(currentTimer.workEnd, Date.now());

      if (remainingTime <= 0) {
        this.endBreak();
        this.roundsCompleted++;
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

  getStatus() {
    const { currentTimer, workLength, breakLength, longBreakLength } = this;

    if (!currentTimer || currentTimer.breakEnd) {

      // Since we're counting long breaks (to avoid complexity around a `longBreakCompleted`
      // flag or a separate count), this counts only the actual work rounds completed.
      const rc = this.roundsCompleted - Math.floor(this.roundsCompleted / (this.longBreakAfter));

      if (!rc) {
        return 'Ready';
      }
      return `${rc} round${rc == 1 ? '' : 's'} completed`;
    
    } else if (currentTimer.workEnd) {
      return 'On Break';
  
    } else if (currentTimer.workStart) {
      return 'Working'
    }
  }

}

export default new TimerStore();
