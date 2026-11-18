import { MathUtil } from '../utils';

export type Riddle = {
  score: number;
  values: number[];
  answers: number[];
};

export class Logic {
  private static readonly DEFAULT_RIDDLE: Riddle = {
    score: 0,
    values: [0, 0, 0],
    answers: [0, 0, 0]
  };

  private static readonly PATTERNS = [
    [-20, -10, 0],
    [-10, 0, 10],
    [0, 10, 20]
  ];

  private _score = 0;
  private _riddle = Logic.DEFAULT_RIDDLE;

  public init(): void {
    this._score = 0;
    this._riddle = Logic.DEFAULT_RIDDLE;
  }

  public getScore(): number {
    return this._score;
  }

  public getRiddle(): Riddle {
    const values = MathUtil.shuffle([
      1 + Math.floor(Math.random() * 33),
      33 + Math.floor(Math.random() * 33),
      66 + Math.floor(Math.random() * 33)
    ]);

    const sum = values.reduce((p, c) => p + c, 0);
    const pattern = MathUtil.shuffle(Logic.PATTERNS)[0];
    const answers = pattern.map(v => sum + v);

    this._riddle = {
      score: this._score,
      values,
      answers: MathUtil.shuffle(answers)
    };

    return this._riddle;
  }

  public evaluateAnswer(i: number): boolean {
    const { values, answers } = this._riddle;

    if (values.reduce((p, c) => p + c, 0) === answers[i]) {
      this._score += 1;
      return true;
    }

    return false;
  }
}
