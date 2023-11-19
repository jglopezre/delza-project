import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import DevTextureKeys from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.DEVPRELOADER);
  }

  preload(): void {
    this.load.spritesheet(DevTextureKeys.PLAYER1, 'assets/sprites/hero-sprite.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create(): void {
    this.scene.start(SceneKeys.GAME);
  }
}
