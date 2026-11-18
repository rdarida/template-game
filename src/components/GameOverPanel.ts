import { Assets, Text } from 'pixi.js';

import { Panel } from '../display';
import { GameEvent } from '../events';

import { HomeButton, PlayAgainButton } from './Button';
import { ScoreText } from './ScoreText';

export class GameOverPanel extends Panel {
  private readonly _scoreText: Text;

  constructor() {
    super(Assets.get('atlas_0').textures.panel_gameover);

    this.anchor.set(0.5);

    this._scoreText = new ScoreText();
    this.addChild(this._scoreText);

    const homeButton = new HomeButton();
    homeButton.x = -homeButton.width;
    homeButton.y = Math.round(this.height * 0.25);
    this.addChild(homeButton);

    const playAgainButton = new PlayAgainButton();
    playAgainButton.x = playAgainButton.width;
    playAgainButton.y = Math.round(this.height * 0.25);
    this.addChild(playAgainButton);

    homeButton.on('pointertap', () =>
      this.emit(GameEvent.EVENT, GameEvent.HOME)
    );

    playAgainButton.on('pointertap', () =>
      this.emit(GameEvent.EVENT, GameEvent.INIT)
    );
  }

  public show(score: number): void {
    this._scoreText.text = `Score: ${score}`;
    this.enable();
  }
}
