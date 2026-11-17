import { Text } from 'pixi.js';

import { PlayButton, TextButton } from '../components';
import { HEIGHT, SceneName, WIDTH } from '../constants';
import { Scene } from '../display';
import { GameEvent, SceneEvent } from '../events';

export class GameScene extends Scene {
  private readonly _text: Text;
  private readonly _buttons: TextButton[];

  constructor() {
    super(SceneName.GAME);

    this._text = new Text('100 + 100 + 100', {
      align: 'center',
      fontSize: 64,
      fontStyle: 'normal',
      fontWeight: '900'
    });

    this._text.anchor.set(0.5);
    this._text.x = Math.round(WIDTH * 0.5);
    this._text.y = Math.round(HEIGHT * 0.5) - 100;
    this.addChild(this._text);

    this._buttons = [-160, 0, 160].map(i => {
      const button = new TextButton();
      button.value = 300 + i;
      button.x = Math.round(WIDTH * 0.5) + i;
      button.y = Math.round(HEIGHT * 0.5) + 100;
      this.addChild(button);
      return button;
    });

    const playButton = new PlayButton();
    playButton.x = Math.round(WIDTH * 0.5);
    playButton.y = Math.round(HEIGHT * 0.5);
    this.addChild(playButton);

    playButton.on('pointertap', () => this.actionHandler(GameEvent.HOME));
  }

  public override onEnter(): void {
    super.onEnter();

    this.actionHandler(GameEvent.PLAY);
  }

  private actionHandler(action: GameEvent): void {
    switch (action) {
      case GameEvent.PLAY:
        this._text.text = '100 + 100 + 100';

        this._buttons.forEach((button, i) => {
          button.value = 300 + i * 160;
        });

        break;

      case GameEvent.HOME:
        this.emit(SceneEvent.EVENT, SceneName.MAIN);
        break;
    }
  }
}
