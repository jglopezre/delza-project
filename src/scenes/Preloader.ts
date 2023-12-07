import Phaser from 'phaser';
import { SceneKeys, TextureKeys, JsonKeys } from '../consts';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.DEVPRELOADER);
  }

  preload(): void {
    this.load.spritesheet(TextureKeys.PLAYER1, 'assets/sprites/hero.png', {
      frameWidth: 16,
    });

    this.load.spritesheet(TextureKeys.FIELD_OBJECTS_TILES, 'assets/sprites/field-tileset.png', {
      frameWidth: 16,
      spacing: 1,
    });

    this.load.spritesheet(TextureKeys.ROCK_COCKROACH, 'assets/sprites/rock-cockroach.png', {
      frameWidth: 16,
    });

    this.load.spritesheet(TextureKeys.SWORD, 'assets/sprites/sword.png', {
      frameWidth: 16,
    });

    this.load.json(JsonKeys.WORLD_FIELD, 'assets/fieldsData/worldField.json');
  }

  create(): void {
    this.scene.start(SceneKeys.GAME);
  }
}
