import Phaser from 'phaser';
import TextureKeys from '../consts/TextureKeys';

type ObstacleType = 'rock' | 'tree' | 'knight' | 'tomb';

/**
 * This class puts an obstacle in the field map like a rock, a three, a knight or a tomb.
 * @class Obstacle
 */
class Obstacle extends Phaser.GameObjects.Image {
  /**
   * Constructor: creates a new Obstacle instance.
   * @param {Phaser.Scene} scene - Scene thet receives the obstacle.
   * @param {ObstacleType} obstacle - Type of obstacle to put.
   * @param {number} xPosition - Position in X axis to put obstacle.
   * @param {number} yPosition - Position in Y axis to put obstacle.
   */
  constructor(scene: Phaser.Scene, obstacle: ObstacleType, xPosition: number, yPosition: number) {
    super(
      scene,
      xPosition,
      yPosition,
      TextureKeys.FIELD_OBJECTS_TILES,
      Obstacle.#textureSelector(obstacle),
    );
  }

  /**
   * A static method thats selects frame from fieldObjectsSpriteSheet
   * @param {ObstacleType} obstacle - Receives a ObstacleType arg for selecting return number frame.
   * @returns {number} - A number for select a frame from fieldObjectsSpriteSheet.
   */
  static #textureSelector(obstacle: ObstacleType): number {
    switch (obstacle) {
      case 'rock': return 18;
      case 'tree': return 19;
      case 'knight': return 20;
      case 'tomb': return 21;
      default: return 0;
    }
  }
}

export default Obstacle;
