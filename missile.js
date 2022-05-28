export default class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, targetGroup) {
    super(scene, x, y, 'missile');
    this.SIZE = 10;
    //this.setSize(10, 10);

    const tx = scene.scale.width * 0.5
    const ty = scene.scale.height * 0.5

    this.targetGroup = targetGroup;// || new Phaser.Math.Vector2(tx, ty)

    this.turnDegreesPerFrame = 20
    this.speed = 750

    this.setActive(true);
    this.setVisible(true);
    this.damage = 1;
  }
  onAdd() {
    this.setSize(this.SIZE, this.SIZE);
    this.setDisplaySize(this.SIZE, this.SIZE);
  }
  setTarget(targetGroup) {
    this.targetGroup = targetGroup;
  }
  preUpdate(time, delta) {
    if (this.targetGroup.getLength() == 0) {
      this.destroy();
      return;
    }
    super.preUpdate(time, delta);

    if (!this.targetGroup || this.targetGroup.getChildren().length == 0) {

      return;
    }

    const target = this.targetGroup.getChildren()[0];

    const targetAngle = Phaser.Math.Angle.Between(
      this.x, this.y,
      target.x, target.y
    )

    // clamp to -PI to PI for smarter turning
    let diff = Phaser.Math.Angle.Wrap(targetAngle - this.rotation)

    // set to targetAngle if less than turnDegreesPerFrame
    if (Math.abs(diff) < Phaser.Math.DegToRad(this.turnDegreesPerFrame)) {
      this.rotation = targetAngle;
    } else {
      let angle = this.angle
      if (diff > 0) {
        // turn clockwise
        angle += this.turnDegreesPerFrame
      } else {
        // turn counter-clockwise
        angle -= this.turnDegreesPerFrame
      }

      this.setAngle(angle)
    }

    // move missile in direction facing
    const vx = Math.cos(this.rotation) * this.speed
    const vy = Math.sin(this.rotation) * this.speed

    this.body.velocity.x = vx
    this.body.velocity.y = vy
  }
  hit(zombie) {
    this.destroy();
  }

  update(dt) {


  }
}
