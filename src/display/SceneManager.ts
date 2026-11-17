import type { Container } from 'pixi.js';

import { SceneEvent } from '../events';
import type { Scene } from './Scene';

export class SceneManager {
  private readonly _stage: Container;
  private readonly _scenes: Map<string, Scene>;
  private _current?: Scene;

  constructor(stage: Container) {
    this._stage = stage;
    this._scenes = new Map<string, Scene>();
  }

  public addScene(scene: Scene): void {
    this._stage.addChild(scene);
    this._scenes.set(scene.name!, scene);

    scene.on(SceneEvent.EVENT, sceneName => this.setScene(sceneName));

    if (!this._current) {
      this.setScene(scene.name!);
      return;
    }

    scene.visible = false;
  }

  public setScene(name: string): void {
    this._current?.onExit();

    this._current = this._scenes.get(name);

    if (!this._current) {
      throw new Error(`Scene with name "${name}" does not exist.`);
    }

    this._current.onEnter();
  }
}
