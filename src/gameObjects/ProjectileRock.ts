import Phaser from 'phaser';
import { TextureKeys } from '../consts';

const projectileAnimation = 'projectile-animation';

class ProjectileRock extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
    super(scene, xPosition, yPosition, TextureKeys.PROJECTILE_ROCK);

    this.setVisible(false);
    this.createAnimation();
    this.scene.add.existing(this);
  }

  private createAnimation() {
    this.scene.anims.create({
      key: projectileAnimation,
      frames: this.scene.anims.generateFrameNumbers(TextureKeys.PROJECTILE_ROCK, {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  playAnimation() {
    this.setVisible(true);
    this.play(projectileAnimation);
  }

  projectileCollition() {
    this.setVisible(false);
    this.stop();
  }
}

export default ProjectileRock;
