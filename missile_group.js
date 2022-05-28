import Missile from './missile.js'

export default class MissleGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {

    super(scene.physics.world, scene, {
      classType: Missile,
    });
  }
  hit(zombie) {

  }
}