import countdown from './countdown';

/**
 * Calculates the remaining time of the current work session or break.
 * @param {Object} param 
 * @param {Object} param.currentTimer
 * @param {number} param.currentTimer.workStart - When the timer started
 * @param {number} param.currentTimer.workEnd - When the work session ended
 * @param {number} param.currentTimer.breakEnd - When the break ended
 * @param {number} param.workLength - How long the work session should last, in minutes
 * @param {number} param.workLength - How long the break should last, in minutes
 */
export default function displayRemainingTime({ currentTimer, breakLength, workLength }) {
  
  if (!currentTimer) return '';

  // Timer is finished; don't
  if (currentTimer.breakEnd) {
    return '';

  } else if (currentTimer.workEnd) {
    return countdown(currentTimer.workEnd, Date.now(), breakLength);
  } else if (currentTimer.workStart) {
    return countdown(currentTimer.workStart, Date.now(), workLength);
  }

  throw new Error('Unknown state');
}