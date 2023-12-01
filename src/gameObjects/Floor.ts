import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
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
    environment: EnvironmentType,
    floor: FloorType,
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
      case environment === 'desert' && floor === 'solid': return 0;
      case environment === 'desert' && floor === 'left-behind-corner-island': return 7;
      case environment === 'desert' && floor === 'right-behind-corner-island': return 8;
      case environment === 'desert' && floor === 'sand': return 18;
      case environment === 'desert' && floor === 'left-front-corner-island': return 25;
      case environment === 'desert' && floor === 'right-front-corner-island': return 26;

      case environment === 'forest' && floor === 'solid': return 9;
      case environment === 'forest' && floor === 'left-behind-corner-island': return 16;
      case environment === 'forest' && floor === 'right-behind-corner-island': return 17;
      case environment === 'forest' && floor === 'sand': return 27;
      case environment === 'forest' && floor === 'left-front-corner-island': return 34;
      case environment === 'forest' && floor === 'right-front-corner-island': return 35;

      case environment === 'cemetery' && floor === 'solid': return 90;
      case environment === 'cemetery' && floor === 'left-behind-corner-island': return 97;
      case environment === 'cemetery' && floor === 'right-behind-corner-island': return 98;
      case environment === 'cemetery' && floor === 'sand': return 108;
      case environment === 'cemetery' && floor === 'left-front-corner-island': return 115;
      case environment === 'cemetery' && floor === 'right-front-corner-island': return 116;

      case environment === 'cave' && floor === 'solid': return 99;
      case environment === 'cave' && floor === 'left-behind-corner-island': return 106;
      case environment === 'cave' && floor === 'right-behind-corner-island': return 107;
      case environment === 'cave' && floor === 'sand': return 117;
      case environment === 'cave' && floor === 'left-front-corner-island': return 124;
      case environment === 'cave' && floor === 'right-front-corner-island': return 125;

      default: return 0;
    }
  }
}

export default Floor;
