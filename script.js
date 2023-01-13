// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}


// function to generate random color
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


//Add class definition in order to create multiple balls that act the same
class Ball {

  //Properties of each ball created with Ball Class
  constructor(x, y, velX, velY, color, size){
    //Coordinates where the ball starts
    this.x = x;
    this.y = y;
    //horizontal and veritcal velocity for movement of balls
    this.velX = velX;
    this.velY = velY;
    //each ball gets a color
    this.color = color;
    //ball radius size in pixels
    this.size = size;
  }

  //Methods
  draw() {
    //states that we want to draw a shape on the paper
    ctx.beginPath();
    //defines what color we want the shape to be
    ctx.fillStyle = this.color;
    //x and y are the arc's center. radius of arc is ball size.
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    //finsihes drawing the path and wills the area with earlier specified color
    ctx.fill();
  }

  //function that updates the ball to move its position
  update(){

      //if the x is greater than the width of canvas, ball goes off the right edge
      if((this.x + this.size) >= width){
        this.velX = -(this.velX)
      }
      //if the x is smaller than 0, ball is going off the left edge
      if ((this.x - this.size) <= 0){
        this.velX = -(this.velX);
      }
      //if the y is greater than the height of canvas, ball is going off the bottom edge
      if ((this.y + this.size) >= height){
        this.velY = -(this.velY);
      }
      //if y is smaller than 0, ball is going off top edge
      if ((this.y - this.size) <= 0){
        this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
  }

  /* COLLISION DETECTION */
  //checks to see if every other ball has collided with the current ball
    collisionDetect(){
      //loops through the balls in the balls[] array
      for (const ball of balls){

        // if statement checks if current ball is the same ball as the one being checked. 
        if(this !== ball){
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx *  dx + dy * dy);

          if(distance < this.size + ball.size){
            ball.color = this.color = randomRGB();
          }
        }
      }
    }

}

//Animating the ball

//somewhere to store the balls
const balls = [];
//creates new instances of Ball() using random values until 25 balls are created and pushed into balls array
while (balls.length < 25 ){
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width away from the edge of the canvase, to avoid drawing errors
      random( 0 + size, width - size), 
      random(0 + size, height - size),
      random(-7, 7),
      random(-7, 7),
      randomRGB(),
      size
  );
  balls.push(ball);
}


// animation loop serves to update the information in the program and them render the resulting view on each frame of the animation
function loop(){

  // sets the canvas fill color to semi-transparent black
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  // draws a rectangle of the color across the whole width and height of the canvas
  ctx.fillRect(0, 0, width, height); // first two parameters are start coordinates. serves to cover up previous frame's drawing before next one is drawn

  for(const ball of balls){
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();