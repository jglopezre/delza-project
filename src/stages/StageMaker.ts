import EnvironmentScene from '../consts/EnvironmentScene';
import FloorKeys from '../consts/FloorKeys';
import ObstacleKeys from '../consts/ObstacleKeys';
import StageBoundObjectKeys from '../consts/StageBoundObjectKeys';
import Floor from '../gameObjects/Floor';
import Obstacle from '../gameObjects/Obstacle';
import StageBoundObject from '../gameObjects/StageBound';
import { EnvironmentType } from '../types';

class StageMaker {
  readonly #field = {
    xMaxTiles: 20,
    yMaxTiles: 12,
  };

  #scene: Phaser.Scene;

  #tileSize = 16;

  #stageEnvironmentStyle: EnvironmentType;

  #floor: Floor[][] = [[]];

  #bounds: (StageBoundObject | null)[][] = [[]];

  #obstacles: (Obstacle | null)[][] = [[]];

  constructor(
    scene: Phaser.Scene,
    stageEnvironmentStyle?: EnvironmentType,
  ) {
    this.#scene = scene;
    this.#stageEnvironmentStyle = stageEnvironmentStyle ?? EnvironmentScene.desert;

    this.decodeStage();
  }

  #assemblingFloorRow(tileRow: Array<number>, rowNumber: number, tileId?: number): Array<Floor> {
    const row = tileRow.map((tileType, index) => {
      const xPosition = index * this.#tileSize;
      const yPosition = rowNumber * this.#tileSize;

      switch (tileType) {
        /** Case 1 - Solid Floor */
        case 1:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.solid,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 2 'left-behind-corner-island' floor */
        case 2:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.lbcIsland,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 3 'right-behind-corner-island' floor */
        case 3:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.sand,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 4 'sand' floor */
        case 4:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.sand,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 5 'left-front-corner-island' floor */
        case 5:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.sand,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 6 - 'right-front-corner-island' floor */
        case 6:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.sand,
            xPosition,
            yPosition,
            tileId,
          );

        default:
          throw new Error('A valid TileType required, Class: StageMaker, Method: putTile');
      }
    });
    return row;
  }

  get bounds() {
    return this.#bounds;
  }

  #assemblingBoundsRow(tileRow: Array<number>, rowNumber: number, tileId?: number) {
    const row = tileRow.map((tileType, index) => {
      const xPosition = index * this.#tileSize;
      const yPosition = rowNumber * this.#tileSize;

      switch (tileType) {
        case 0: return null;
        /** Case 1 - 'left-behind-corner-rock' object */
        case 1:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.lbcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 2 'behind-center-rock' object */
        case 2:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.bcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 3 'right-behind-corner-rock' object */
        case 3:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.rbcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 4 'left-front-corner-rock' object */
        case 4:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.lfcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 5 'front-center-rock' object */
        case 5:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.fcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 6 - 'right-front-corner-rock' object */
        case 6:
          return new StageBoundObject(
            this.#scene,
            this.#stageEnvironmentStyle,
            StageBoundObjectKeys.rfcRock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        default:
          throw new Error('A valid TileType required, Class: StageMaker, Method: putTile');
      }
    });
    return row;
  }

  #assemblingObstacleRow(tileRow: Array<number>, rowNumber: number, tileId?: number) {
    const row = tileRow.map((tileType, index) => {
      const xPosition = index * this.#tileSize;
      const yPosition = rowNumber * this.#tileSize;

      switch (tileType) {
        case 0: return null;

        /** Case 1 - 'rock' obstacle */
        case 1:
          return new Obstacle(
            this.#scene,
            this.#stageEnvironmentStyle,
            ObstacleKeys.rock,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 2 'tree' obstacle */
        case 2:
          return new Obstacle(
            this.#scene,
            this.#stageEnvironmentStyle,
            ObstacleKeys.tree,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 3 'knight' obstacle */
        case 3:
          return new Obstacle(
            this.#scene,
            this.#stageEnvironmentStyle,
            ObstacleKeys.knight,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        /** Case 4 'tomb' obstacle */
        case 4:
          return new Obstacle(
            this.#scene,
            this.#stageEnvironmentStyle,
            ObstacleKeys.tomb,
            xPosition,
            yPosition,
            true,
            tileId,
          );

        default:
          throw new Error('A valid TileType required, Class: StageMaker, Method: putTile');
      }
    });
    return row;
  }

  get getBoundsObjectsList() {
    const bounds: StageBoundObject[] = [];

    this.#bounds.forEach((row) => {
      row.forEach((boundObject) => {
        if (boundObject !== null) bounds.push(boundObject);
      });
    });
    return bounds;
  }

  get getObstaclesObjectsList() {
    const obstacles: Obstacle[] = [];

    this.#obstacles.forEach((row) => {
      row.forEach((obstacleObject) => {
        if (obstacleObject !== null) obstacles.push(obstacleObject);
      });
    });
    return obstacles;
  }

  decodeStage() {
    const stage = {
      floor: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],

      bounds: [
        [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 0, 0, 4, 5, 5, 5, 5],
        [4, 5, 5, 6, 0, 0, 4, 5, 5, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 2, 5, 5, 5, 3, 0, 0, 0, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0],
        [2, 5, 5, 5, 5, 5, 5, 2, 2, 2, 2, 2, 2, 5, 5, 2, 2, 2, 2, 2],
      ],

      obstacles: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };

    this.#floor = stage.floor.map((row, index) => this.#assemblingFloorRow(row, index));
    console.log(this.#floor);

    this.#bounds = stage.bounds.map((row, index) => this.#assemblingBoundsRow(row, index));
    console.log(this.#bounds);

    this.#obstacles = stage.obstacles.map((row, index) => this.#assemblingObstacleRow(row, index));
    console.log(this.#obstacles);
  }
}

export default StageMaker;
