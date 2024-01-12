import Phaser from 'phaser';
// import RockCockroach from '../gameObjects/RockCockroach';
import { DirectionKeys } from '../types';

/**
 * Generates a directión parameter in ceratain random time for send to a Game Object.
 *
 * @class
 */
class AutoMovement {
  /**
   * Holds a Scene Object
   */
  scene: Phaser.Scene;

  /**
   * Holds the id of th Game Object that instanciates this class.
   *
   * @private
   */
  readonly spriteObjectId: string;

  /**
   * Holds a Timer Event Object
   *
   * @private
   */
  timerEvent: Phaser.Time.TimerEvent | null = null;

  /**
   * Holds a Event Emitter Object for send changes of direction after Timer Event occurs.
   */
  eventEmitter: Phaser.Events.EventEmitter;

  /**
   * @constructor
   * @param {Phaser.Scene} scene - Receives the Scene Object of the Game Object 
   * thats instanciate this class.
   * @param {string} spriteObjectId - Receives id of the Game Object thats instanciates this class.
   */
  constructor(scene: Phaser.Scene, spriteObjectId: string) {
    this.scene = scene;

    this.spriteObjectId = spriteObjectId;

    this.eventEmitter = new Phaser.Events.EventEmitter();

    this.setTimerEvent();
  }

  /* get eventEmitter() {
    return this.#eventEmitter;
  } */

  /**
   * Sets a Timer Event with its configuration.
   */
  setTimerEvent() {
    this.timerEvent = this.scene.time.addEvent(this.generateTimerConfig());
  }

  /**
   * Sets a new Timer Event with a new configuration.
   */
  resetTimerEvent() {
    this.timerEvent?.reset(this.generateTimerConfig());
  }

  /**
   * Generates a new Timer Event Config, generating a new random Delay Value.
   *
   * @returns {Phaser.Types.Time.TimerEventConfig}
   */
  generateTimerConfig(): Phaser.Types.Time.TimerEventConfig {
    return {
      delay: AutoMovement.getNewDelayValue(),
      loop: true,
      callbackScope: this,
      callback: this.changeDirection,
    };
  }

  /**
   * Generates a new random direction and emit an Event sending this new direction
   */
  changeDirection() {
    const directions: DirectionKeys[] = ['up', 'down', 'left', 'right', null];
    const newDirection = Phaser.Utils.Array.GetRandom(directions);

    this.eventEmitter.emit(this.spriteObjectId, newDirection);

    this.resetTimerEvent();
  }

  /**
   * Generates a new random value between 100 and 1600 for using to delaying Timer Event.
   *
   * @static
   * @returns {number}
   */
  static getNewDelayValue() {
    const value1 = Phaser.Math.Between(1, 4);
    const value2 = Phaser.Math.Between(2, 4);
    return value1 * value2 * 100;
  }
}

export default AutoMovement;
