import { Application, Assets, type AssetsManifest } from 'pixi.js';

import { HEIGHT, WIDTH } from './constants';

export class Game extends Application {
  constructor() {
    super({
      antialias: true,
      backgroundColor: '#000000',
      width: WIDTH,
      height: HEIGHT
    });
  }

  public static async load(): Promise<void> {
    const manifest: AssetsManifest = {
      bundles: [
        {
          name: 'default',
          assets: []
        }
      ]
    };

    await Assets.init({ manifest, basePath: 'assets' });

    return Assets.loadBundle('default');
  }
}
