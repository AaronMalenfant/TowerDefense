export default class Shooter extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);
		this.SIZE = 100;
		this.setActive(true);
		this.setVisible(true);
    this.heatSeeking = false;
   
	}

	preUpdate(t, dt) {

	}
	setup(towerDetails, missileGroup, zombieGroup, strength, speed, heatSeeking, missleSize = 1) {
		this.towerDetails = towerDetails;
    this.missileGroup = missileGroup;  
		this.zombieGroup = zombieGroup;
		// this.scene.time = time;
		this.setSize(this.SIZE, this.SIZE);
		this.setDisplaySize(this.SIZE, this.SIZE);
		this.scene.time.addEvent({ 
      delay: towerDetails.speed, 
      callback: this.shoot, 
      callbackScope: this, 
      loop:true 
    });
	  this.strength = strength;
    this.speed = speed;
    this.heatSeeking = heatSeeking;
    this.missleSize = missleSize;
  }

	shoot() {
		if (this.zombieGroup.getLength() > 0) {
			this.missile = this.missileGroup.get(this.x, this.y);
			this.missile.setTarget(this.zombieGroup);
			this.missile.onAdd(this.towerDetails);
		}
	}
	hit(weapon) {
		this.destroy();
		//this.setActive(false);
		//this.setVisible(false);
	}
}
