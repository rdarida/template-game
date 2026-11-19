import { Application, Assets, type AssetsManifest } from 'pixi.js';

import { SoundToggleButton } from './components';
import { HEIGHT, WIDTH } from './constants';
import { SceneManager } from './display';
import { GameScene, InfoScene, MainScene } from './scenes';

export class Game extends Application {
  private readonly _sceneManager: SceneManager;

  constructor() {
    super({
      antialias: true,
      backgroundColor: '#cccccc',
      width: WIDTH,
      height: HEIGHT
    });

    this._sceneManager = new SceneManager(this.stage);
    this._sceneManager.addScene(new MainScene());
    this._sceneManager.addScene(new InfoScene());
    this._sceneManager.addScene(new GameScene());

    const soundButton = new SoundToggleButton();
    soundButton.x = soundButton.width;
    soundButton.y = soundButton.height;
    this.stage.addChild(soundButton);
  }

  public static async load(): Promise<void> {
    const manifest: AssetsManifest = {
      bundles: [
        {
          name: 'default',
          assets: [
            {
              alias: 'atlas_0',
              src: 'atlas_0.json',
              data: { tags: { tps: true } }
            },
            {
              alias: 'Roboto Condensed Black',
              src: 'RobotoCondensed-Black.woff2'
            },
            { alias: 'click', src: 'sounds/click.mp3' },
            { alias: 'data', src: 'data.json' }
          ]
        }
      ]
    };

    await Assets.init({ manifest, basePath: 'assets' });

    return Assets.loadBundle('default');
  }
}
