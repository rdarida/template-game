import { Game } from './Game';

(() => {
  Game.load()
    .then(() => {
      const game = new Game();
      document.body.appendChild(game.view as HTMLCanvasElement);
    })
    .catch((error: unknown) => {
      console.error(error);
    });
})();
