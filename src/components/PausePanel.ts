import { Assets } from 'pixi.js';

import { Panel } from '../display';
import { GameEvent } from '../events';

import { ContinueButton, HomeButton } from './Button';

export class PausePanel extends Panel {
  constructor() {
    super(Assets.get('atlas_0').textures.pause);

    this.anchor.set(0.5);

    const homeButton = new HomeButton();
    homeButton.x = -homeButton.width;
    homeButton.y = Math.round(this.height * 0.25);
    this.addChild(homeButton);

    const continueButton = new ContinueButton();
    continueButton.x = continueButton.width;
    continueButton.y = Math.round(this.height * 0.25);
    this.addChild(continueButton);

    homeButton.on('pointertap', () =>
      this.emit(GameEvent.EVENT, GameEvent.HOME)
    );

    continueButton.on('pointertap', () =>
      this.emit(GameEvent.EVENT, GameEvent.CONTINUE)
    );
  }
}
