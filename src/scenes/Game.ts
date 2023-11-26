import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Player from '../gameObjects/Player';
import KeyBoardInputs from '../inputs/KeyboardInputs';
import Obstacle from '../gameObjects/Obstacle';

export default class Game extends Phaser.Scene {
  #player!: Player;

  #cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super(SceneKeys.GAME);
  }

  create(): void {
    const { cursors } = KeyBoardInputs.createPlayerInputs(this);
    this.#cursors = cursors;

    this.#player = new Player(this, 20, 20);
    this.add.existing(this.#player);

    const threes = [
      new Obstacle(this, 'rock', 184, 134),
      new Obstacle(this, 'tree', 168, 134),
      new Obstacle(this, 'tree', 152, 134),
      new Obstacle(this, 'tree', 136, 134),
      new Obstacle(this, 'tree', 120, 134),
      new Obstacle(this, 'tree', 104, 134),
      new Obstacle(this, 'rock', 184, 150),
      new Obstacle(this, 'tree', 168, 150),
      new Obstacle(this, 'tree', 152, 150),
      new Obstacle(this, 'tree', 136, 150),
      new Obstacle(this, 'knight', 120, 150),
      new Obstacle(this, 'tree', 104, 150),
      new Obstacle(this, 'rock', 184, 166),
      new Obstacle(this, 'tree', 168, 166),
      new Obstacle(this, 'tree', 152, 166),
      new Obstacle(this, 'tree', 136, 166),
      new Obstacle(this, 'tree', 120, 166),
      new Obstacle(this, 'tree', 104, 166),
    ];
    threes.forEach((three) => {
      this.add.existing(three);
    });
  }

  update(_time: number, _deltaTime: number): void {
    const direction = KeyBoardInputs.PlayerMoveOnKeyboardPressing(this.#cursors);
    this.#player.walking(direction);
  }
}
