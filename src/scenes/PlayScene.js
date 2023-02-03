import Phaser from 'phaser'

class PlayScene extends Phaser.Scene {
            constructor(config) {
                super('PlayScene');
                this.config = config;
                this.bird = null;

                this.pipes = null;
                this.upperPipe1 = null;
                this.lowerPipe1 = null;
                this.upperPipe2 = null;
                this.lowerPipe2 = null;
                this.input;

                this.pipeHorizontalDistance = 400;
                this.pipeVerticalPosition = Phaser.Math.Between(-10, -120);
                this.yPositionLowerPipe = Phaser.Math.Between(355, 520);
                this.flapVelocity = 300;


            }

        preload() {
            this.load.image('sky', '../assets/sky.png');
            this.load.image('bird', '../assets/bird.png');
            this.load.image('pipe', '../assets/pipe-green.png');

        }

        create() {
            this.add.image(0, 0, 'sky').setOrigin(0,0);
            
            //Render the bird
            this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
            this.bird.body.gravity.y = 400;

            //Render all pipes:
            this.pipes = this.physics.add.group();
            this.upperPipe1 = this.pipes.create(this.pipeHorizontalDistance, this.pipeVerticalPosition, 'pipe').setOrigin(0.1);
            this.upperPipe1.flipY = true;
            this.lowerPipe1 = this.pipes.create(this.upperPipe1.x, this.yPositionLowerPipe, 'pipe').setOrigin(0.1);
            this.upperPipe2 = this.pipes.create(this.pipeHorizontalDistance*2, this.pipeVerticalPosition, 'pipe').setOrigin(0.1);
            this.upperPipe2.flipY = true;
            this.lowerPipe2 = this.pipes.create(800, this.yPositionLowerPipe, 'pipe').setOrigin(0.1);
 
            //user input events:
            this.input.on('pointerdown', this.flap, this)
            this.input.keyboard.on('keydown_SPACE', this.flap, this)
  

        }

        flap() {
            console.log("You pressed the mouse")
            this.bird.body.velocity.y = -300;
          }

       

        update() {
            if(this.bird.y < -30 || this.bird.y > 600) {
                this.restartBirdPosition();
            }

            this.upperPipe1.setVelocityX(-200);

            if(this.upperPipe1.x < -30) {
                this.resetUpperPipe(this.upperPipe1);
            }

            this.upperPipe2.setVelocityX(-200);
  
            if(this.upperPipe2.x < -30) {
              this.resetUpperPipe(this.upperPipe2);
            }

            this.lowerPipe1.setVelocityX(-200);
            if(this.lowerPipe1.x < -30) {
              this.resetLowerPipe(this.lowerPipe1);
            }

               
            this.lowerPipe2.setVelocityX(-200);

            if(this.lowerPipe2.x < -30) {
               this.resetLowerPipe(this.lowerPipe2);
            }

        }

        restartBirdPosition() {
            this.bird.x = 80;
            this.bird.y = 300;
          }

     

        resetUpperPipe(pipe) {
            pipe.y = Phaser.Math.Between(-10, -120);
            pipe.x = 810;
         }
         
         resetLowerPipe(pipe) {
           pipe.y = Phaser.Math.Between(355, 520)
           pipe.x = 810;
         }
}

export default PlayScene;