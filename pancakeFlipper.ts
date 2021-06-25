/**
 * Represents isEven.
 * @param {number} n - Any number.
 */
const isEven = (n: number) => n % 2 === 0;

/**
 * Represents flipping the pancake.
 * @param {string} pancake - The pancake.
 */
const flip = (pancake: string) => (pancake === '+' ? '-' : '+');

/**
 * Represents pancakeFlipper.
 * @param {number} fs - The flipper size.
 * @param {string} row - The pancakes row.
 */
const pancakeFlipper = (fs: number, row: string) => {
  let changes = 0;
  let arr = row.split('');
  const numberOfBlanks = arr.filter(char => char === '-').length;

  if (fs === 1) return numberOfBlanks;

  if (
    (isEven(fs) && !isEven(numberOfBlanks)) ||
    (!isEven(fs) && isEven(numberOfBlanks))
  )
    return 'IMPOSSIBLE!';

  let left = 0;
  let right = arr.length - fs;
  while (left <= right) {
    if (arr[left] !== '+') {
      for (let i = 0; i < fs; ++i) {
        arr.splice(left + i, 1, flip(arr[left + i]));
      }
      ++changes;
    }
    if (arr[right] !== '+') {
      for (let i = 0; i < fs; ++i) {
        arr.splice(right - i, 1, flip(arr[right - i]));
      }
      ++changes;
    }
    ++left;
    --right;
  }
  return changes;
};

/**
 * Represents pancakeTester.
 * @param {string} lines - Testing scenarios.
 */
const pancakeTester = (lines: string) => {
  let arr = lines.split('\n');
  arr.splice(1).forEach((line, index) => {
    let arr = line.split(' ');
    let fs: number = +arr[1];
    let row: string = arr[0];
    console.log(`Case #${index + 1}: ${pancakeFlipper(fs, row)}`);
  });
};
// Invocation test scenarios.
pancakeTester('2\n2 --\n 2 ++');
