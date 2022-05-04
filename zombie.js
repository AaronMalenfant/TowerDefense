export default class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, 'zombie');
      this.setScale(0.3, 0.3);
      this.zombie = true;
     
      
    } 
  
    preUpdate(t, dt) {
      this.setVelocity(1000, 0);
    }
    setup() {
       this.on('addedtoscene', console.log);
    this.setCollideWorldBounds(true);
    
    this.body.onWorldBounds = true;
    
    }

  hit(weapon) {
    this.destroy();
    //this.setActive(false);
		//this.setVisible(false);
  }
}