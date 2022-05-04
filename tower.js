
import Missile from './missile.js'
import MissileGroup from './missile_group.js'
import Zombie from './zombie.js'
import ZombieGroup from './zombie_group.js'
import Base from './base.js'

const MISSILE = 'missile';
const ZOMBIE = 'zombie';

export default class TowerDefense extends Phaser.Scene {
  constructor() {
    super('missile-demo')
    
    /** @type {Missile} */
    this.missile = null
    this.hearts = 100;
    this.heartsText;
    this.money = 800;
    /** @type {MissleGroup} */    
    this.missileGroup;
    /** @type {ZombieGroup} */
    this.zombieGroup;
    this.inputKeys;

  }

  preload() {
    this.load.image(MISSILE, 'assets/red_rocket.png')
    this.load.image('player', ' assets/zombie.png');
    this.load.image(ZOMBIE, ' assets/zombie.png');
    this.load.image('background', ' assets/background.png');
    this.load.image('shoter_guy', ' assets/shoter_guy.png');
    this.load.image('tank', ' assets/tank.png');
    this.load.image('base', 'assets/base.png');
 
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(
      this.game.config.width, this.game.config.height);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    

    this.shoter_guy = this.physics.add.image(365, this.game.config.height / 1.625,
      'shoter_guy').setScale(0.32, 0.32);

    this.tank = this.physics.add.image(50, this.game.config.height / 1.25,
      'tank').setScale(0.35, 0.35);

    //this.zombie.setCollideWorldBounds(true);
    this.setHearts();
    //this.zombie.on('click', this.bind(zombieLeave, this) );
    const x = this.scale.width * 0.5
    const y = this.scale.height * 0.5

    this.missileGroup = new MissileGroup(this);
    this.zombieGroup = new ZombieGroup(this);
    this.addEvents();
    //scene.scale.toggleFullscreen();
    let self = this;
    //game.time.events.repeat(Phaser.Timer.SECOND, 10, createZombie, this);
    //this.createZombie();
    this.base = new Base(this, 500, 0, 'base');
    this.time.addEvent({ delay: 500, callback: this.createZombie, callbackScope: this, repeat: 100 });
    this.physics.add.collider(this.missileGroup, this.zombieGroup, 
                              function(s1, s2) {                                
                                self.hit(s1, s2);
                              });
      this.physics.world.on('worldbounds', function(b) {
        if (!b || !b.gameObject) {
          return;
        }
        let t = b.gameObject;
        if (t.zombie) {
     
          self.hearts--;
           console.log("die " + self.hearts);
          self.setHearts();
          t.destroy();
        }
    });
  

  }
  hit(missle, zombie) {
    missle.hit(zombie);
    zombie.hit(missle);
    //this.createZombie();
    this.money++;
    this.setHearts();
    // sprite1.setX(0);
    // sprite1.setY(0);
    // sprite1.speed = 5;
    // console.log("hit " + sprite1 + "," + sprite2 + " this "+ this.missle);
    //sprite1.destroy();
    //this.missile = this.add.missile(0, 0, MISSILE);
    //this.missile.setTrackMouse(false);
    //this.missile.setTarget(this.zombie);
  }
  setHearts() {
    if (this.heartsText) {
      this.heartsText.destroy();
    }
  
    this.heartsText = this.add.text(16, 16,
      'hearts: ' + this.hearts + ", money = " + this.money,
      {fontSize: '32px', fill: '#000'});
  }
  addEvents() {
		this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
		];
	}
 
	
  shootMissile() {
    this.missile = this.missileGroup.get(400, 350);    
    this.missile.setTarget(this.zombieGroup)

  }
  createZombie() {
    this.zombie = this.zombieGroup.get(50, this.game.config.height /2.1, true);
    this.zombie.setup();
  }
  update(t, dt) {
	// Loop over all keys
		this.inputKeys.forEach(key => {
			// If key was just pressed down, shoot the laser. We use JustDown to make sure this only fires once.
			if (Phaser.Input.Keyboard.JustDown(key)) {
				this.shootMissile();
			}
		});
 

 //   this.missile.update(dt);
    //this.zombie.update(dt);
  }

  zombieLeave() {
    hearts--;
    setHearts();
    this.zombie.setOrigin(0, 100);

  }
  
}


