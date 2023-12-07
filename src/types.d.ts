import { EnvironmentSceneKeys } from './consts';

/**
 * @type
 * @description Type of obstacle able to use on an obstacle Object.
 */
export type ObstacleType = 'rock'
| 'tree'
| 'knight'
| 'tomb';

/**
 * @type
 * @description Type of environment able to use on an Stage.
 */
export type EnvironmentType = EnvironmentSceneKeys;

/**
 * @type
 * @description Type of bound able to use on an bound world stage
 */
export type StageBoundTypes = 'left-behind-corner-rock'
| 'behind-center-rock'
| 'right-behind-corner-rock'
| 'left-front-corner-rock'
| 'front-center-rock'
| 'right-front-corner-rock';

/**
 * @type
 * @description Type of floor able to use in a Floor object.
 */
export type FloorType = 'solid'
| 'sand'
| 'left-behind-corner-island'
| 'right-behind-corner-island'
| 'left-front-corner-island'
| 'right-front-corner-island';

export type RockCockroachType = 'red'
| 'blue'
| 'brown'
| 'green'
| 'grey'
| 'black';

/**
 * @interface
 * @description Define properties of a Stage object.
 */
export interface StageProps {
  stageId: number,
  environment: EnvironmentType,
  bounds: number[][],
  floor: number[][],
  obstacles: number[][],
  enemies: number[][];
  items: number[][];
}

export type TextureFrames<T> = {
  up: { key: T, start: number, end: number, },
  down: { key: T, start: number, end: number, },
  left: { key: T, start: number, end: number, },
  right: { key: T, start: number, end: number, },
};
