/**
 * Calculates the difference between a start and end date, and subtracts that from a limit.
 * Returns the result a colon-separated string of numbers, like a timestamp (e.g., 23:45).
 * @param {number} start 
 * @param {number} end 
 * @param {number} limit 
 */
export default function countdown(start, end, limit) {
  let diff = end - start;

  diff = (limit * 1000 * 60) - diff;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  
  const mins = Math.floor(diff / (1000 * 60));
  diff -= mins * 1000 * 60;
  
  const secs = Math.floor(diff / (1000));
  
  if (hours) {
    return [hours,mins,secs].map(t => t > 9 ? t : '0' + t).join(':');
  } else {
    return [mins,secs].map(t => t > 9 ? t : '0' + t).join(':');
  }
}
