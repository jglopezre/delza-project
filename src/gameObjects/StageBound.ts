import Phaser from 'phaser';
import { EnvironmentType, StageBoundTypes } from '../types';
import TextureKeys from '../consts/TextureKeys';
import StageBoundObjectKeys from '../consts/StageBoundObjectKeys';

/**
 * Make and put on screen an bound object like rocksor other stuffs
 * @class StageBoundObject
 */
class StageBoundObject extends Phaser.GameObjects.Image {
  #tileId?: number;

  /**
   * Construtor: Receives params for put a bound object in the scene.
   * @param {Phaser.Scene} scene - An schene where object will be putted.
   * @param {EnvironmentType} environment - A string that describes type of environment.
   * @param {StageBoundTypes} bound - string that describes Bound Object will be putted in the scene
   * @param {number} xPosition - Position on X axis.
   * @param {number} yPosition - Position on Y axis.
   * @param {boolean} enablePhysics? - Enable body of the object
   * @param {number} tileId? - Asign an optional Id for tile.
   */
  constructor(
    scene: Phaser.Scene,
    environment: EnvironmentType,
    bound: StageBoundTypes,
    xPosition: number,
    yPosition: number,
    enablePhysics? : boolean,
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

    // this.enableObstaclePhysics(enablePhysics ?? true);

    this.scene.add.existing(this);
  }

  get tileId() {
    return this.#tileId;
  }

  /**
   * For enable phtsics of the obstacle
   * @param {bolean} enablePhysics - This indicates if physics would be enabled
   * for this object
   */
 /*  enableObstaclePhysics(enablePhysics: boolean) {
    if (enablePhysics) {
      this.scene.physics.world.enable(this);
      if (this.body !== null) {
        this.body.immovable = true;
      }
    }
  } */

  /**
   * Selects texture to add in the bound object.
   * @param {EnvironmentType} environment - A string that describes type of environment.
   * @param {StageBoundTypes} bound - String that describes Bound Object will be putted in scene.
   * @returns {number} - Nomber of the frame selected from field-tileset.png spritesheet
   */
  static #textureSelector(environment: EnvironmentType, bound: StageBoundTypes): number {
    switch (true) {
      case environment === 'desert' && bound === StageBoundObjectKeys.lbcRock: return 1;
      case environment === 'desert' && bound === StageBoundObjectKeys.bcRock: return 2;
      case environment === 'desert' && bound === StageBoundObjectKeys.rbcRock: return 3;
      case environment === 'desert' && bound === StageBoundObjectKeys.lfcRock: return 19;
      case environment === 'desert' && bound === StageBoundObjectKeys.fcRock: return 20;
      case environment === 'desert' && bound === StageBoundObjectKeys.rfcRock: return 21;

      case environment === 'forest' && bound === StageBoundObjectKeys.lbcRock: return 10;
      case environment === 'forest' && bound === StageBoundObjectKeys.bcRock: return 11;
      case environment === 'forest' && bound === StageBoundObjectKeys.rbcRock: return 12;
      case environment === 'forest' && bound === StageBoundObjectKeys.lfcRock: return 28;
      case environment === 'forest' && bound === StageBoundObjectKeys.fcRock: return 29;
      case environment === 'forest' && bound === StageBoundObjectKeys.rfcRock: return 30;

      case environment === 'cemetery' && bound === StageBoundObjectKeys.lbcRock: return 90;
      case environment === 'cemetery' && bound === StageBoundObjectKeys.bcRock: return 91;
      case environment === 'cemetery' && bound === StageBoundObjectKeys.rbcRock: return 92;
      case environment === 'cemetery' && bound === StageBoundObjectKeys.lfcRock: return 109;
      case environment === 'cemetery' && bound === StageBoundObjectKeys.fcRock: return 110;
      case environment === 'cemetery' && bound === StageBoundObjectKeys.rfcRock: return 111;

      case environment === 'cave' && bound === StageBoundObjectKeys.lbcRock: return 99;
      case environment === 'cave' && bound === StageBoundObjectKeys.bcRock: return 100;
      case environment === 'cave' && bound === StageBoundObjectKeys.rbcRock: return 101;
      case environment === 'cave' && bound === StageBoundObjectKeys.lfcRock: return 118;
      case environment === 'cave' && bound === StageBoundObjectKeys.fcRock: return 119;
      case environment === 'cave' && bound === StageBoundObjectKeys.rfcRock: return 120;

      default: return 0;
    }
  }
}

export default StageBoundObject;
