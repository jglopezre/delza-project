/* eslint-disable max-len */
import Phaser from 'phaser';
import { EnvironmentSceneKeys, FloorKeys, TextureKeys } from '../consts';
import { EnvironmentType, FloorType } from '../types';

/**
 * This class puts an obstacle in the field map like a rock, a three, a knight or a tomb.
 * @class Obstacle
 */
class Floor extends Phaser.GameObjects.Image {
  /**
   * optional Id for tile seeking
   * @type {number | undefined}
   */
  readonly #tileId: number | undefined;

  /**
   * @constructor - creates a new Obstacle instance.
   * @param {Phaser.Scene} scene - Scene thet receives the obstacle.
   * @param {ObstacleType} obstacle - Type of obstacle to put.
   * @param {EnvironmentType} environment - Receives a string that select environment scene.
   * @param {number} xPosition - Position in X axis to put obstacle.
   * @param {number} yPosition - Position in Y axis to put obstacle.
   * @param {boolean} enablePhysics? - Enable body of the object
   */
  constructor(
    scene: Phaser.Scene,
    environment: EnvironmentSceneKeys,
    floor: FloorKeys,
    xPosition: number,
    yPosition: number,
    tileId?: number,
  ) {
    super(
      scene,
      xPosition,
      yPosition,
      TextureKeys.FIELD_OBJECTS_TILES,
      Floor.#textureSelector(floor, environment),
    );
    this.setOrigin(0, 0);

    this.scene.add.existing(this);

    this.#tileId = tileId;
  }

  get tileId() {
    return this.#tileId;
  }

  /**
   * A static method thats selects frame from fieldObjectsSpriteSheet
   * @param {ObstacleType} obstacle - Receives a ObstacleType arg for selecting return number frame.
   * @param {EnvironmentType} environment - Receives a string that select environment scene.
   * @returns {number} - A number for select a frame from fieldObjectsSpriteSheet.
   */
  static #textureSelector(floor: FloorType, environment: EnvironmentType): number {
    switch (true) {
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.solid: return 0;
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.lbcIsland: return 7;
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.rbcIsland: return 8;
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.sand: return 18;
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.lfcIsland: return 25;
      case environment === EnvironmentSceneKeys.desert && floor === FloorKeys.rfcIsland: return 26;

      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.solid: return 9;
      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.lbcIsland: return 16;
      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.rbcIsland: return 17;
      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.sand: return 27;
      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.lfcIsland: return 34;
      case environment === EnvironmentSceneKeys.forest && floor === FloorKeys.rfcIsland: return 35;

      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.solid: return 90;
      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.lbcIsland: return 97;
      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.rbcIsland: return 98;
      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.sand: return 108;
      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.lfcIsland: return 115;
      case environment === EnvironmentSceneKeys.cemetery && floor === FloorKeys.rfcIsland: return 116;

      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.solid: return 99;
      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.lbcIsland: return 106;
      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.rbcIsland: return 107;
      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.sand: return 117;
      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.lfcIsland: return 124;
      case environment === EnvironmentSceneKeys.cave && floor === FloorKeys.rfcIsland: return 125;

      default: return 0;
    }
  }
}

export default Floor;
