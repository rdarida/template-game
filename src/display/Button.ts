import { AnimatedSprite, Texture } from 'pixi.js';

export class Button extends AnimatedSprite {
  constructor(...textures: Texture[]) {
    super(textures);

    this.eventMode = 'static';
    this.cursor = 'pointer';
  }

  public disable(hide = false): void {
    this.eventMode = 'none';
    this.visible = !hide;
  }

  public enable(): void {
    this.eventMode = 'static';
    this.visible = true;
  }
}
