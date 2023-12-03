import Phaser from 'phaser';
import { DirectionKeys } from '../consts/DirectionKeys';

class KeyBoardInputs {
  static #cursorPressingControl: DirectionKeys = null;

  static #direction: DirectionKeys = null;

  static #cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  static #actions: object | undefined;

  static createPlayerInputs(scene: Phaser.Scene) {
    this.#cursors = scene.input.keyboard?.createCursorKeys();
    this.#actions = scene.input.keyboard?.addKeys({
      attack: Phaser.Input.Keyboard.KeyCodes.A,
      item: Phaser.Input.Keyboard.KeyCodes.S,
    });
  }

  static PlayerMoveOnKeyboardPressing(): DirectionKeys {
    // first key pressin detection
    if (this.#cursors?.left.isDown && this.#cursors.up.isUp && this.#cursors.down.isUp) {
      this.#cursorPressingControl = 'left';
    } else if (this.#cursors?.right.isDown && this.#cursors.up.isUp && this.#cursors.down.isUp) {
      this.#cursorPressingControl = 'right';
    } else if (this.#cursors?.up.isDown && this.#cursors.right.isUp && this.#cursors.left.isUp) {
      this.#cursorPressingControl = 'up';
    } else if (this.#cursors?.down.isDown && this.#cursors.right.isUp && this.#cursors.left.isUp) {
      this.#cursorPressingControl = 'down';
    }

    // up walking direction
    if (this.#cursors?.up.isDown && this.#cursorPressingControl === 'up') {
      if (this.#cursors.left.isDown) {
        this.#direction = 'up-left';
      } else if (this.#cursors.right.isDown) {
        this.#direction = 'up-right';
      } else {
        this.#direction = 'up';
      }
    } else if (this.#cursors?.down.isDown && this.#cursorPressingControl === 'down') {
      if (this.#cursors.left.isDown) {
        this.#direction = 'down-left';
      } else if (this.#cursors.right.isDown) {
        this.#direction = 'down-right';
      } else {
        this.#direction = 'down';
      }
    } else if (this.#cursors?.left.isDown && this.#cursorPressingControl === 'left') {
      if (this.#cursors.up.isDown) {
        this.#direction = 'left-up';
      } else if (this.#cursors.down.isDown) {
        this.#direction = 'left-down';
      } else {
        this.#direction = 'left';
      }
    } else if (this.#cursors?.right.isDown && this.#cursorPressingControl === 'right') {
      if (this.#cursors.up.isDown) {
        this.#direction = 'right-up';
      } else if (this.#cursors.down.isDown) {
        this.#direction = 'right-down';
      } else {
        this.#direction = 'right';
      }
    } else if (
      this.#cursors?.down.isUp
      && this.#cursors.up.isUp
      && this.#cursors.left.isUp
      && this.#cursors.right.isUp
    ) {
      this.#direction = null;
      this.#cursorPressingControl = null;
    }

    return this.#direction;
  }
}

/* this.input.keyboard?.on('keydown', (event) => {
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

this.input.keyboard?.on('keyup', () => {
  this.#player.stoping();
}); */
export default KeyBoardInputs;
