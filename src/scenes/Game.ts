import Phaser from 'phaser';
import { SceneKeys, PlayerColorKeys } from '../consts';
import Player from '../gameObjects/Player';
import KeyBoardInputs from '../inputs/KeyboardInputs';
import StageMaker from '../stages/StageMaker';
import RockCockroach from '../gameObjects/RockCockroach';
import Spark from '../gameObjects/Spark';
import ProjectileRock from '../gameObjects/ProjectileRock';

export default class Game extends Phaser.Scene {
  private player!: Player;

  private actionEmitter: Phaser.Events.EventEmitter;

  constructor() {
    super(SceneKeys.GAME);
    this.actionEmitter = new Phaser.Events.EventEmitter();
  }

  create(): void {
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height - 32);
    this.physics.world.setBoundsCollision(true, true, true, true);

    const stage = new StageMaker(this);

    const bounds = stage.getBoundsObjectsList;
    const obstacles = stage.getObstaclesObjectsList;
    const worldTiles = this.physics.add.staticGroup();
    worldTiles.addMultiple(bounds);
    worldTiles.addMultiple(obstacles);

    const enemies = stage.getenemiesObjecsList;

    const enemiesGroup = this.physics.add.group();
    enemiesGroup.addMultiple(enemies);

    this.player = new Player(this, 100, 100, PlayerColorKeys.yellow);

    this.physics.add.collider(enemiesGroup, enemiesGroup, (sprite1, sprite2) => {
      const enemy1 = sprite1 as RockCockroach;
      const enemy2 = sprite2 as RockCockroach;
      enemy1.changeDirection();
      enemy2.changeDirection();
    });
    this.physics.add.collider(enemiesGroup, worldTiles, (sprite1) => {
      const enemy = sprite1 as RockCockroach;
      enemy.changeDirection();
    });
    this.physics.add.overlap(this.player, enemiesGroup, () => console.log('enemy and player overlapping'));
    this.physics.add.overlap(this.player.attackSword, enemiesGroup, (sprite1, sprite2) => {
      const enemy = sprite2 as RockCockroach;
      enemy.totalDisable();
    });
    this.physics.add.collider(this.player, worldTiles);

    this.actionEmitter = KeyBoardInputs.createPlayerInputs(this);
    this.actionEmitter.on('action-01', () => this.player.actions('attack'), this.player);
    this.actionEmitter.on('action-02', this.player.actions, this.player);

    const spark = new Spark(this, 16 * 16, 6 * 16);
    setTimeout(() => spark.playAnimation(), 2000);

    const projectile = new ProjectileRock(this, 16 * 14, 16 * 6);
    projectile.playAnimation();
  }

  // _time: number, _deltaTime: number
  update(): void {
    this.player.walking(KeyBoardInputs.PlayerMoveOnKeyboardPressing());
  }
}
