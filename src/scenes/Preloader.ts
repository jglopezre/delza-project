import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import TextureKeys from '../consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.DEVPRELOADER);
  }

  preload(): void {
    this.load.spritesheet(TextureKeys.PLAYER1, 'assets/sprites/hero-sprite.png', {
      frameWidth: 16,
    });

    this.load.spritesheet(TextureKeys.FIELD_OBJECTS_TILES, 'assets/sprites/field-objects-tileset.png', {
      frameWidth: 16,
      spacing: 1,
    });
  }

  create(): void {
    this.scene.start(SceneKeys.GAME);
  }
}
