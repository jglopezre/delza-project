import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import DirectionKeys from '../consts/DirectionKeys';

/**
 * Generate a player hero in the scene
 * @class - Player
 */
export default class Player extends Phaser.GameObjects.Container {
  #player!: Phaser.GameObjects.Sprite;

  #playerBody?: Phaser.Physics.Arcade.Body;

  #walkToDirection: DirectionKeys = null;

  readonly #xOriginPosition: number;

  readonly #yOriginPosition: number;

  /**
   * Size in pixels that use player to move over the screen in each frame actualization
   * @type {number}
   */
  #playerVelocity = 65;

  #playerVelocityDiagonal = this.#playerVelocity * 0.7;

  /**
   * @param {Phaser.Scene} scene - Receives an scene where this player will belong
   * @param {number} xPosition - Position in X axis where player will be drawed.
   * @param {number} yPosition - Position in Y axis where player will be drawed.
   */
  constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
    super(scene, xPosition, yPosition);

    this.#xOriginPosition = xPosition;
    this.#yOriginPosition = yPosition;

    this.createPlayerAnimations();
    this.createPlayer();

    this.setSize(this.#player.width, this.#player.height);

    this.#enablePhysicsonPlayer();

    this.scene.add.existing(this);
  }

  get originPosition() {
    return {
      x: this.#xOriginPosition,
      y: this.#yOriginPosition,
    };
  }

  get stepVelocity() {
    return this.#playerVelocity;
  }

  set stepVelocity(value: number) {
    this.#playerVelocity = value;
  }

  #enablePhysicsonPlayer() {
    this.scene.physics.add.existing(this);
    this.#playerBody = this.body as Phaser.Physics.Arcade.Body;
    this.#playerBody.setSize(this.#player.width - 6, this.#player.height - 9);
    this.#playerBody.setOffset(3, 9);
    this.#playerBody.setCollideWorldBounds(true);
  }

  createPlayerAnimations() {
    this.scene.anims.create({
      key: 'walk-to-up',
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: 2,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'walk-to-down',
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'walk-to-left',
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: 4,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'walk-to-right',
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: 6,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  createPlayer() {
    this.#player = this.scene.add.sprite(0, 0, TextureKeys.PLAYER1);
    this.add(this.#player);
  }

  /**
   * Moves player over the screen every frame according to sizeStep member,
   * @param {DirectionKeys} direction - Direction that player have to move, refreshed every frame.
   */
  walking(direction: DirectionKeys) {
    if (direction !== this.#walkToDirection) {
      const regex = {
        up: /^up/,
        down: /^down/,
        left: /^left/,
        right: /^right/,
      };

      if (regex.up.test(direction as string)) {
        this.#player.play('walk-to-up');
      } else if (regex.down.test(direction as string)) {
        this.#player.play('walk-to-down');
      } else if (regex.left.test(direction as string)) {
        this.#player.play('walk-to-left');
      } else if (regex.right.test(direction as string)) {
        this.#player.play('walk-to-right');
      }
      this.#walkToDirection = direction;
    }

    /* if (!this.#walkToDirection) {
      const regex = {
        up: /^up/,
        down: /^down/,
        left: /^left/,
        right: /^right/,
      };

      if (regex.up.test(direction as string)) {
        this.#player.play('walk-to-up');
      } else if (regex.down.test(direction as string)) {
        this.#player.play('walk-to-down');
      } else if (regex.left.test(direction as string)) {
        this.#player.play('walk-to-left');
      } else if (regex.right.test(direction as string)) {
        this.#player.play('walk-to-right');
      }
      this.#isWalking = true;
    } */

    switch (direction) {
      case null:
        this.stopping();
        break;

      case 'up':
        this.#playerBody?.setVelocityX(0);
        this.#playerBody?.setVelocityY(-this.#playerVelocity);
        break;
      case 'up-left':
        this.#playerBody?.setVelocityX(-this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(-this.#playerVelocityDiagonal);
        break;
      case 'up-right':
        this.#playerBody?.setVelocityX(this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(-this.#playerVelocityDiagonal);
        break;

      case 'down':
        this.#playerBody?.setVelocityX(0);
        this.#playerBody?.setVelocityY(this.#playerVelocity);
        break;
      case 'down-left':
        this.#playerBody?.setVelocityX(-this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(this.#playerVelocityDiagonal);
        break;
      case 'down-right':
        this.#playerBody?.setVelocityX(this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(this.#playerVelocityDiagonal);
        break;

      case 'left':
        this.#playerBody?.setVelocityX(-this.#playerVelocity);
        this.#playerBody?.setVelocityY(0);
        break;
      case 'left-up':
        this.#playerBody?.setVelocityX(-this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(-this.#playerVelocityDiagonal);
        break;
      case 'left-down':
        this.#playerBody?.setVelocityX(-this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(this.#playerVelocityDiagonal);
        break;

      case 'right':
        this.#playerBody?.setVelocityX(this.#playerVelocity);
        this.#playerBody?.setVelocityY(0);
        break;
      case 'right-up':
        this.#playerBody?.setVelocityX(this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(-this.#playerVelocityDiagonal);
        break;
      case 'right-down':
        this.#playerBody?.setVelocityX(this.#playerVelocityDiagonal);
        this.#playerBody?.setVelocityY(this.#playerVelocityDiagonal);
        break;

      default:
        throw new Error('Invalid direction');
    }
  }

  stopping() {
    this.#playerBody?.setVelocity(0);
    this.#player.stop();
    /* if (this.#isWalking) {
      this.#playerBody?.setVelocity(0);
      this.#player.stop();
    } */
  }
}
