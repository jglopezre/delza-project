import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import Player from '../gameObjects/Player';
import KeyBoardInputs from '../inputs/KeyboardInputs';
import EnvironmentScene from '../consts/EnvironmentScene';
import StageMaker from '../stages/StageMaker';

export default class Game extends Phaser.Scene {
  #player!: Player;

  #cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super(SceneKeys.GAME);
  }

  create(): void {
    KeyBoardInputs.createPlayerInputs(this);

    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height - 32);
    this.physics.world.setBoundsCollision(true, true, true, true);

    const stage = new StageMaker(this, EnvironmentScene.desert);

    const bounds = stage.getBoundsObjectsList;
    const obstacles = stage.getObstaclesObjectsList;
    const worldTiles = this.physics.add.staticGroup();
    worldTiles.addMultiple(bounds);
    worldTiles.addMultiple(obstacles);

    console.log(bounds);
    console.log(obstacles);

    this.#player = new Player(this, 100, 100);

    this.physics.add.collider(this.#player, worldTiles);
  }

  // _time: number, _deltaTime: number
  update(): void {
    this.#player.walking(KeyBoardInputs.PlayerMoveOnKeyboardPressing());
  }
}
