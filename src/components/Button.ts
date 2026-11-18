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

export class InfoButton extends ButtonBase {
  constructor() {
    super(Assets.get('atlas_0').textures.button_info);
  }
}
