import Phaser from 'phaser';
import Player from '../gameObjects/Player';
import DirectionKeys from '../consts/DirectionKeys';

class KeyBoardInputs {
  static createPlayerInputs(scene: Phaser.Scene) {
    const cursors = scene.input.keyboard?.createCursorKeys();
    const actions = scene.input.keyboard?.addKeys({
      attack: Phaser.Input.Keyboard.KeyCodes.A,
      item: Phaser.Input.Keyboard.KeyCodes.S,
    });
    return { cursors, actions };
  }

  static PlayerMoveOnKeyboardPressing(
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined,
  ): DirectionKeys {
    let direction: DirectionKeys = null;
    let cursorPressingControl: DirectionKeys = null;
    let isFirstDetection = false;
    // first key pressin detection

    if (!isFirstDetection) {
      if (cursors?.left.isDown) {
        cursorPressingControl = 'left';
        isFirstDetection = true;
      } else if (cursors?.right.isDown) {
        cursorPressingControl = 'right';
        isFirstDetection = true;
      } else if (cursors?.up.isDown) {
        cursorPressingControl = 'up';
        isFirstDetection = true;
      } else if (cursors?.down.isDown) {
        cursorPressingControl = 'down';
        isFirstDetection = true;
      }
    }

    // up walking direction
    if (cursors?.up.isDown && cursorPressingControl === 'up') {
      if (cursors.left.isDown) {
        direction = 'up-left';
      } else if (cursors.right.isDown) {
        direction = 'up-right';
      } else {
        direction = 'up';
      }
    } else if (cursors?.down.isDown && cursorPressingControl === 'down') {
      if (cursors.left.isDown) {
        direction = 'down-left';
      } else if (cursors.right.isDown) {
        direction = 'down-right';
      } else {
        direction = 'down';
      }
    } else if (cursors?.left.isDown && cursorPressingControl === 'left') {
      if (cursors.up.isDown) {
        direction = 'left-up';
      } else if (cursors.down.isDown) {
        direction = 'left-down';
      } else {
        direction = 'left';
      }
    } else if (cursors?.right.isDown && cursorPressingControl === 'right') {
      if (cursors.up.isDown) {
        direction = 'right-up';
      } else if (cursors.down.isDown) {
        direction = 'right-down';
      } else {
        direction = 'right';
      }
    } else if (cursors?.down.isUp && cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
      direction = null;
      cursorPressingControl = null;
      isFirstDetection = false;
    }

    /* if (cursors?.left.isDown) player.walking('left');
    else if (cursors?.right.isDown) player.walking('right');
    else if (cursors?.up.isDown) player.walking('up');
    else if (cursors?.down.isDown) player.walking('down');
    else player.stopping(); */
    return direction;
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
