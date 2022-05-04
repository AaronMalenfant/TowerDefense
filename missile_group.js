import Missile from './missile.js'

export default class MissleGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		// Call the super constructor, passing in a world and a scene
		super(scene.physics.world, scene, {
      classType: Missile,
    }); 
	}
  hit(zombie) {
    console.log("missile group hit")
  }
}