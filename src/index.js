
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
 
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

new Phaser.Game(config);

let bird;
let pipes = null;
const velocity = 300;
let flapVelocity = 300;


let pipeHorizontalDistance = 400;
let pipeVerticalPosition = Phaser.Math.Between(-10, -120)
let pipeVerticalPositionlowerPipe = Phaser.Math.Between(380, 500)
const pipeHorizontalDistanceRange = [500, 600]

const PIPES_TO_RENDER = 4;

//Pipes:
let upperPipe1;
let lowerPipe1;
let upperPipe2 = null;
let lowerPipe2 = null;



function preload () {
  this.load.image('sky', '../assets/sky.png');
  this.load.image('bird', '../assets/bird.png');
  this.load.image('pipe', '../assets/pipe-green.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0,0);

  bird = this.physics.add.sprite(config.width/10, config.height/2, 'bird').setOrigin(0);
  bird.body.gravity.y = 400;

  pipes = this.physics.add.group();
  upperPipe1 = pipes.create(pipeHorizontalDistance, pipeVerticalPosition, 'pipe').setOrigin(0.1);
  upperPipe1.flipY = true;
 
  lowerPipe1 = pipes.create(upperPipe1.x, pipeVerticalPositionlowerPipe, 'pipe').setOrigin(0.1);
  upperPipe2 = pipes.create(pipeHorizontalDistance*2, pipeVerticalPosition, 'pipe').setOrigin(0.1);
  upperPipe2.flipY = true;
  lowerPipe2 = pipes.create(upperPipe2.x, pipeVerticalPositionlowerPipe, 'pipe').setOrigin(0.1);
 
 
  


  this.input.on('pointerdown', flap)
  this.input.keyboard.on('keydown_SPACE', flap)

}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}


//60fps
function update() {
    if(bird.y < -30 || bird.y > config.height) {
        restartBirdPosition();
    }

    upperPipe1.setVelocityX(-200);
    if(upperPipe1.x < -30) {
      resetUpperPipe(upperPipe1);
    }
    upperPipe2.setVelocityX(-200);
  
    if(upperPipe2.x < -30) {
      resetUpperPipe(upperPipe2);
    }
    

    lowerPipe1.setVelocityX(-200);
    if(lowerPipe1.x < -30) {
      resetLowerPipe(lowerPipe1);
    }
    lowerPipe2.setVelocityX(-200);

    if(lowerPipe2.x < -30) {
      resetLowerPipe(lowerPipe2);
    }
   
}

function resetUpperPipe(pipe) {
   pipe.y = Phaser.Math.Between(-10, -120);
   pipe.x = 810;
}

function resetLowerPipe(pipe) {
  pipe.y = Phaser.Math.Between(355, 520)
  pipe.x = 810;
}







function restartBirdPosition() {
  bird.x = config.width/10;
  bird.y = config.height/2;
}
