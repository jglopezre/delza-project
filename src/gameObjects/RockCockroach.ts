import Phaser from 'phaser';
import {
  DirectionKeys, RockCockroachAnimationKey, RockCockroachColor, TextureKeys,
} from '../consts';
import AutoMovement from '../inputs/AutoMovement';
import { TextureFrames } from '../types';

/**
 * A Rock-Cockroach object for make enemies with automatic movement and Arcade Physics enabled
 *
 * @class
 */
class RockCockroach extends Phaser.Physics.Arcade.Sprite {
  /**
   * Holds id for this Game Object.
   *
   * @private
   * @readonly
   */
  private readonly spriteId: string;

  /**
   * Holds animation framerate value.
   *
   * @private
   * @readonly
   */

  private readonly animationFrameRate:number = 8;

  /**
   * Holds an object with information about frames, and animation key selected by color.
   *
   * @private
   */
  private spriteTextureFrames!: TextureFrames<RockCockroachAnimationKey>;

  /**
   * Holds Automovement class instantation object.
   *
   * @private
   */
  private autoMovement: AutoMovement;

  /**
   * Holds sprite body object.
   *
   * @private
   */
  private spriteBody!: Phaser.Physics.Arcade.Body;

  /**
   * Holds velocity value for make sprite body movement.
   *
   * @private
   */
  private spriteVelocity: number = 30;

  private addAutomovement: boolean;

  /**
   * Class construtor
   *
   * @constructor
   * @param {Phaser.Scene} scene - Receives a Scene Object
   * @param {RockCockroachColor} color - Receives color key for make RockCocroach of selected color.
   * @param {number} xPosition - Position of sprite origin in X axis.
   * @param {number} yPosition - Position of sprite origin in Y axis.
   * @param {boolean} addAutoMovement - Enables o disables automovement use.
   */
  constructor(
    scene: Phaser.Scene,
    color: RockCockroachColor,
    xPosition: number,
    yPosition: number,
    addAutoMovement?: boolean,
  ) {
    super(scene, xPosition, yPosition, TextureKeys.ROCK_COCKROACH);

    this.setOrigin(0);

    this.addAutomovement = addAutoMovement ?? true;

    /** Generates an id adding a key + color + uuid. */
    this.spriteId = `rock-cockroach-${color}-${Phaser.Math.RND.uuid()}`;

    this.#selectTexturesForAnimation(color);

    this.#createAnimations();

    this.play(this.spriteTextureFrames.down.key);
    this.stop();

    this.enablePhysics();

    this.autoMovement = new AutoMovement(this.scene, this.spriteId);

    this.autoMovement?.eventEmitter.on(this.spriteId, this.walkTo, this);

    this.stop();

    this.scene.add.existing(this);
  }

  get spriteObjectId() {
    return this.spriteId;
  }

  get changeDirection() {
    return this.autoMovement.changeDirection.bind(this.autoMovement);
  }

  get objectVelocity() {
    return this.spriteVelocity;
  }

  set objectVelocity(value: number) {
    this.spriteVelocity = value;
  }

  /**
   * Creates animation using spriteTextureFrames object data
   */
  #createAnimations() {
    this.scene.anims.create({
      key: this.spriteTextureFrames.down.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames.down.start,
        end: this.spriteTextureFrames.down.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames.up.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames.up.start,
        end: this.spriteTextureFrames.up.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames.left.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames.left.start,
        end: this.spriteTextureFrames.left.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });

    this.scene.anims.create({
      key: this.spriteTextureFrames.right.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.ROCK_COCKROACH, {
        start: this.spriteTextureFrames.right.start,
        end: this.spriteTextureFrames.right.end,
      }),
      frameRate: this.animationFrameRate,
      repeat: -1,

    });
  }

  /**
   * Makes a spriteTextureFrames object based on key color passed on param and selecting frames
   * from spritesheet.
   *
   * @param {RockCockroachColor} color - A key with color that had been selected
   */
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

  /**
   * Enables sprite physics in this Object
   *
   * @private
   */
  private enablePhysics() {
    this.scene.physics.add.existing(this);
    this.spriteBody = this.body as Phaser.Physics.Arcade.Body;
    this.spriteBody.setSize(this.width - 6, this.height - 6);
    this.spriteBody.setOffset(3, 3);
    this.spriteBody.setCollideWorldBounds(true);
  }

  /**
   * Sets body velocity in X and/or Y axis depending on direction received
   *
   * @param {DirectionKeys} direction - A key direction that defines direction of walfing.
   */
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
