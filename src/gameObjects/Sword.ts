import Phaser from 'phaser';
import { SwordColorKeys } from '../consts/SwordKeys';
import { TextureKeys } from '../consts';

class Sword extends Phaser.Physics.Arcade.Sprite {
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
}

export default Sword;
