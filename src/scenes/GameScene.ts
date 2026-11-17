import { PlayButton, TextButton } from '../components';
import { HEIGHT, SceneName, WIDTH } from '../constants';
import { Scene } from '../display';
import { SceneEvent } from '../events';

export class GameScene extends Scene {
  constructor() {
    super(SceneName.GAME);

    [-160, 0, 160].forEach(i => {
      const textButton = new TextButton(1000 + i);
      textButton.x = Math.round(WIDTH * 0.5) + i;
      textButton.y = Math.round(HEIGHT * 0.5) + 100;
      this.addChild(textButton);
    });

    const playButton = new PlayButton();
    playButton.x = Math.round(WIDTH * 0.5);
    playButton.y = Math.round(HEIGHT * 0.5);
    this.addChild(playButton);

    playButton.on('pointertap', () =>
      this.emit(SceneEvent.EVENT, SceneName.MAIN)
    );
  }
}
