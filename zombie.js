export default class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, 'zombie');
      this.setScale(0.3, 0.3);
      console.log("zombie done");
      
    } 
  
    preUpdate(t, dt) {
      this.setVelocity(100, 0);
    }

  hit(weapon) {
    this.destroy();
    //this.setActive(false);
		//this.setVisible(false);
  }
}