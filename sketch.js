let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
}

function draw() {
  background(220);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 30.0;
    this.maxspeed = 1;
    this.maxforce = 0.1;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    //let steering_force = p5.Vector.random2D()
    //steering_force.setMag(0.1)
    //this.applyForce(steering_force)
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    
    let debug = true;
    if (debug){
      push()
      /*
      line(this.location.x, this.location.y, projPoint.x, projPoint.y);
      noStroke()
      fill(255,0,0);
      circle(projPoint.x, projPoint.y, 8);
      noFill();
      stroke("blue");
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y);
      fill("green")
      circle(wanderPoint.x, wanderPoint.y, 16)
      pop()
      */
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.5, 0.5);
    //this.wanderTheta = this.wanderTheta + random(-0.5, 0.5);
    
    
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    
    //Atas Pala
    fill(255,0,0)
    line(100,48,100,60)
    ellipse(100,48,8,9)

    //Telinga
    fill(255,0,0)
    rect(120,65,5,6)
    rect(73,65,5,6)

    //tangan kiri
    fill(255,255,255)
    line(73,85,35,117)
    line(70,100,45,125)
    ellipse(39,122,10,13)
    ellipse(35,125,10,13)
    ellipse(73,94,15,20)

    //tangan kanan
    fill(255,255,255)
    ellipse(125,94,15,20)
    line(130,100,155,125)
    line(132,90,162,120)
    ellipse(155,120,10,13)
    ellipse(160,123,10,13)

    //Badan
    fill(255,0,0)
    rect(75,90,50,60)
    rect(85,105,30,30)
    rect(90,110,3,3)
    rect(98,110,3,3)
    rect(107,110,3,3)
    ellipse(91,129,4,4)
    ellipse(99,129,4,4)
    ellipse(108,129,4,4)
    ellipse(81,95,4,4)
    ellipse(119,95,4,4)
    ellipse(81,144,4,4)
    ellipse(119,144,4,4)
  
    //Leher
    fill(255,255,255)
    rect(90,80,20,10)

    //Pala
    fill(192,192,192)
    rect(80,60,40,20)

    //mata
    fill(255,255,255)
    rect(90,65,4,4)
    rect(105,65,4,4)

    //hidung
    fill(192,192,192)
    triangle(100,68,95,72,105,72)

    //mulut
    fill(255,255,255)
    arc(99,74,15,5, radians(0), radians(180))

    //Kakik
    rect(84,150,10,20)
    rect(107,150,10,20)

    //Jari
    arc(89,180,20,20,radians(180),radians(360))
    arc(112,180,20,20,radians(180),radians(360))
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}