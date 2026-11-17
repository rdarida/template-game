import { Assets, Sprite } from 'pixi.js';

export class Logo extends Sprite {
  constructor() {
    super(Assets.get('atlas_0').textures.logo);

    this.anchor.set(0.5);
  }
}
