import Phaser from 'phaser';
import { DirectionKeys } from '../types';

/**
 * Class that performs keiboard inputs registration in the escene and manages
 * actions of cursors and aktion keys.
 *
 * @class
 */
class KeyBoardInputs {
  /**
   * A signal for controling direction generator path every frame
   *
   * @static
   * @private
   */
  private static cursorPressingControl: DirectionKeys = null;

  /**
   * Holds direction that cursor or player have to move when a key has been pressed.
   *
   * @static
   * @private
   */
  private static direction: DirectionKeys = null;

  /**
   *  Holds keyboard cursor object
   *
   * @static
   * @private
   */
  private static cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  /**
   * Holds keyboard action keys actions object.
   *
   * @static
   * @private
   */
  private static actions: {
    action01: Phaser.Input.Keyboard.Key,
    action02: Phaser.Input.Keyboard.Key
  } | undefined;

  /**
   * Holds an Event Emitter object.
   *
   * @private
   * @static
   */
  private static emitter: Phaser.Events.EventEmitter;

  /**
   * This function instanciates keyboard objects for capturing pressing keys
   *
   * @static
   * @param {Phaser.Scene} scene - Receives a Scene
   */
  static createPlayerInputs(scene: Phaser.Scene) {
    this.emitter = new Phaser.Events.EventEmitter();
    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.actions = scene.input.keyboard?.addKeys({
      action01: Phaser.Input.Keyboard.KeyCodes.A,
      action02: Phaser.Input.Keyboard.KeyCodes.S,
    }) as { action01: Phaser.Input.Keyboard.Key, action02: Phaser.Input.Keyboard.Key };
    this.addingActionKeysResponse();
    return this.emitter;
  }

  /**
   * This functions lsten keyboard pressing for returning a string that indicates which direction
   * has been pressed. This function have to be performed every frame, please use this
   * in "update()" method.
   *
   * @static
   * @returns {string}
   */
  static PlayerMoveOnKeyboardPressing(): DirectionKeys {
    /*
     * This detect which first direction cursor has been pressed to set main character direction and
     * save it in cursorPressingControl, only set value on first frame after press a key
     * to combine with a second cursor direction to build diagonals directions.
     */
    if (this.cursors?.left.isDown && this.cursors.up.isUp && this.cursors.down.isUp) {
      this.cursorPressingControl = 'left';
    } else if (this.cursors?.right.isDown && this.cursors.up.isUp && this.cursors.down.isUp) {
      this.cursorPressingControl = 'right';
    } else if (this.cursors?.up.isDown && this.cursors.right.isUp && this.cursors.left.isUp) {
      this.cursorPressingControl = 'up';
    } else if (this.cursors?.down.isDown && this.cursors.right.isUp && this.cursors.left.isUp) {
      this.cursorPressingControl = 'down';
    }

    // up walking direction
    if (this.cursors?.up.isDown && this.cursorPressingControl === 'up') {
      if (this.cursors.left.isDown) {
        this.direction = 'up-left';
      } else if (this.cursors.right.isDown) {
        this.direction = 'up-right';
      } else {
        this.direction = 'up';
      }
    } else if (this.cursors?.down.isDown && this.cursorPressingControl === 'down') {
      if (this.cursors.left.isDown) {
        this.direction = 'down-left';
      } else if (this.cursors.right.isDown) {
        this.direction = 'down-right';
      } else {
        this.direction = 'down';
      }
    } else if (this.cursors?.left.isDown && this.cursorPressingControl === 'left') {
      if (this.cursors.up.isDown) {
        this.direction = 'left-up';
      } else if (this.cursors.down.isDown) {
        this.direction = 'left-down';
      } else {
        this.direction = 'left';
      }
    } else if (this.cursors?.right.isDown && this.cursorPressingControl === 'right') {
      if (this.cursors.up.isDown) {
        this.direction = 'right-up';
      } else if (this.cursors.down.isDown) {
        this.direction = 'right-down';
      } else {
        this.direction = 'right';
      }
    } else if (
      this.cursors?.down.isUp
      && this.cursors.up.isUp
      && this.cursors.left.isUp
      && this.cursors.right.isUp
    ) {
      this.direction = null;
      this.cursorPressingControl = null;
    }

    return this.direction;
  }

  /**
   * This functions receives a keyboard Event when an action key has been pressed
   * and uses EventEmmiter to send an action event.
   *
   * @static
   */
  static addingActionKeysResponse() {
    this.actions?.action01.on('down', () => this.emitter.emit('action-01', 'use'));
    this.actions?.action02.on('down', () => this.emitter.emit('action-02', 'cancel'));
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
