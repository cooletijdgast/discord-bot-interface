import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-dvd-bounce',
  templateUrl: './dvd-bounce.component.html',
  styleUrls: ['./dvd-bounce.component.css'],
})
@View({
  template: `<canvas #dvdCanvas
   [attr.width]='_size'
   [attr.height]='_size'></canvas>`,
})
export class DvdBounceComponent{
  private _size: number;

  // get the element with the #chessCanvas on it
  @ViewChild('dvdCanvas') dvdCanvas: ElementRef;

  constructor() {
    this._size = 150;
  }

  ngAfterViewInit() {
    // wait for the view to init before using the element

    let context: CanvasRenderingContext2D =
      this.dvdCanvas.nativeElement.getContext('2d');
    // happy drawing from here on
    context.fillStyle = 'blue';
    context.fillRect(10, 10, 150, 150);
  }

  private speed = 20;
  private scale = 0.17; // Image scale (I work on 1080p monitor)
  private logoColor: string = '';

  private dvd = {
    x: 200,
    y: 300,
    xspeed: 10,
    yspeed: 10,
    img: new Image(),
  };

  public init_screen() {
    this.dvd.img.src = './dvd-logo.png';

    //Draw the "tv screen"
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.pickColor();
    this.update();
  }

  public update() {
    setTimeout(() => {
      //Draw the canvas background
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      //Draw DVD Logo and his background
      this.ctx.fillStyle = this.logoColor;
      this.ctx.fillRect(
        this.dvd.x,
        this.dvd.y,
        this.dvd.img.width * this.scale,
        this.dvd.img.height * this.scale
      );
      this.ctx.drawImage(
        this.dvd.img,
        this.dvd.x,
        this.dvd.y,
        this.dvd.img.width * this.scale,
        this.dvd.img.height * this.scale
      );
      //Move the logo
      this.dvd.x += this.dvd.xspeed;
      this.dvd.y += this.dvd.yspeed;
      //Check for collision
      this.checkHitBox();
      this.update();
    }, this.speed);
  }

  //Check for border collision
  public checkHitBox() {
    if (
      this.dvd.x + this.dvd.img.width * this.scale >= this.canvas.width ||
      this.dvd.x <= 0
    ) {
      this.dvd.xspeed *= -1;
      this.pickColor();
    }

    if (
      this.dvd.y + this.dvd.img.height * this.scale >= this.canvas.height ||
      this.dvd.y <= 0
    ) {
      this.dvd.yspeed *= -1;
      this.pickColor();
    }
  }

  //Pick a random color in RGB format
  public pickColor() {
    let r = Math.random() * (254 - 0) + 0;
    let g = Math.random() * (254 - 0) + 0;
    let b = Math.random() * (254 - 0) + 0;

    this.logoColor = 'rgb(' + r + ',' + g + ', ' + b + ')';
  }
}
function View(arg0: {
  template: string;
}): (target: typeof DvdBounceComponent) => void | typeof DvdBounceComponent {
  throw new Error('Function not implemented.');
}

function ViewChild(
  arg0: string
): (target: DvdBounceComponent, propertyKey: 'chessCanvas') => void {
  throw new Error('Function not implemented.');
}
