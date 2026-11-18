import { Assets, Sprite } from 'pixi.js';
import { CloseButton } from '../components';
import { HEIGHT, WIDTH } from '../constants';
import { Scene } from '../display';
import { SceneEvent } from '../events';

import { SceneName } from './SceneName';

export class InfoScene extends Scene {
  constructor() {
    super(SceneName.INFO);

    const sprite = new Sprite(Assets.get('atlas_0').textures.info);
    sprite.anchor.set(0.5);
    sprite.x = Math.round(WIDTH * 0.5);
    sprite.y = Math.round(HEIGHT * 0.5);
    this.addChild(sprite);

    const closeButton = new CloseButton();
    closeButton.x = WIDTH - closeButton.width;
    closeButton.y = closeButton.height;
    this.addChild(closeButton);

    closeButton.on('pointertap', () =>
      this.emit(SceneEvent.EVENT, SceneName.MAIN)
    );
  }
}
