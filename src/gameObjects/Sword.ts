import Phaser from 'phaser';
import { SwordColorKeys } from '../consts/SwordKeys';
import { TextureKeys } from '../consts';
import { DirectionKeys } from '../types';

class Sword extends Phaser.Physics.Arcade.Sprite {
  private swordBody!: Phaser.Physics.Arcade.Body;

  constructor(
    scene: Phaser.Scene,
    swordColor: SwordColorKeys,
    xPosition: number,
    yPosition: number,
  ) {
    super(scene, xPosition, yPosition, TextureKeys.SWORD);

    this.setName(`sword-${swordColor}-${Phaser.Math.RND.uuid}`);

    this.setSwordTexture(swordColor);

    this.createSwordAnimation();

    this.scene.add.existing(this);

    this.createSwordBody();
  }

  private setSwordTexture(color: SwordColorKeys) {
    switch (color) {
      case SwordColorKeys.normal:
        this.setFrame(0);
        break;

      case SwordColorKeys.super:
        this.setFrame(1);
        break;

      case SwordColorKeys.magical:
        this.setFrame(2);
        break;

      default:
        throw new Error('Invalid Sword color. [class: Sword, method: setSwordTexture]');
    }
  }

  private createSwordAnimation() {
    this.scene.anims.create({
      key: 'sword-brilliant-animation',
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.SWORD, {
        start: 0,
        end: 3,
      }),
      frameRate: 30,
      repeat: -1,
      yoyo: true,
    });
  }

  private createSwordBody() {
    this.scene.physics.add.existing(this);
    this.swordBody = this.body as Phaser.Physics.Arcade.Body;
    this.swordBody.setAllowRotation();
  }

  rotateSword(angle: DirectionKeys) {
    const size = { width: 3, height: 11 };
    switch (angle) {
      case 'down':
        this.setRotation(Phaser.Math.DegToRad(180));
        this.flipY = false;
        this.swordBody.setSize(size.width, size.height);
        this.swordBody.setOffset(7, 5);
        break;

      case 'up':
        this.setRotation(Phaser.Math.DegToRad(0));
        this.flipY = false;
        this.swordBody.setSize(size.width, size.height);
        this.swordBody.setOffset(7, 0);
        break;

      case 'left':
        this.setRotation(Phaser.Math.DegToRad(270));
        this.flipY = false;
        this.swordBody.setSize(size.height, size.width);
        this.swordBody.setOffset(0, 7);
        break;

      case 'right':
        this.setRotation(Phaser.Math.DegToRad(270));
        this.flipY = true;
        this.swordBody.setSize(size.height, size.width);
        this.swordBody.setOffset(5, 7);
        break;
      default:
        throw new Error('Invalid angle to rotate sword. [Class: Sword, Method: rotateSword]');
    }
  }
}

export default Sword;
