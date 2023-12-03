import Phaser from 'phaser';
// import RockCockroach from '../gameObjects/RockCockroach';
import { DirectionKeys } from '../consts';

class AutoMovement {
  scene: Phaser.Scene;

  spriteObjectId: string;

  timerEvent: Phaser.Time.TimerEvent | null = null;

  eventEmitter: Phaser.Events.EventEmitter;

  constructor(scene: Phaser.Scene, spriteObjectId: string) {
    this.scene = scene;

    this.spriteObjectId = spriteObjectId;

    this.eventEmitter = new Phaser.Events.EventEmitter();

    this.setTimerEvent();
  }

  /* get eventEmitter() {
    return this.#eventEmitter;
  } */

  setTimerEvent() {
    this.timerEvent = this.scene.time.addEvent(this.generateTimerConfig());
  }

  resetTimerEvent() {
    this.timerEvent?.reset(this.generateTimerConfig());
  }

  generateTimerConfig(): Phaser.Types.Time.TimerEventConfig {
    return {
      delay: AutoMovement.getNewDelayValue(),
      loop: true,
      callbackScope: this,
      callback: this.changeDirection,
    };
  }

  changeDirection() {
    const directions: DirectionKeys[] = ['up', 'down', 'left', 'right', null];
    const newDirection = Phaser.Utils.Array.GetRandom(directions);

    this.eventEmitter.emit(this.spriteObjectId, newDirection);

    this.resetTimerEvent();
  }

  static getNewDelayValue() {
    const value1 = Phaser.Math.Between(1, 4);
    const value2 = Phaser.Math.Between(2, 4);
    return value1 * value2 * 100;
  }
}

export default AutoMovement;
