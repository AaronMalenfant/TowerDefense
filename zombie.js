export default class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, 'zombie');
      this.SIZE=50;
      //this.setScale(0.3, 0.3);
      this.zombie = true;
      //this.setDisplaySize(this.SIZE,this.SIZE);
          this.setActive(true);
    this.setVisible(true);  
      this.scene.events.on('addedtoscene', this.onAdd, this);
      } 
  
    preUpdate(t, dt) {
      
    }
    setup() {
       console.log("setup");
      this.onAdd();
    }
    onAdd() {
      this.setSize(this.SIZE, this.SIZE);
      this.setDisplaySize(this.SIZE,this.SIZE);
      console.log("onAdd");
      this.setVelocity(100, 0);
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