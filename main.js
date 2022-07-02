import TowerDefense from './tower_defense.js'
import IntroScreen from './intro_screen.js'

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [TowerDefense, IntroScreen]
}

export default new Phaser.Game(config);

