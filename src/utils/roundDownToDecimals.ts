// utils/roundDownToDecimals.ts

/**
 * Rounds down a number to a specified number of decimal places.
 * @param {number} num - The number to round down.
 * @param {number} decimals - The number of decimal places.
 * @returns {number} - The rounded down number.
 */
const roundDownToDecimals = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    return Math.floor(num * factor) / factor;
  };
  
  export default roundDownToDecimals;
  