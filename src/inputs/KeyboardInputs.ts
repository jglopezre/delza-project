import Phaser from 'phaser';
import Player from '../gameObjects/Player';

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
    player: Player,
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined,
  ) {
    if (cursors?.left.isDown) player.walking('left');
    else if (cursors?.right.isDown) player.walking('right');
    else if (cursors?.up.isDown) player.walking('up');
    else if (cursors?.down.isDown) player.walking('down');
    else player.stopping();
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
