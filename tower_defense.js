
import Missile from './missile.js'
import MissileGroup from './missile_group.js'
import Zombie from './zombie.js'
import ZombieGroup from './zombie_group.js'
import TowerGroup from './tower_group.js'
import Base from './base.js'

const MISSILE = 'missile';
const ZOMBIE = 'zombie';

export default class TowerDefense extends Phaser.Scene {
  constructor() {
    super('missile-demo')

    /** @type {Missile} */
    this.missile = null
    this.hearts = 150;
    this.heartsText;
    this.money = 850;
    /** @type {MissleGroup} */
    this.missileGroup;
    /** @type {ZombieGroup} */
    this.zombieGroup;
    this.inputKeys;
    this.startButton;
    this.started = false;
    this.background;
    this.level = 0;
    this.zombieTimer;

  }

  preload() {
    this.load.image(MISSILE, 'assets/red_rocket.png')
    this.load.image('player', ' assets/zombie.png');
    this.load.image(ZOMBIE, ' assets/zombie.png');
    this.load.image('background', ' assets/background.png');
    this.load.image('shoter_guy', ' assets/shoter_guy.png');
    this.load.image('tank', ' assets/tank.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('start', 'assets/start.png');

  }

  create() {

    this.background = this.add.image(0, 0, 'background').setInteractive().setOrigin(0, 0).setDisplaySize(
      this.game.config.width, this.game.config.height);
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    this.startButton = this.add.image(660, 550, 'start', { fill: '#0f0' })
      .setScale(0.2, 0.2)
      .setInteractive()
      .on('pointerup', this.startGame, this);

    this.shoter_guy = this.physics.add.image(925, this.game.config.height / 6,
      'shoter_guy').setScale(0.32, 0.32).setInteractive();

    this.tank = this.physics.add.image(925, this.game.config.height / 2,
      'tank').setScale(0.2, 0.2).setInteractive();

    //this.zombie.setCollideWorldBounds(true);
    this.updateText();
    //this.zombie.on('click', this.bind(zombieLeave, this) );
    const x = this.scale.width * 0.5
    const y = this.scale.height * 0.5

    this.missileGroup = new MissileGroup(this);
    this.zombieGroup = new ZombieGroup(this);
    this.towerGroup = new TowerGroup(this);
    this.addEvents();
    //scene.scale.toggleFullscreen();
    let self = this;
    //game.time.events.repeat(Phaser.Timer.SECOND, 10, createZombie, this);
    //this.createZombie();
    this.base = new Base(this, 500, 0, 'base');
    this.physics.add.collider(this.missileGroup, this.zombieGroup,
      function (s1, s2) {
        self.hit(s1, s2);
      });
    this.physics.world.on('worldbounds', function (b) {
      if (!b || !b.gameObject) {
        return;
      }
      let t = b.gameObject;
      if (t.zombie) {

        self.hearts--;

        self.updateText();
        t.destroy();
      }
    });
    this.background.on('pointerup', function (pointer) {
      this.createShooter(pointer.x, pointer.y);
    }, this);

  }
  startGame() {
    if (this.zombieGroup) {      
      console.log(this.zombieGroup.getLength());      
      if (this.zombieGroup.getLength() > 0) {
        console.log("there are still zombies on the screen!");
        return;
      }
    }
    if (this.zombieTimer) {     
      let progress = this.zombieTimer.getOverallProgress();
      console.log(progress);
      if (progress <  1) {
        console.log("Preview timer is still running");
        return;
      }
    }
    this.level++;
    this.updateText();
    this.zombieTimer = this.time.addEvent({ 
      delay: 1250 / this.level, 
      callback: this.createZombie, 
      callbackScope: this, 
      repeat: this.level * 10 
    });
    this.started = true;
  }
  hit(missle, zombie) {
    missle.hit(zombie);
    zombie.hit(missle);
    //this.createZombie();
    this.money++;
    this.updateText();
    // sprite1.setX(0);
    // sprite1.setY(0);
    // sprite1.speed = 5;
    // console.log("hit " + sprite1 + "," + sprite2 + " this "+ this.missle);
    //sprite1.destroy();
    //this.missile = this.add.missile(0, 0, MISSILE);
    //this.missile.setTrackMouse(false);
    //this.missile.setTarget(this.zombie);
  }
  updateText() {
    if (this.heartsText) {
      this.heartsText.destroy();
    }

    this.heartsText = this.add.text(16, 16,
      'hearts: ' + this.hearts + ", money = " + this.money + ", level = " + this.level,
      { fontSize: '32px', fill: '#000' });
  }
  addEvents() {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }


  createShooter(x, y) {
    //let shooter = this.towerGroup.get(this.game.config.width * Math.random(),this.game.config.height * Math.random());
    let shooterCost = 200;
    if (this.money >= shooterCost) {
      this.money -= shooterCost;
      let shooter = this.towerGroup.get(x, y).setInteractive();
      shooter.setup(this.missileGroup, this.zombieGroup);
      this.updateText();
    }
    // this.missile = this.missileGroup.get(400, 350);    
    // this.missile.setTarget(this.zombieGroup);
    // this.missile.onAdd();

  }
  createZombie() {
    this.zombie = this.zombieGroup.get(50, this.game.config.height * Math.random(), true);
    this.zombie.setup(1 + (this.level / 5));
  }
  update(t, dt) {

    //   this.missile.update(dt);
    //this.zombie.update(dt);
  }

  zombieLeave() {
    hearts--;
    this.updateText();
    this.zombie.setOrigin(0, 100);

  }

}



