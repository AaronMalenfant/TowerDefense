export default class Shooter extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, 'shoter_guy');
		this.SIZE = 100;
		this.setActive(true);
		this.setVisible(true);
	}

	preUpdate(t, dt) {

	}
	setup(missileGroup, zombieGroup) {
		this.missileGroup = missileGroup;
		this.zombieGroup = zombieGroup;
		// this.scene.time = time;
		this.setSize(this.SIZE, this.SIZE);
		this.setDisplaySize(this.SIZE, this.SIZE);
		this.scene.time.addEvent({ delay: 500, callback: this.shoot, callbackScope: this, loop:true });
	}

	shoot() {
		if (this.zombieGroup.getLength() > 0) {
			this.missile = this.missileGroup.get(this.x, this.y);
			this.missile.setTarget(this.zombieGroup);
			this.missile.onAdd();
		}
	}
	hit(weapon) {
		this.destroy();
		//this.setActive(false);
		//this.setVisible(false);
	}
}
