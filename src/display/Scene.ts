import type { ArgumentMap } from 'eventemitter3';
import { Container, type DisplayObjectEvents } from 'pixi.js';

import { SceneEvent } from '../events';

export class Scene extends Container {
  constructor(name: string) {
    super();

    this.name = name;
  }

  public override on(
    event: keyof DisplayObjectEvents | SceneEvent.EVENT,
    fn: (...args: any) => void,
    context?: any
  ): this {
    return super.on(event, fn, context);
  }

  public override emit<T extends keyof DisplayObjectEvents>(
    event: T | SceneEvent.EVENT,
    ...args: ArgumentMap<DisplayObjectEvents>[Extract<
      T,
      keyof DisplayObjectEvents
    >]
  ): boolean {
    return super.emit(event, ...args);
  }

  public onEnter(): void {
    this.eventMode = 'passive';
    this.visible = true;
  }

  public onExit(): void {
    this.eventMode = 'none';
    this.visible = false;
  }
}
