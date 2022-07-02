import Missile from './missile.js'
import MissileGroup from './missile_group.js'
import Zombie from './zombie.js'
import ZombieGroup from './zombie_group.js'
import TowerGroup from './tower_group.js'
import Base from './base.js'





const MISSILE = 'missile';
const ZOMBIE = 'zombie';
const SHOTER = {
      currentImage:'shoter_guy',
      strength: 1,
      speed: 500,
      heatSeeking: false,
      missleSize: 1,
      missleSpeed: 750,
      damage: 1,
      cost: 200,
    };
const TANK = {
    currentImage: 'tank',
    strength: 5,
    speed: 1000,
    heatSeeking: true,
    missleSize: 3,
    missleSpeed: 2000,
    damage: 5,
    cost:250,
};
const MACHINE_GUN = {
    currentImage: 'brrrrrrrrrrr',
    strength: 1,
    speed: 100,
    heatSeeking: false,
    missleSize: 1,
    missleSpeed: 1000,
    damage: 1,
    cost:1000
};

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
    this.level = 3;
    this.zombieTimer;
    this.selectedBox;

  }

  preload() {
    this.load.image(MISSILE, 'assets/red_rocket.png')
    this.load.image('player', ' assets/zombie.png');
    this.load.image(ZOMBIE, ' assets/zombie.png');
    this.load.image('background', ' assets/background.png');
    this.load.image('shoter_guy', ' assets/shoter_guy.png');
    this.load.image('tank', ' assets/pixel-tank_b.png');
    this.load.image('base', 'assets/base.png');
    this.load.image('start', 'assets/start.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('brrrrrrrrrrr', 'assets/brrrrrrrrrrr.png');
  }

  create() {

    this.background = this.add.image(0, 0, 'background')
        .setInteractive().setOrigin(0, 0).setDisplaySize(
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
      'shoter_guy').setDisplaySize(100, 100).setInteractive()
      .on('pointerup', this.selectShoter, this);

    this.tank = this.physics.add.image(925, this.game.config.height / 3,
      'tank').setDisplaySize(100, 100).setInteractive()
     .on('pointerup', this.selectTank, this);


    this.wall = this.physics.add.image(925, this.game.config.height / 2,
      'wall').setDisplaySize(100, 100).setInteractive();

    this.brrrrrrrrrrr = this.physics.add.image(925, this.game.config.height / 1.5,
      'brrrrrrrrrrr').setDisplaySize(100, 100).setInteractive()
    .on('pointerup', function() {
      this.selectedIcon = this.brrrrrrrrrrr; 
      this.tower = MACHINE_GUN;
    }, this)

    this.selectShoter();
    
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
        self.zombieEat(t);
      }
    });
    this.background.on('pointerup', function (pointer) {
      this.createShooter(pointer.x, pointer.y);
      //this.gameOver();
    }, this);

  }
  selectShoter() {
    this.selectedIcon = this.shoter_guy;
    this.currentImage = 'shoter_guy';
    this.strength = 1;
    this.speed = 500;
    this.heatSeeking = false;
    this.missleSize = 1;
    this.tower = SHOTER
  }
  selectTank() {
    this.selectedIcon = this.tank;
    this.currentImage = 'tank';
    this.strength = 5;
    this.speed = 2000;    
    this.heatSeeking = true;
    this.missleSize = 4;
    this.tower = TANK;
  }
  zombieEat(zombie) {
      this.cameras.main.shake(100);
      this.hearts--;
 //this.hearts-=100;
      this.updateText();
      zombie.destroy();
      if (this.hearts < 0) {
        this.gameOver();
      }
  }
  gameOver() {
    this.cameras.main.shake(1000);
    let self = this;
    
      debugger;
      this.scene.start("IntroScreen",{ 
          "message": "Game Over"
      });
  
  }
  startGame() {
    if (this.zombieGroup) {      
      console.log(this.zombieGroup.getLength());      
      if (this.zombieGroup.getLength() > 0) {      
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
    this.money += this.level * 25;
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
    let shooterCost = this.tower.cost;
    if (this.money >= shooterCost) {
      this.money -= shooterCost;
      let shooter = this.towerGroup.get(x, y, this.tower.currentImage).setInteractive();
      shooter.setup(this.tower, this.missileGroup, this.zombieGroup, this.strength, this.speed, this.heatSeeking, this.missleSize);
      this.updateText();
    }
    // this.missile = this.missileGroup.get(400, 350);    
    // this.missile.setTarget(this.zombieGroup);
    // this.missile.onAdd();

  }
  createZombie() {
    const border = 50;
    this.zombie = this.zombieGroup.get(50, border + (this.game.config.height - 2 * border) * Math.random(), true);
    this.zombie.setup(1 + (this.level / 5));
  }
  update(t, dt) {

    //   this.missile.update(dt);
    //this.zombie.update(dt);
  }

}