import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Player from '../gameObjects/Player';

export default class Game extends Phaser.Scene {
  #player!: Player;

  constructor() {
    super(SceneKeys.GAME);
  }

  create(): void {
    this.input.keyboard?.on('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.#player.walking('up');
          break;
        case 'ArrowDown':
          this.#player.walking('down');
          break;
        case 'ArrowLeft':
          this.#player.walking('left');
          break;
        case 'ArrowRight':
          this.#player.walking('right');
          break;
        default:
          this.#player.stoping();
      }
    });
    this.#player = new Player(this, 20, 20);
    this.add.existing(this.#player);
    this.#player.walking('left');
  }

  update (_time: number, _deltaTime: number): void {
  }
}
