import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';
import { EnvironmentType, ObstacleType } from '../types';

/**
 * This class puts an obstacle in the field map like a rock, a three, a knight or a tomb.
 * @class Obstacle
 */
class Obstacle extends Phaser.Physics.Arcade.Image {
  #enablePhysics?: boolean;

  readonly #tileId?: number;

  /**
   * @constructor - creates a new Obstacle instance.
   * @param {Phaser.Scene} scene - Scene thet receives the obstacle.
   * @param {ObstacleType} obstacle - Type of obstacle to put.
   * @param {EnvironmentType} environment - Receives a string that select environment scene.
   * @param {number} xPosition - Position in X axis to put obstacle.
   * @param {number} yPosition - Position in Y axis to put obstacle.
   * @param {boolean} enablePhysics? - Enable body of the object
   * @param {number} tileId? - Id for this tile.
   */
  constructor(
    scene: Phaser.Scene,
    environment: EnvironmentType,
    obstacle: ObstacleType,
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
      Obstacle.#textureSelector(obstacle, environment),
    );
    this.setOrigin(0, 0);

    this.#tileId = tileId;

    this.#enablePhysics = enablePhysics;

    this.enableObstaclePhysics();

    this.scene.add.existing(this);
  }

  get tielId() {
    return this.#tileId;
  }

  /**
   * For enable phtsics of the obstacle
   * @method enableObstaclePhysics
   */
  enableObstaclePhysics() {
    if (this.#enablePhysics) {
      // this.scene.physics.world.enable(this);
      if (this.body !== null) {
        this.body.immovable = true;
      }
    }
  }

  /**
   * A static method thats selects frame from fieldObjectsSpriteSheet
   * @param {ObstacleType} obstacle - Receives a ObstacleType arg for selecting return number frame.
   * @param {EnvironmentType} environment - Receives a string that select environment scene.
   * @returns {number} - A number for select a frame from fieldObjectsSpriteSheet.
   */
  static #textureSelector(obstacle: ObstacleType, environment: EnvironmentType): number {
    switch (true) {
      case environment === 'desert' && obstacle === 'rock': return 36;
      case environment === 'desert' && obstacle === 'tree': return 37;
      case environment === 'desert' && obstacle === 'knight': return 38;
      case environment === 'desert' && obstacle === 'tomb': return 39;

      case environment === 'forest' && obstacle === 'rock': return 45;
      case environment === 'forest' && obstacle === 'tree': return 46;
      case environment === 'forest' && obstacle === 'knight': return 47;
      case environment === 'forest' && obstacle === 'tomb': return 48;

      case environment === 'cemetery' && obstacle === 'rock': return 126;
      case environment === 'cemetery' && obstacle === 'tree': return 127;
      case environment === 'cemetery' && obstacle === 'knight': return 128;
      case environment === 'cemetery' && obstacle === 'tomb': return 129;

      case environment === 'cave' && obstacle === 'rock': return 135;
      case environment === 'cave' && obstacle === 'tree': return 136;
      case environment === 'cave' && obstacle === 'knight': return 137;
      case environment === 'cave' && obstacle === 'tomb': return 138;

      default: return 0;
    }
  }
}

export default Obstacle;
