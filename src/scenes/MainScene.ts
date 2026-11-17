import { Logo, PlayButton } from '../components';
import { HEIGHT, SceneName, WIDTH } from '../constants';
import { Scene } from '../display';
import { SceneEvent } from '../events';

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

    playButton.on('pointertap', () =>
      this.emit(SceneEvent.EVENT, SceneName.GAME)
    );
  }
}
