import { Sprite, Texture } from 'pixi.js';

export class Panel extends Sprite {
  constructor(texture?: Texture) {
    super(texture);

    this.eventMode = 'passive';
  }

  public disable(hide = false): void {
    this.eventMode = 'none';
    this.visible = !hide;
  }

  public enable(): void {
    this.eventMode = 'passive';
    this.visible = true;
  }
}
