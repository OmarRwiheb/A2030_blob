export default class Background {
  constructor(ctx, width, height, speed, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.scaleRatio = scaleRatio;

    this.x = this.canvas.width;
    this.y = this.canvas.height - this.height;

    this.backgroundImage = new Image();
    this.backgroundImage.src = "game_white/images/background_white.png";
  }

  update(gameSpeed, frameTimeDelta) {
    this.x -= gameSpeed * frameTimeDelta * this.speed * this.scaleRatio;
  }

  draw() {
    this.ctx.drawImage(
      this.backgroundImage,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.ctx.drawImage(
      this.backgroundImage,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    if (this.x < -(this.width+this.canvas.width)) {
      console.log("first bp");
      this.x = -this.canvas.width;
    }
  }

  reset() {
    console.log("reset bp");
    this.x = this.canvas.width;
  }
}
