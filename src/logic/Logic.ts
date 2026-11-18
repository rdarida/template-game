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
    this._riddle = {
      score: this._score,
      values: [100, 100, 100],
      answers: [300, 400, 500]
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
