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
            { alias: 'click', src: 'sounds/click.mp3' }
          ]
        }
      ]
    };

    await Assets.init({ manifest, basePath: 'assets' });

    return Assets.loadBundle('default');
  }
}
