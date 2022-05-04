import Zombie from './zombie.js'

export default class ZombieGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		// Call the super constructor, passing in a world and a scene
		super(scene.physics.world, scene, {
      classType: Zombie,
    }); 
	}  
}