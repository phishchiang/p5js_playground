// let ctx = document.querySelector('#cvs').getContext('2d');
let canvas;
let mouseV;
let mouseDown = false;

window.addEventListener('load', function(){
  canvas =  this.document.querySelector('#defaultCanvas0');
  console.log(canvas);
  canvas.addEventListener('mousemove',function(e){
    // console.log(e.offsetX, e.offsetY);
    sentMousePo(e.offsetX, e.offsetY);
  });
  canvas.addEventListener('mousedown',function(){
    mouseDown = true;
  });
  canvas.addEventListener('mouseup',function(){
    mouseDown = false;
  });
});

function sentMousePo(x, y){
  mouseV = new Vector(x, y);
  // console.log(mouseV);
}

// let GGG;
let lilPoint;
class Point{
  constructor(){
    this.location = new Vector(Math.random()*width, height/2);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.mass = Math.random()*5+1;
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
    // 不能是把全部的Frame的力量都考慮進去，
    // 應該是只有當下的Frame (only thatparticular moment in time)
    this.acceleration = this.acceleration.multiply(0);
  }
  applyForce(force){
    // this.acceleration = force;
    this.tempForce = new Vector();
    this.tempForce = force.divide(this.mass);
    this.acceleration = this.acceleration.add(this.tempForce);
  }
  render(){
    stroke(0);
    strokeWeight(8);
    point(this.x, this.y);
    ellipse(this.location.x, this.location.y, this.mass*20, this.mass*20);
  }
  edge(){
    if(this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if(this.location.x < 0){
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if(this.location.y > height){
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1;
    }
    if(this.location.y < 0){
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
  }
}
// p5js main
function setup() {
  createCanvas(800,600);
  // lilPoint = new Point();
  lilPoint = [];
  for(let i =0; i<=5; i++){
    lilPoint[i] = new Point();
  }
}

function draw() {
  background(255);
  for(let i of lilPoint){
    let gravity = new Vector(0, 0.1);
    // Hacky Way去模擬引力不受質量影響
    // F = (m1 * m2 * G)/ d * d
    // F = C * m2
    gravity = gravity.multiply(i.mass);
    i.applyForce(gravity);
    let wind = new Vector(0.1, 0);
    if(mouseDown){
      i.applyForce(wind);
    }
    i.edge();
    i.update();
    i.render();
  }
}