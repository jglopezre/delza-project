import Phaser from 'phaser';
import { TextureKeys } from '../consts';

const sparkAnimation = 'spark-bright';
class Spark extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
    super(scene, xPosition, yPosition, TextureKeys.SPARK);

    this.setVisible(false);

    this.createAnimations();

    this.scene.add.existing(this);
  }

  private createAnimations() {
    this.scene.anims.create({
      key: sparkAnimation,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.SPARK, {
        start: 0,
        end: 3,
      }),
      frameRate: 20,
      repeat: 1,
    });
  }

  playAnimation() {
    this.setVisible(true);
    const sparkAnim = this.play(sparkAnimation);
    sparkAnim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
      this.setVisible(false);
    });
  }
}

export default Spark;
