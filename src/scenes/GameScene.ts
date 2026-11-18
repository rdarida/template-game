import { Text } from 'pixi.js';

import { MenuButton, PausePanel, TextButton } from '../components';
import { HEIGHT, WIDTH } from '../constants';
import { Scene } from '../display';
import { GameEvent, SceneEvent } from '../events';

import { SceneName } from './SceneName';

export class GameScene extends Scene {
  private _score: number;
  private readonly _scoreText: Text;
  private readonly _text: Text;
  private readonly _buttons: TextButton[];
  private readonly _menuButton: MenuButton;
  private readonly _pausePanel: PausePanel;

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

    this._menuButton = new MenuButton();
    this._menuButton.x = WIDTH - this._menuButton.width;
    this._menuButton.y = this._menuButton.height;
    this.addChild(this._menuButton);

    this._pausePanel = new PausePanel();
    this._pausePanel.x = Math.round(WIDTH * 0.5);
    this._pausePanel.y = Math.round(HEIGHT * 0.5);
    this.addChild(this._pausePanel);

    const boundActionHandler = this.actionHandler.bind(this);

    this._menuButton.on('pointertap', () =>
      this.actionHandler(GameEvent.PAUSE)
    );

    this._pausePanel.on(GameEvent.EVENT, boundActionHandler);
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

        this._menuButton.enable();
        this._pausePanel.disable(true);
        break;

      case GameEvent.ANSWER:
        if (data !== undefined && data === 0) {
          this._score += 1;
          this.actionHandler(GameEvent.PLAY);
          break;
        }

        this.emit(SceneEvent.EVENT, SceneName.MAIN);
        break;

      case GameEvent.PAUSE:
        this._menuButton.disable(true);
        this._pausePanel.enable();
        break;

      case GameEvent.HOME:
        this.emit(SceneEvent.EVENT, SceneName.MAIN);
        break;

      case GameEvent.CONTINUE:
        this._menuButton.enable();
        this._pausePanel.disable(true);
        break;
    }
  }
}
