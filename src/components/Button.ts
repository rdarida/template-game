import { Assets, type Texture } from 'pixi.js';
import { sound } from '@pixi/sound';

import { Button } from '../display';

class ButtonBase extends Button {
  constructor(...textures: Texture[]) {
    super(...textures);

    this.anchor.set(0.5);

    this.on('pointertap', () => sound.play('click'));
  }
}

export class PlayButton extends ButtonBase {
  constructor() {
    super(Assets.get('atlas_0').textures.button_play);
  }
}
