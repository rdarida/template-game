import { Text } from 'pixi.js';

import { ScoreText, TextButton } from '../components';
import { Panel } from '../display';
import { GameEvent } from '../events';

export class Board extends Panel {
  private readonly _scoreText: Text;
  private readonly _riddleText: Text;
  private readonly _buttons: TextButton[];

  constructor() {
    super();

    this.anchor.set(0.5);

    this._scoreText = new ScoreText();
    this._scoreText.y = -160;
    this.addChild(this._scoreText);

    this._riddleText = new Text('100 + 100 + 100', {
      align: 'center',
      fontSize: 64,
      fontStyle: 'normal',
      fontWeight: '900'
    });

    this._riddleText.anchor.set(0.5);
    this.addChild(this._riddleText);

    this._buttons = [-160, 0, 160].map((offset, i) => {
      const button = new TextButton();
      button.x = offset;
      button.y = 160;
      button.on('pointertap', () =>
        this.emit(GameEvent.EVENT, GameEvent.ANSWER, i)
      );
      this.addChild(button);
      return button;
    });
  }

  public init(score: number): void {
    this._scoreText.text = `Score: ${score}`;
    this._riddleText.text = '100 + 100 + 100';

    this._buttons.forEach((button, i) => {
      button.value = 300 + i * Math.round(Math.random() * 160 + 16);
    });

    this.enable();
  }
}
