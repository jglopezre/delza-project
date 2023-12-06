/* eslint-disable max-len */
import Phaser from 'phaser';
import { TextureKeys, ObstacleKeys, EnvironmentSceneKeys } from '../consts';
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
   * @param {ObstacleKeys} obstacle - Type of obstacle to put.
   * @param {Environment} environment - Receives a string that select environment scene.
   * @param {number} xPosition - Position in X axis to put obstacle.
   * @param {number} yPosition - Position in Y axis to put obstacle.
   * @param {boolean} enablePhysics? - Enable body of the object
   * @param {number} tileId? - Id for this tile.
   */
  constructor(
    scene: Phaser.Scene,
    environment: EnvironmentSceneKeys,
    obstacle: ObstacleKeys,
    xPosition: number,
    yPosition: number,
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

    this.scene.add.existing(this);
  }

  get tielId() {
    return this.#tileId;
  }

  /**
   * A static method thats selects frame from fieldObjectsSpriteSheet
   * @param {ObstacleType} obstacle - Receives a ObstacleType arg for selecting return number frame.
   * @param {EnvironmentType} environment - Receives a string that select environment scene.
   * @returns {number} - A number for select a frame from fieldObjectsSpriteSheet.
   */
  static #textureSelector(obstacle: ObstacleType, environment: EnvironmentType): number {
    switch (true) {
      case environment === EnvironmentSceneKeys.desert && obstacle === ObstacleKeys.rock: return 36;
      case environment === EnvironmentSceneKeys.desert && obstacle === ObstacleKeys.tree: return 37;
      case environment === EnvironmentSceneKeys.desert && obstacle === ObstacleKeys.knight: return 38;
      case environment === EnvironmentSceneKeys.desert && obstacle === ObstacleKeys.tomb: return 39;

      case environment === EnvironmentSceneKeys.forest && obstacle === ObstacleKeys.rock: return 45;
      case environment === EnvironmentSceneKeys.forest && obstacle === ObstacleKeys.tree: return 46;
      case environment === EnvironmentSceneKeys.forest && obstacle === ObstacleKeys.knight: return 47;
      case environment === EnvironmentSceneKeys.forest && obstacle === ObstacleKeys.tomb: return 48;

      case environment === EnvironmentSceneKeys.cemetery && obstacle === ObstacleKeys.rock: return 126;
      case environment === EnvironmentSceneKeys.cemetery && obstacle === ObstacleKeys.tree: return 127;
      case environment === EnvironmentSceneKeys.cemetery && obstacle === ObstacleKeys.knight: return 128;
      case environment === EnvironmentSceneKeys.cemetery && obstacle === ObstacleKeys.tomb: return 129;

      case environment === EnvironmentSceneKeys.cave && obstacle === ObstacleKeys.rock: return 135;
      case environment === EnvironmentSceneKeys.cave && obstacle === ObstacleKeys.tree: return 136;
      case environment === EnvironmentSceneKeys.cave && obstacle === ObstacleKeys.knight: return 137;
      case environment === EnvironmentSceneKeys.cave && obstacle === ObstacleKeys.tomb: return 138;

      default: return 0;
    }
  }
}

export default Obstacle;
