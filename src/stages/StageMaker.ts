import {
  EnvironmentSceneKeys,
  FloorKeys,
  JsonKeys,
  ObstacleKeys,
  RockCockroachAnimationKey,
  RockCockroachColor,
  StageBoundObjectKeys,
} from '../consts';
import Floor from '../gameObjects/Floor';
import Obstacle from '../gameObjects/Obstacle';
import RockCockroach from '../gameObjects/RockCockroach';
import StageBoundObject from '../gameObjects/StageBound';
import { StageProps } from '../types';

class StageMaker {
  private stageId!: number;

  readonly #fieldSyzeByTiles = {
    xMaxTiles: 20,
    yMaxTiles: 12,
  };

  readonly #tileSize = 16;

  #scene: Phaser.Scene;

  #stageEnvironmentStyle: EnvironmentSceneKeys;

  #floor: Floor[][] = [[]];

  #bounds: (StageBoundObject | null)[][] = [[]];

  #obstacles: (Obstacle | null)[][] = [[]];

  private enemies: (RockCockroach | null)[][] = [[]];

  #worldField: StageProps[];

  constructor(
    scene: Phaser.Scene,
  ) {
    this.#scene = scene;

    this.#stageEnvironmentStyle = EnvironmentSceneKeys.desert;

    // Obtain world field data from cache.
    this.#worldField = this.#scene.cache.json.get(JsonKeys.WORLD_FIELD);

    this.decodeStage(this.#worldField[0]);
  }

  get fieldSizeByTiles() {
    return this.#fieldSyzeByTiles;
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
            FloorKeys.rbcIsland,
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
            FloorKeys.lfcIsland,
            xPosition,
            yPosition,
            tileId,
          );

        /** Case 6 - 'right-front-corner-island' floor */
        case 6:
          return new Floor(
            this.#scene,
            this.#stageEnvironmentStyle,
            FloorKeys.rfcIsland,
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
            tileId,
          );

        default:
          throw new Error('A valid TileType required, Class: StageMaker, Method: assemblingBoundsRow');
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
            tileId,
          );

        default:
          throw new Error('A valid TileType required, Class: StageMaker, Method: assemblingObstacleRow');
      }
    });
    return row;
  }

  private assemblingEnemyRow(tileRow: Array<number>, rowNumber: number) {
    const row = tileRow.map((tileType, index) => {
      const xPosition = index * this.#tileSize;
      const yPosition = rowNumber * this.#tileSize;
      const generateAnenemy = Phaser.Math.RND.pick([false, true]);
      if (generateAnenemy) {
        switch (tileType) {
          case 0: return null;

          /** Case 1 - RockCockroach - red */
          case 1:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.red,
              xPosition,
              yPosition,
            );

          /** Case 2 RockCockroach - blue */
          case 2:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.blue,
              xPosition,
              yPosition,
            );

          /** Case 3 RockCockroach - brown */
          case 3:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.brown,
              xPosition,
              yPosition,
            );

          /** Case 4 RockCockroach - green */
          case 4:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.green,
              xPosition,
              yPosition,
            );

          /** Case 5 RockCockroach - gray */
          case 5:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.gray,
              xPosition,
              yPosition,
            ).play(RockCockroachAnimationKey.grayWalktoDown);

          /** Case 6 RockCockroach - black */
          case 6:
            return new RockCockroach(
              this.#scene,
              RockCockroachColor.black,
              xPosition,
              yPosition,
            ).play(RockCockroachAnimationKey.blackWalktoDown);

          default:
            throw new Error('A valid Enemy required, Class: StageMaker, Method: assemblingEnemyRow');
        }
      } else {
        return null;
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

  get getenemiesObjecsList() {
    const enemies: RockCockroach[] = [];

    this.enemies.forEach((row) => {
      row.forEach((enemyObject) => {
        if (enemyObject !== null) enemies.push(enemyObject);
      });
    });
    return enemies;
  }

  decodeStage(stage: StageProps) {
    this.#stageEnvironmentStyle = stage.environment as EnvironmentSceneKeys;
    this.stageId = stage.stageId;

    this.#floor = stage.floor.map((row, index) => this.#assemblingFloorRow(row, index));
    console.log(this.#floor);

    this.#bounds = stage.bounds.map((row, index) => this.#assemblingBoundsRow(row, index));
    console.log(this.#bounds);

    this.#obstacles = stage.obstacles.map((row, index) => this.#assemblingObstacleRow(row, index));
    console.log(this.#obstacles);

    this.enemies = stage.enemies.map((row, index) => this.assemblingEnemyRow(row, index));
    console.log(this.enemies);
  }
}

export default StageMaker;
