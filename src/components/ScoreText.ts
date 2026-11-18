import { Text } from 'pixi.js';

export class ScoreText extends Text {
  constructor() {
    super('', {
      align: 'center',
      fill: '#ff0000',
      fontSize: 48,
      fontStyle: 'normal',
      fontWeight: '900'
    });

    this.anchor.set(0.5);
  }
}
