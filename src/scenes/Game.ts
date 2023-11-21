import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Player from '../gameObjects/Player';
import KeyBoardInputs from '../inputs/KeyboardInputs';

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
  }

  update (_time: number, _deltaTime: number): void {
    KeyBoardInputs.PlayerMoveOnKeyboardPressing(this.#player, this.#cursors);
  }
}
