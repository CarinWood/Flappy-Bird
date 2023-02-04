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

                this.score = 0;
                this.scoreText = '';


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
            this.bird.body.gravity.y = 600;

            this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, {fontSize: '22px'});
            this.scoreText.depth = 1;
       
           

            //Render all pipes:
            this.pipes = this.physics.add.group();
            this.upperPipe1 = this.pipes.create(this.pipeHorizontalDistance, this.pipeVerticalPosition, 'pipe')
            .setImmovable(true)
            .setOrigin(0.1);
            this.upperPipe1.flipY = true;
            this.lowerPipe1 = this.pipes.create(this.upperPipe1.x, this.yPositionLowerPipe, 'pipe')
            .setImmovable(true)
            .setOrigin(0.1);
            this.upperPipe2 = this.pipes.create(this.pipeHorizontalDistance*2, this.pipeVerticalPosition, 'pipe')
            .setImmovable(true)
            .setOrigin(0.1);
            this.upperPipe2.flipY = true;
            this.lowerPipe2 = this.pipes.create(800, this.yPositionLowerPipe, 'pipe')
            .setImmovable(true)
            .setOrigin(0.1);
 
            //user input events:
            this.input.on('pointerdown', this.flap, this)
            this.input.keyboard.on('keydown_SPACE', this.flap, this)

            this.createColliders();
  

        }

        flap() {
            console.log("You pressed the mouse")
            this.bird.body.velocity.y = -310;
          }

       

        update() {
            if(this.bird.y < -30 || this.bird.y > 600) {
                this.gameOver();
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

        gameOver() {
            this.physics.pause();

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.restart();
                },
                loop: false,
            })
          }

     

        resetUpperPipe(pipe) {
            pipe.y = Phaser.Math.Between(-10, -120);
            pipe.x = 810;
            this.increaseScore();
         }
         
         resetLowerPipe(pipe) {
           pipe.y = Phaser.Math.Between(355, 520)
           pipe.x = 810;

         }

         createColliders() {
            this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
         }

         increaseScore() {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
         }

}

export default PlayScene;