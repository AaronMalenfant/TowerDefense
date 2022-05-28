import Shooter from './shooter.js'

export default class TowerGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		// Call the super constructor, passing in a world and a scene
		super(scene.physics.world, scene, {
			classType: Shooter,
		});
	}
	addedToScene() {
		// no worky!
		super.addedToScene()
	}
}