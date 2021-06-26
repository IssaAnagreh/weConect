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
 * Represents counting the blanks.
 * @param {string} pancake - The pancake.
 */
const countBlanks = (arr: any[]) => arr.filter(char => char === '-').length;

/**
 * Represents last checking if the row still have blanks in the positions (position > row.length - k).
 * @param {string} pancake - The pancake.
 */
const stillHaveBlanks = (arr: any[], k: number) =>
  arr.slice(-k).filter(char => char === '-').length;

/**
 * Represents pancakeFlipper.
 * @param {number} k - The flipper size.
 * @param {string} row - The pancakes row.
 */
const pancakeFlipper = (k: number, row: string) => {
  let changes = 0;
  let arr = row.split('');
  const numberOfBlanks = countBlanks(arr);

  if (k === 1) return numberOfBlanks;

  if (
    (isEven(k) && !isEven(numberOfBlanks)) ||
    (!isEven(k) && isEven(numberOfBlanks))
  )
    return 'IMPOSSIBLE!';

  let left = 0;
  while (left <= arr.length - k) {
    if (arr[left] !== '+') {
      for (let i = 0; i < k; ++i) {
        arr.splice(left + i, 1, flip(arr[left + i]));
      }
      ++changes;
    }
    ++left;
  }

  return stillHaveBlanks(arr, k) > 0 ? 'IMPOSSIBLE!' : changes;
};

/**
 * Represents pancakeTester.
 * @param {string} lines - Testing scenarios.
 */
const pancakeTester = (lines: string) => {
  let arr = lines.split('\n');

  if (+arr[0] > 100) {
    console.log(`Too many test cases`);
    return;
  }

  arr.slice(1).forEach((line, index) => {
    let arr = line.split(' ');
    let k: number = +arr[1];
    let row: string = arr[0];
    console.log(`Case #${index + 1}: ${pancakeFlipper(k, row)}`);
  });
};

// Invocation test scenarios.
pancakeTester('2\n-- 2\n++ 2\n+-+-+ 4\n-+-+- 3\n---+-++- 3\n+++++-+- 3');
