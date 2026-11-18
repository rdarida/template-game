import { type Texture, Assets, Text } from 'pixi.js';
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

export class SoundToggleButton extends ButtonBase {
  constructor() {
    super(...Assets.get('atlas_0').animations.button_sound);

    this.currentFrame = 0;

    this.on('pointertap', () => {
      switch (this.currentFrame) {
        case 0:
          this.currentFrame = 1;
          sound.muteAll();
          break;
        case 1:
          this.currentFrame = 0;
          sound.unmuteAll();
          break;
      }
    });
  }
}

export class InfoButton extends ButtonBase {
  constructor() {
    super(Assets.get('atlas_0').textures.button_info);
  }
}

export class CloseButton extends ButtonBase {
  constructor() {
    super(Assets.get('atlas_0').textures.button_close);
  }
}

export class MenuButton extends ButtonBase {
  constructor() {
    super(Assets.get('atlas_0').textures.button_menu);
  }
}

export class TextButton extends ButtonBase {
  private readonly _text: Text;

  constructor(value: number | string = '') {
    super(Assets.get('atlas_0').textures.button_bg);

    this._text = new Text(value, { align: 'center', fontSize: 32 });
    this._text.anchor.set(0.5);
    this.addChild(this._text);
  }

  public set value(value: number | string) {
    this._text.text = String(value);
  }
}
