import Phaser from 'phaser';

import Game from './scenes/Game';
import Preloader from './scenes/Preloader';

import './style.css';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 320,
  height: 240,
  title: 'Delza',
  version: '0.0.1',
  autoCenter: Phaser.Scale.CENTER_BOTH,
  zoom: 3,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      // debug: true,
    },
  },
  scene: [Preloader, Game],
};

export default new Phaser.Game(config);
