import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * @param {Array} array
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

/**
 * @returns {{ values: number[], answers: number[] }}
 */
function getRiddle() {
  const patterns = [
    [-20, -10, 0],
    [-10, 0, 10],
    [0, 10, 20]
  ];

  const values = shuffle([
    1 + Math.floor(Math.random() * 33),
    33 + Math.floor(Math.random() * 33),
    66 + Math.floor(Math.random() * 33)
  ]);

  const sum = values.reduce((p, c) => p + c, 0);
  const pattern = shuffle(patterns)[0];
  const answers = pattern.map(v => sum + v);

  return {
    values,
    answers: shuffle(answers)
  };
}

(() => {
  const file = resolve(process.cwd(), 'resources', 'data.json');
  const riddles = Array.from({ length: 10 }).map(() => getRiddle());
  writeFileSync(file, JSON.stringify(riddles));
})();
