import TowerDefense from './tower.js'

const config = {
  type: Phaser.AUTO,
  width: 1000 ,
  height: 600,
  physics: {
    default: 'arcade',
    matter: {
      gravity: {y: 0},
      debug: true
    }
  },
  scene: [TowerDefense]
}

export default new Phaser.Game(config);
console.log("start");
