import Phaser from 'phaser';
import {
  DirectionKeys, RockCockroachAnimationKey, RockCockroachColor, TextureKeys,
} from '../consts';
import AutoMovement from '../inputs/AutoMovement';

type TextureFrames = {
  up: { key: RockCockroachAnimationKey, start: number, end: number, },
  down: { key: RockCockroachAnimationKey, start: number, end: number, },
  left: { key: RockCockroachAnimationKey, start: number, end: number, },
  right: { key: RockCockroachAnimationKey, start: number, end: number, },
};

class RockCockroach extends Phaser.Physics.Arcade.Sprite {
  readonly spriteId: string;

  readonly animationFrameRate:number = 8;

  spriteTextureFrames!: TextureFrames;

  autoMovement?: AutoMovement;

  spriteBody!: Phaser.Physics.Arcade.Body;

  spriteVelocity: number = 30;

  // #eventEmitterReceptor: Phaser.Events.EventEmitter;

  constructor(
    scene: Phaser.Scene,
    color: RockCockroachColor,
    xPosition: number,
    yPosition: number,
    addAutoMovement?: boolean,
  ) {
    super(scene, xPosition, yPosition, TextureKeys.ROCK_COCKROACH);

    this.setOrigin(0);

    this.spriteId = `rock-cockroach-${color}-${Phaser.Math.RND.uuid()}`;

    // this.#eventEmitterReceptor = new Phaser.Events.EventEmitter();
    this.#selectTexturesForAnimation(color);

    this.#createAnimations();

    this.#enablePhysics();

    if (addAutoMovement ?? true) {
      this.autoMovement = new AutoMovement(this.scene, this.spriteId);
    }
    this.autoMovement?.eventEmitter.on(this.spriteId, this.walkTo, this);

    this.stop();

    this.scene.add.existing(this);
  }

  /* get spriteId() {
    return this.#spriteId;
  } */

  get objectVelocity() {
    return this.spriteVelocity;
  }

  set objectVelocity(value: number) {
    this.spriteVelocity = value;
  }

  #createAnimations() {
    this.scene.anims.create({
      key: this.spriteTextureFrames?.down.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames?.down.start,
        end: this.spriteTextureFrames?.down.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames?.up.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames?.up.start,
        end: this.spriteTextureFrames?.up.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames?.left.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames?.left.start,
        end: this.spriteTextureFrames?.left.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames?.right.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames?.right.start,
        end: this.spriteTextureFrames?.right.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });
  }

  #selectTexturesForAnimation(color: RockCockroachColor): void {
    switch (color) {
      case RockCockroachColor.red:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.redWalktoDown, start: 0, end: 1 },
          up: { key: RockCockroachAnimationKey.redWalktoUp, start: 2, end: 3 },
          left: { key: RockCockroachAnimationKey.redWalktoLeft, start: 4, end: 5 },
          right: { key: RockCockroachAnimationKey.redWalktoRight, start: 6, end: 7 },
        };
        break;

      case RockCockroachColor.blue:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.blueWalktoDown, start: 8, end: 9 },
          up: { key: RockCockroachAnimationKey.blueWalktoUp, start: 10, end: 11 },
          left: { key: RockCockroachAnimationKey.blueWalktoLeft, start: 12, end: 13 },
          right: { key: RockCockroachAnimationKey.blueWalktoRight, start: 14, end: 15 },
        };
        break;

      case RockCockroachColor.brown:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.brownWalktoDown, start: 16, end: 17 },
          up: { key: RockCockroachAnimationKey.brownWalktoUp, start: 18, end: 19 },
          left: { key: RockCockroachAnimationKey.brownWalktoLeft, start: 20, end: 21 },
          right: { key: RockCockroachAnimationKey.brownWalktoRight, start: 22, end: 23 },
        };
        break;

      case RockCockroachColor.green:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.greenWalktoDown, start: 24, end: 25 },
          up: { key: RockCockroachAnimationKey.greenWalktoUp, start: 26, end: 27 },
          left: { key: RockCockroachAnimationKey.greenWalktoLeft, start: 28, end: 29 },
          right: { key: RockCockroachAnimationKey.greenWalktoRight, start: 30, end: 31 },
        };
        break;

      case RockCockroachColor.gray:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.grayWalktoDown, start: 32, end: 33 },
          up: { key: RockCockroachAnimationKey.grayWalktoUp, start: 34, end: 35 },
          left: { key: RockCockroachAnimationKey.grayWalktoLeft, start: 36, end: 37 },
          right: { key: RockCockroachAnimationKey.grayWalktoRight, start: 38, end: 39 },
        };
        break;

      case RockCockroachColor.black:
        this.spriteTextureFrames = {
          down: { key: RockCockroachAnimationKey.blackWalktoDown, start: 40, end: 41 },
          up: { key: RockCockroachAnimationKey.blackWalktoUp, start: 42, end: 43 },
          left: { key: RockCockroachAnimationKey.blackWalktoLeft, start: 44, end: 45 },
          right: { key: RockCockroachAnimationKey.blackWalktoRight, start: 46, end: 47 },
        };
        break;

      default:
        throw new Error('Color for Rock Cockroach is not valid. Class: RockCockroach. Method: selectTextureFrames');
    }
  }

  #enablePhysics() {
    this.scene.physics.add.existing(this);
    this.spriteBody = this.body as Phaser.Physics.Arcade.Body;
    this.spriteBody.setSize(this.width - 6, this.height - 6);
    this.spriteBody.setOffset(3, 3);
    this.spriteBody.setCollideWorldBounds(true);
  }

  walkTo(direction: DirectionKeys) {
    switch (direction) {
      case null:
        this.stop();
        this.spriteBody.setVelocityX(0);
        this.spriteBody.setVelocityY(0);
        break;

      case 'down':
        this.play(this.spriteTextureFrames.down.key);
        this.spriteBody.setVelocityX(0);
        this.spriteBody.setVelocityY(this.spriteVelocity);
        break;

      case 'up':
        this.play(this.spriteTextureFrames.up.key);
        this.spriteBody.setVelocityX(0);
        this.spriteBody.setVelocityY(-this.spriteVelocity);
        break;

      case 'left':
        this.play(this.spriteTextureFrames.left.key);
        this.spriteBody.setVelocityX(-this.spriteVelocity);
        this.spriteBody.setVelocityY(0);
        break;

      case 'right':
        this.play(this.spriteTextureFrames.right.key);
        this.spriteBody.setVelocityX(this.spriteVelocity);
        this.spriteBody.setVelocityY(0);
        break;

      default:
        throw new Error('Direction is not valid. [Class: RockCockroach, Method: walkTo]');
    }
  }
}

export default RockCockroach;
