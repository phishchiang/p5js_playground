
console.log('hello webpack!');

let littlGuy;

class Point{
  constructor(){
    this.x = width/2;
    this.y = height/2;
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
  render(){
    stroke(0);
    point(this.x, this.y);
  }
}

function setup() {
  createCanvas(800,600);
  littlGuy = new Point();
}

function draw() {
  // ellipse(50, 50, 80, 80);
  littlGuy.step();
  littlGuy.render();
}

/*
function setup() {

}

function draw() {

}
*/