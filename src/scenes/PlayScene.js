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
                this.pipeVerticalPosition = Phaser.Math.Between(-3, -110);
                this.pipeVerticalDistanceRange = [150, 200]
                this.yPositionLowerPipe = Phaser.Math.Between(355, 520);
                this.flapVelocity = 300;

                this.score = 0;
                this.scoreText = '';

                this.initialTime;
                this.countDownText;
                this.timedEvent;


            }

        preload() {
            this.load.image('sky', '../assets/sky.png');
            this.load.image('pipe', '../assets/pipe-green.png');
            this.load.image('pause', '../assets/pause.png')
            this.load.atlas('bird', '../../assets/redbirdsheet.png', '../../assets/redbirdsheet.json')

        }

        create() {
            this.add.image(0, 0, 'sky').setOrigin(0,0);
            this.listenToEvents();
            

            //Render the bird
            this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setScale(0.09);
            this.bird.body.gravity.y = 600;

            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNames('bird', {prefix: 'fly', end: 2, zeroPad: 3}),
                frameRate: 17,
                repeat: -1,
              })

              this.bird.anims.play('fly');

            this.scoreText = this.add.text(20, 20, 'Score: ' + this.score, {fontSize: '22px'});
            this.scoreText.depth = 1;
       
             let pauseBtn = this.add.image(790, 590, 'pause')
             .setInteractive()
             .setScale(1.8)
             .setOrigin(1);

             pauseBtn.depth = 2;

             pauseBtn.on("pointerdown", () => {
                this.physics.pause();
                this.scene.pause();
                this.scene.launch('PauseScene')
             })
           

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

            this.currentDifficulty = 'easy';
            this.difficulties = {
                'easy': {
                    pipeHorizontalDistance: [300, 350],
                    pipeVerticalDistanceRange: [150, 200],
                  
                },

                'normal': {
                    pipeHorizontalDistance: [300, 350],
                    pipeVerticalDistanceRange: [140, 190],  
                },

                'difficult': {
                    pipeHorizontalDistance: [250, 310],
                    pipeVerticalDistanceRange: [120, 170],
                },
            }
  

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

        listenToEvents() {
            this.events.on('resume', () => {
                this.initialTime = 3
                this.countDownText = this.add.text(200, 300, 'Fly in: ' + this.initialTime).setOrigin(0.5, 1);
                
                 this.timedEvent = this.time.addEvent({
                     delay: 1000,
                     callback: this.countDown,
                     callbackScope: this,
                     loop: true 
                 })
            })

        }

        countDown() {
            this.initialTime--;
            this.countDownText.setText('Fly in: ' + this.initialTime);
            if(this.initialTime === 0 ) {
                this.countDownText.setText('');
                this.physics.resume();
                this.timedEvent.remove();
            }
        }

        gameOver() {
            this.physics.pause();
            
            let bestScore = localStorage.getItem('bestScore')
            if(!bestScore ||this.score > bestScore) {
                localStorage.setItem('bestScore', this.score)
            }

            this.score = 0;

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.restart();
                },
                loop: false,
            })
          }

     

        resetUpperPipe(pipe) {
            pipe.y = this.pipeVerticalPosition;
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