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

// let GGG;
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

    this.velocity = this.velocity.add(this.acceleration);
    this.location = this.location.add(this.velocity);
    /*
    if(this.velocity.x>5){
      this.velocity.x=5;
    };
    if(this.velocity.y>5){
      this.velocity.y=5;
    };
    */
    // 在每個Frame的最後，重新設定 acceleration 的值  
    this.acceleration = this.acceleration.multiply(0);
  }
  applyForce(force){
    // this.acceleration = force;
    this.acceleration = this.acceleration.add(force);
  }
  render(){
    stroke(0);
    strokeWeight(8);
    point(this.x, this.y);
    ellipse(this.location.x, this.location.y, 5, 5);
  }
  edge(){
    if(this.location.x>width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if(this.location.y>height){
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1;
    }
  }
}
// p5js main
function setup() {
  createCanvas(800,600);
  lilPoint = new Point();
}

function draw() {
  background(255);
  let f = new Vector(0, 0.1);
  lilPoint.applyForce(f);
  lilPoint.edge();
  lilPoint.update();
  lilPoint.render();
}