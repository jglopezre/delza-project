import Phaser from 'phaser';
import { TextureKeys } from '../consts';
import { ProyectileDirection } from '../consts/ProyectileRockKeys';
import { Coordinates } from '../types';

const projectileAnimation = 'projectile-animation';

class ProjectileRock extends Phaser.Physics.Arcade.Sprite {
  private projectileVelocity = 120;

  private spriteBody!: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, xPosition: number, yPosition: number) {
    super(scene, xPosition, yPosition, TextureKeys.PROJECTILE_ROCK);

    this.setVisible(false);
    this.createAnimation();
    this.enablePhysics();
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

  private enablePhysics() {
    this.scene.physics.add.existing(this);
    this.spriteBody = this.body as Phaser.Physics.Arcade.Body;
    this.spriteBody.setSize(this.width - 6, this.height - 6);
    this.spriteBody.setOffset(3, 3);
    this.spriteBody.setCollideWorldBounds(true);
  }

  playShot(direction: ProyectileDirection, origin?: Coordinates) {
    if (origin) {
      this.x = origin.x;
      this.y = origin.y;
    }

    this.playAnimation();

    switch (direction) {
      case ProyectileDirection.toLeft:
        this.spriteBody.setVelocityX(this.projectileVelocity * -1);
        this.spriteBody.setVelocityY(0);
        break;

      case ProyectileDirection.toRight:
        this.spriteBody.setVelocityX(this.projectileVelocity);
        this.spriteBody.setVelocityY(0);
        break;

      case ProyectileDirection.toBackward:
        this.spriteBody.setVelocityX(0);
        this.spriteBody.setVelocityY(this.projectileVelocity * -1);
        break;

      case ProyectileDirection.toFront:
        this.spriteBody.setVelocityX(0);
        this.spriteBody.setVelocityY(this.projectileVelocity);
        break;

      default:
        throw new Error('Direction is not valid. [Class: ProjectileRock, Method: playShot]');
    }
  }
}

export default ProjectileRock;
