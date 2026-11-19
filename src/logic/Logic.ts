import { Assets } from 'pixi.js';

import { MathUtil } from '../utils';

type Data = {
  values: number[];
  answers: number[];
};

export type Riddle = {
  score: number;
} & Data;

export class Logic {
  private static readonly DEFAULT_RIDDLE: Riddle = {
    score: 0,
    values: [0, 0, 0],
    answers: [0, 0, 0]
  };

  private _score = 0;
  private _riddle = Logic.DEFAULT_RIDDLE;
  private readonly _riddles = Assets.get<Data[]>('data');

  public init(): void {
    this._score = 0;
    this._riddle = Logic.DEFAULT_RIDDLE;
  }

  public getScore(): number {
    return this._score;
  }

  public getRiddle(): Riddle {
    const { values, answers } =
      this._riddles[this._score % this._riddles.length];

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
