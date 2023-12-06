/* eslint-disable max-len */
import Phaser from 'phaser';
import { EnvironmentType, StageBoundTypes } from '../types';
import { EnvironmentSceneKeys, TextureKeys, StageBoundObjectKeys } from '../consts';

/**
 * Make and put on screen an bound object like rocksor other stuffs
 * @class StageBoundObject
 */
class StageBoundObject extends Phaser.GameObjects.Image {
  readonly #tileId?: number;

  /**
   * Construtor: Receives params for put a bound object in the scene.
   * @param {Phaser.Scene} scene - An schene where object will be putted.
   * @param {EnvironmentType} environment - A string that describes type of environment.
   * @param {StageBoundObjectKeys} bound - Key that describes Bound Object will be use to this object
   * in the scene
   * @param {number} xPosition - Position on X axis.
   * @param {number} yPosition - Position on Y axis.
   * @param {number} tileId? - Asign an optional Id for tile.
   */
  constructor(
    scene: Phaser.Scene,
    environment: EnvironmentSceneKeys,
    bound: StageBoundObjectKeys,
    xPosition: number,
    yPosition: number,
    tileId?: number,
  ) {
    super(
      scene,
      xPosition,
      yPosition,
      TextureKeys.FIELD_OBJECTS_TILES,
      StageBoundObject.#textureSelector(environment, bound),
    );
    this.setOrigin(0, 0);

    this.#tileId = tileId;

    this.scene.add.existing(this);
  }

  get tileId() {
    return this.#tileId;
  }

  /**
   * Selects texture to add in the bound object.
   *
   * @param {EnvironmentType} environment - A string that describes type of environment.
   * @param {StageBoundTypes} bound - String that describes Bound Object will be putted in scene.
   * @returns {number} - Nomber of the frame selected from field-tileset.png spritesheet
   */
  static #textureSelector(environment: EnvironmentType, bound: StageBoundTypes): number {
    switch (true) {
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.lbcRock: return 1;
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.bcRock: return 2;
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.rbcRock: return 3;
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.lfcRock: return 19;
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.fcRock: return 20;
      case environment === EnvironmentSceneKeys.desert && bound === StageBoundObjectKeys.rfcRock: return 21;

      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.lbcRock: return 10;
      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.bcRock: return 11;
      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.rbcRock: return 12;
      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.lfcRock: return 28;
      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.fcRock: return 29;
      case environment === EnvironmentSceneKeys.forest && bound === StageBoundObjectKeys.rfcRock: return 30;

      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.lbcRock: return 91;
      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.bcRock: return 92;
      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.rbcRock: return 93;
      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.lfcRock: return 109;
      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.fcRock: return 110;
      case environment === EnvironmentSceneKeys.cemetery && bound === StageBoundObjectKeys.rfcRock: return 111;

      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.lbcRock: return 99;
      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.bcRock: return 100;
      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.rbcRock: return 101;
      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.lfcRock: return 118;
      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.fcRock: return 119;
      case environment === EnvironmentSceneKeys.cave && bound === StageBoundObjectKeys.rfcRock: return 120;

      default: return 0;
    }
  }
}

export default StageBoundObject;
