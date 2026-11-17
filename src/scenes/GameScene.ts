import { PlayButton } from '../components';
import { HEIGHT, SceneName, WIDTH } from '../constants';
import { Scene } from '../display';
import { SceneEvent } from '../events';

export class GameScene extends Scene {
  constructor() {
    super(SceneName.GAME);

    const playButton = new PlayButton();
    playButton.x = Math.round(WIDTH * 0.5);
    playButton.y = Math.round(HEIGHT * 0.5) + 80;
    this.addChild(playButton);

    playButton.on('pointertap', () =>
      this.emit(SceneEvent.EVENT, SceneName.MAIN)
    );
  }
}
