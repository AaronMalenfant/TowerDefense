export default class IntroScreen extends Phaser.Scene {
    initialize() {
        //Phaser.Scene.call(this, { "key": "IntroScreen" });
    }
  
    init(data) {
      this.message = data.message || "Welcome to Zombie Defender";
    }
    preload() {}
    create() {
        var text = this.add.text(
            this.game.config.width /2,
           this.game.config.height /2, 
           
            this.message, 
            {
                fontSize: 50,
                color: "#FF0000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
    }
    update() {}
}

