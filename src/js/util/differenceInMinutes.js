/**
 * Returns the difference between two dates in minutes
 * @param {number} start 
 * @param {number} end 
 */
export default function differenceInMinutes(start, end) {
  return (end - start) / (1000 * 60)
}
