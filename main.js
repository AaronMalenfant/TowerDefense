import TowerDefense from './tower_defense.js'

const config = {
  type: Phaser.AUTO,
  width: 1000 ,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0},
      debug: false
    }
  },
  scene: [TowerDefense]
}

export default new Phaser.Game(config);

