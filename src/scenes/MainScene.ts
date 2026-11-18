import { InfoButton, Logo, PlayButton } from '../components';
import { HEIGHT, WIDTH } from '../constants';
import { Scene } from '../display';
import { SceneEvent } from '../events';

import { SceneName } from './SceneName';

export class MainScene extends Scene {
  constructor() {
    super(SceneName.MAIN);

    const logo = new Logo();
    logo.x = Math.round(WIDTH * 0.5);
    logo.y = Math.round(HEIGHT * 0.5) - 80;
    this.addChild(logo);

    const playButton = new PlayButton();
    playButton.x = Math.round(WIDTH * 0.5);
    playButton.y = Math.round(HEIGHT * 0.5) + 80;
    this.addChild(playButton);

    const infoButton = new InfoButton();
    infoButton.x = WIDTH - infoButton.width;
    infoButton.y = infoButton.height;
    this.addChild(infoButton);

    playButton.on('pointertap', () =>
      this.emit(SceneEvent.EVENT, SceneName.GAME)
    );
  }
}
