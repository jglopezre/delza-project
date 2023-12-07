import Phaser from 'phaser';
import {
  TextureKeys, DirectionKeys, PlayerColorKeys, PlayerAnimationKey,
} from '../consts';
import { TextureFrames } from '../types';

/**
 * Generate a player hero in the scene
 * @class - Player
 */
export default class Player extends Phaser.GameObjects.Container {
  #player!: Phaser.GameObjects.Sprite;

  #playerBody!: Phaser.Physics.Arcade.Body;

  #walkToDirection: DirectionKeys = null;

  private playerTextureFrames!: TextureFrames<PlayerAnimationKey>;

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
  constructor(
    scene: Phaser.Scene,
    xPosition: number,
    yPosition: number,
    playerColor?: PlayerColorKeys,
  ) {
    super(scene, xPosition, yPosition);

    this.#xOriginPosition = xPosition;
    this.#yOriginPosition = yPosition;

    this.selectTexturesForAnimation(playerColor ?? PlayerColorKeys.blue);

    this.#createPlayerAnimations();
    this.#createPlayer();

    this.setSize(this.#player.width, this.#player.height); // this set container Size
    // this.createContainerBounds();

    this.#enablePhysicsonPlayer();

    this.#player.play(this.playerTextureFrames.down.key);
    this.#player.stop();

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

  #createPlayer() {
    this.#player = this.scene.add.sprite(0, 0, TextureKeys.PLAYER1);
    // this.#player.setOrigin(0);
    this.add(this.#player);
  }

  #enablePhysicsonPlayer() {
    this.scene.physics.add.existing(this);
    this.#playerBody = this.body as Phaser.Physics.Arcade.Body;
    this.#playerBody.setSize(this.#player.width - 6, this.#player.height - 9);
    this.#playerBody.setOffset(3, 7);
    this.#playerBody.setCollideWorldBounds(true);
  }

  #createPlayerAnimations() {
    this.scene.anims.create({
      key: this.playerTextureFrames.up.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: this.playerTextureFrames.up.start,
        end: this.playerTextureFrames.up.end,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.playerTextureFrames.down.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: this.playerTextureFrames.down.start,
        end: this.playerTextureFrames.down.end,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.playerTextureFrames.left.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: this.playerTextureFrames.left.start,
        end: this.playerTextureFrames.left.end,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.playerTextureFrames.right.key,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PLAYER1, {
        start: this.playerTextureFrames.right.start,
        end: this.playerTextureFrames.right.end,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  private selectTexturesForAnimation(color: PlayerColorKeys) {
    switch (color) {
      case PlayerColorKeys.yellow:
        this.playerTextureFrames = {
          down: { key: PlayerAnimationKey.yellowWalkToDown, start: 0, end: 1 },
          up: { key: PlayerAnimationKey.yellowWalkToUp, start: 2, end: 3 },
          left: { key: PlayerAnimationKey.yellowWalkToLeft, start: 4, end: 5 },
          right: { key: PlayerAnimationKey.yellowWalkToRight, start: 6, end: 7 },
        };
        break;

      case PlayerColorKeys.blue:
        this.playerTextureFrames = {
          down: { key: PlayerAnimationKey.blueWalkToDown, start: 22, end: 23 },
          up: { key: PlayerAnimationKey.blueWalkToUp, start: 24, end: 25 },
          left: { key: PlayerAnimationKey.blueWalkToLeft, start: 26, end: 27 },
          right: { key: PlayerAnimationKey.blueWalkToRight, start: 28, end: 29 },
        };
        break;

      case PlayerColorKeys.red:
        this.playerTextureFrames = {
          down: { key: PlayerAnimationKey.redWalkToDown, start: 44, end: 45 },
          up: { key: PlayerAnimationKey.redWalkToUp, start: 46, end: 47 },
          left: { key: PlayerAnimationKey.redWalkToLeft, start: 48, end: 49 },
          right: { key: PlayerAnimationKey.redWalkToRight, start: 50, end: 51 },
        };
        break;

      default:
        throw new Error('Color for Rock Cockroach is not valid. Class: RockCockroach. Method: selectTextureFrames');
    }
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

      // This captures main direction of the player for to reproduces correct animation
      if (regex.up.test(direction as string)) this.#player.play(this.playerTextureFrames.up.key);
      else if (regex.down.test(direction as string)) this.#player.play(this.playerTextureFrames.down.key);
      else if (regex.left.test(direction as string)) this.#player.play(this.playerTextureFrames.left.key);
      else if (regex.right.test(direction as string)) this.#player.play(this.playerTextureFrames.right.key);
      this.#walkToDirection = direction;
    }

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
  }

  // For debug only
  private createContainerBounds() {
    const rectangle = this.scene.add.graphics();
    const containerBounds = this.getBounds();

    rectangle.lineStyle(1, 0x00ffff);
    rectangle.strokeRect(
      0,
      0,
      containerBounds.width,
      containerBounds.height,
    );
    this.add(rectangle);
  }
}
