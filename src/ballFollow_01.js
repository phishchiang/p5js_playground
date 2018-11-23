// let ctx = document.querySelector('#cvs').getContext('2d');
let canvas;
let mouseV;
window.addEventListener('load', function(){
  canvas =  this.document.querySelector('#defaultCanvas0');
  console.log(canvas);
  canvas.addEventListener('mousemove',function(e){
    // console.log(e.offsetX, e.offsetY);
    sentMousePo(e.offsetX, e.offsetY);
  })
});

function sentMousePo(x, y){
  mouseV = new Vector(x, y);
  // console.log(mouseV);
}

let GGG;
let lilPoint;
class Point{
  constructor(){
    this.location = new Vector(width/2, height/2);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
  }
  step(){
    let seed = Math.random();
    if(seed>0.75){
      this.x+=1;
    }else if(seed>0.5){
      this.x-=1;
    }else if(seed>0.25){
      this.y+=1;
    }else{
      this.y-=1;
    }
  }
  update(){
    if(mouseV){
      this.acceleration = mouseV.subtract(this.location).unit().multiply(2);
      // console.log(GGG );
    }
    

    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);

    if(this.velocity.x>5){
      this.velocity.x=5;
    };
    if(this.velocity.y>5){
      this.velocity.y=5;
    };
  }
  render(){
    stroke(0);
    strokeWeight(8);
    point(this.x, this.y);
    ellipse(this.location.x, this.location.y, 5, 5);
  }
}

function setup() {
  createCanvas(800,600);
  lilPoint = new Point();
}

function draw() {
  background(255);
  lilPoint.update();
  lilPoint.render();
}