import { Text } from 'pixi.js';

import { TextButton } from '../components';
import { HEIGHT, WIDTH } from '../constants';
import { Scene } from '../display';
import { GameEvent, SceneEvent } from '../events';

import { SceneName } from './SceneName';

export class GameScene extends Scene {
  private _score: number;
  private readonly _scoreText: Text;
  private readonly _text: Text;
  private readonly _buttons: TextButton[];

  constructor() {
    super(SceneName.GAME);

    this._score = 0;

    this._scoreText = new Text('', {
      align: 'center',
      fill: '#ff0000',
      fontSize: 48,
      fontStyle: 'normal',
      fontWeight: '900'
    });

    this._scoreText.anchor.set(0.5);
    this._scoreText.x = Math.round(WIDTH * 0.5);
    this._scoreText.y = Math.round(HEIGHT * 0.5) - 160;
    this.addChild(this._scoreText);

    this._text = new Text('100 + 100 + 100', {
      align: 'center',
      fontSize: 64,
      fontStyle: 'normal',
      fontWeight: '900'
    });

    this._text.anchor.set(0.5);
    this._text.x = Math.round(WIDTH * 0.5);
    this._text.y = Math.round(HEIGHT * 0.5);
    this.addChild(this._text);

    this._buttons = [-160, 0, 160].map((offset, i) => {
      const button = new TextButton();
      button.x = Math.round(WIDTH * 0.5) + offset;
      button.y = Math.round(HEIGHT * 0.5) + 160;
      button.on('pointertap', () => this.actionHandler(GameEvent.ANSWER, i));
      this.addChild(button);
      return button;
    });
  }

  public override onEnter(): void {
    super.onEnter();

    this.actionHandler(GameEvent.INIT);
  }

  private actionHandler<T>(action: GameEvent, data?: T): void {
    switch (action) {
      case GameEvent.INIT:
        this._score = 0;

      case GameEvent.PLAY:
        this._scoreText.text = `Score: ${this._score}`;

        this._text.text = '100 + 100 + 100';

        this._buttons.forEach((button, i) => {
          button.value = 300 + i * Math.round(Math.random() * 160 + 16);
        });

        break;

      case GameEvent.ANSWER:
        if (data !== undefined && data === 0) {
          this._score += 1;
          this.actionHandler(GameEvent.PLAY);
          break;
        }

        this.emit(SceneEvent.EVENT, SceneName.MAIN);

        break;

      case GameEvent.HOME:
        this.emit(SceneEvent.EVENT, SceneName.MAIN);
        break;
    }
  }
}
