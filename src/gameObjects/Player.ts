import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import DirectionKeys from '../consts/DirectionKeys';

export default class Player extends Phaser.GameObjects.Container {
  #player!: Phaser.GameObjects.Sprite;

  #isWalking = false;

  #xPosition: number;

  #yPosition: number;

  readonly #stepSize = 1;

  constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
    super(scene, xPosition, yPosition);

    this.#xPosition = xPosition;
    this.#yPosition = yPosition;

    this.createPlayerAnimations();
    this.createPlayer();

    /*
    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.#player.width * 0.5, this.#player.height * 0.7);
    body.setOffset(this.#player.width * -0.3, this.#player.height + 15);
     */
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
    this.#player = this.scene.add.sprite(0, 0, TextureKeys.PLAYER1).setOrigin(0.5, 1);
    this.add(this.#player);
  }

  walking(direction: DirectionKeys) {
    if (!this.#isWalking) {
      this.#player.play(`walk-to-${direction}`);
      this.#isWalking = true;
    }

    switch (direction) {
      case 'up':
        this.#yPosition -= this.#stepSize;
        this.y = this.#yPosition;
        break;
      case 'down':
        this.#yPosition += this.#stepSize;
        this.y = this.#yPosition;
        break;
      case 'left':
        this.#xPosition -= this.#stepSize;
        this.x = this.#xPosition;
        break;
      case 'right':
        this.#xPosition += this.#stepSize;
        this.x = this.#xPosition;
        break;
      default:
        throw new Error('Invalid direction');
    }
  }

  stopping() {
    if (this.#isWalking) {
      this.#player.stop();
      this.#isWalking = false;
    }
  }
}
