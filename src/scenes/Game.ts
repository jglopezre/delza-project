import Phaser from 'phaser';
import { SceneKeys, EnvironmentSceneKeys, RockCockroachColor, RockCockroachAnimationKey } from '../consts';
import Player from '../gameObjects/Player';
import KeyBoardInputs from '../inputs/KeyboardInputs';
import StageMaker from '../stages/StageMaker';
import RockCockroach from '../gameObjects/RockCockroach';

export default class Game extends Phaser.Scene {
  #player!: Player;

  constructor() {
    super(SceneKeys.GAME);
  }

  create(): void {
    KeyBoardInputs.createPlayerInputs(this);

    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height - 32);
    this.physics.world.setBoundsCollision(true, true, true, true);

    const stage = new StageMaker(this, EnvironmentSceneKeys.forest);

    const bounds = stage.getBoundsObjectsList;
    const obstacles = stage.getObstaclesObjectsList;
    const worldTiles = this.physics.add.staticGroup();
    worldTiles.addMultiple(bounds);
    worldTiles.addMultiple(obstacles);

    const enemy = new RockCockroach(this, RockCockroachColor.green, 16 * 5, 16 * 4);
    const enemy2 = new RockCockroach(this, RockCockroachColor.brown, 16 * 15, 16 * 10);
    enemy.play(RockCockroachAnimationKey.greenWalktoDown);
    enemy2.play(RockCockroachAnimationKey.brownWalktoUp);
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
