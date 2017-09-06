/**
 * Returns random integer number from min to max
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export default (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
