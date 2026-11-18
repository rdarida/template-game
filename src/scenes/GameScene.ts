import { Graphics } from 'pixi.js';

import { Board, GameOverPanel, MenuButton, PausePanel } from '../components';
import { HEIGHT, WIDTH } from '../constants';
import { Scene } from '../display';
import { GameEvent, SceneEvent } from '../events';
import { Logic } from '../logic';

import { SceneName } from './SceneName';

export class GameScene extends Scene {
  private readonly _logic: Logic;
  private readonly _menuButton: MenuButton;
  private readonly _board: Board;
  private readonly _shade: Graphics;
  private readonly _gameOverPanel: GameOverPanel;
  private readonly _pausePanel: PausePanel;

  constructor() {
    super(SceneName.GAME);

    this._logic = new Logic();

    this._menuButton = new MenuButton();
    this._menuButton.x = WIDTH - this._menuButton.width;
    this._menuButton.y = this._menuButton.height;
    this.addChild(this._menuButton);

    this._board = new Board();
    this._board.x = Math.round(WIDTH * 0.5);
    this._board.y = Math.round(HEIGHT * 0.5);
    this.addChild(this._board);

    this._shade = new Graphics();
    this._shade.beginFill(0x000000, 0.75);
    this._shade.drawRect(0, 0, WIDTH, HEIGHT);
    this._shade.endFill();
    this.addChild(this._shade);

    this._gameOverPanel = new GameOverPanel();
    this._gameOverPanel.x = Math.round(WIDTH * 0.5);
    this._gameOverPanel.y = Math.round(HEIGHT * 0.5);
    this.addChild(this._gameOverPanel);

    this._pausePanel = new PausePanel();
    this._pausePanel.x = Math.round(WIDTH * 0.5);
    this._pausePanel.y = Math.round(HEIGHT * 0.5);
    this.addChild(this._pausePanel);

    const boundActionHandler = this.actionHandler.bind(this);

    this._menuButton.on('pointertap', () =>
      this.actionHandler(GameEvent.PAUSE)
    );

    this._board.on(GameEvent.EVENT, boundActionHandler);
    this._gameOverPanel.on(GameEvent.EVENT, boundActionHandler);
    this._pausePanel.on(GameEvent.EVENT, boundActionHandler);
  }

  public override onEnter(): void {
    super.onEnter();

    this.actionHandler(GameEvent.INIT);
  }

  private actionHandler<T>(action: GameEvent, data?: T): void {
    switch (action) {
      case GameEvent.INIT:
        this._logic.init();

      case GameEvent.PLAY:
        this._menuButton.enable();
        this._board.init(this._logic.getRiddle());
        this._shade.visible = false;
        this._gameOverPanel.disable(true);
        this._pausePanel.disable(true);
        break;

      case GameEvent.ANSWER:
        if (data !== undefined && this._logic.evaluateAnswer(Number(data))) {
          this.actionHandler(GameEvent.PLAY);
          break;
        }

        this._menuButton.disable(true);
        this._board.disable();
        this._shade.visible = true;
        this._gameOverPanel.show(this._logic.getScore());
        break;

      case GameEvent.PAUSE:
        this._menuButton.disable(true);
        this._board.disable();
        this._shade.visible = true;
        this._pausePanel.enable();
        break;

      case GameEvent.HOME:
        this.emit(SceneEvent.EVENT, SceneName.MAIN);
        break;

      case GameEvent.CONTINUE:
        this._menuButton.enable();
        this._board.enable();
        this._shade.visible = false;
        this._pausePanel.disable(true);
        break;
    }
  }
}
