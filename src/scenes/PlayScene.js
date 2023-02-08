import Phaser from 'phaser'
let bestScore


class PlayScene extends Phaser.Scene {
            constructor(config) {
                super('PlayScene');
                this.config = config;
                this.bird = null;

                this.grounds;
                this.ground1;
                this.ground2;
                this.ground3;

                this.pipes = null;
                this.upperPipe1 = null;
                this.lowerPipe1 = null;
                this.upperPipe2 = null;
                this.lowerPipe2 = null;
                this.input;

                this.pipeHorizontalDistance = 400;
                this.pipeVerticalPosition = Phaser.Math.Between(-119, -10);
                this.yPositionLowerPipe = Phaser.Math.Between(355, 500);
                this.flapVelocity = 300;
                this.currentDifficulty;

                this.score = 0;
                this.scoreText = '';

                this.initialTime;
                this.countDownText;
                this.timedEvent;


            }

        preload() {
            this.load.image('sky', '../assets/sky.png');
            this.load.image('ground', '../../assets/base.png');
            this.load.image('pipe', '../assets/pipe-green.png');
            this.load.image('back', '../../assets/back.png')
            this.load.atlas('bird', '../../assets/ybird.png', '../../assets/ybird.json')

        }

        create() {
            this.add.image(0, 0, 'sky').setOrigin(0,0);

            this.grounds = this.physics.add.staticGroup();
            this.ground1 = this.grounds.create(165, 553, 'ground').setScale(1);
            this.ground2 = this.grounds.create(500, 553, 'ground').setScale(1);
            this.ground3 = this.grounds.create(815, 553, 'ground').setScale(1);


             this.ground1.depth = 1;
             this.ground2.depth = 1;
             this.ground3.depth = 1;
           

            this.listenToEvents();
            

            //Render the bird
            this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setScale(1.5);
            this.bird.body.gravity.y = 660;

            this.anims.create({
                key: 'fly',
                frames: this.anims.generateFrameNames('bird', {prefix: 'ybird', end: 3, zeroPad: 3}),
                frameRate: 17,
                repeat: -1,
              })

            this.bird.anims.play('fly');

            this.scoreText = this.add.text(55, 20, 'Score: ' + this.score, {fontSize: '22px'});
            this.scoreText.depth = 1;
       
             let returnBtn = this.add.image(28, 30, 'back')
             .setInteractive()
             .setScale(1.18);

             returnBtn.depth = 1;

             returnBtn.on("pointerdown", () => {
                this.physics.pause();
                this.scene.stop();
                this.scene.start('MenuScene')
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
  

        }

        flap() {
            this.bird.body.velocity.y = -220;
          }

       

        update() {
            if(this.bird.y < -30 || this.bird.y > 600) {
                this.gameOver();
            }


            if (this.currentDifficulty === 'easy') {
                this.upperPipe1.setVelocityX(-200);
                this.upperPipe2.setVelocityX(-200);
                this.lowerPipe1.setVelocityX(-200);
                this.lowerPipe2.setVelocityX(-200);
            }
            else if (this.currentDifficulty === 'normal') {
                this.upperPipe1.setVelocityX(-300);
                this.upperPipe2.setVelocityX(-300);
                this.lowerPipe1.setVelocityX(-300);
                this.lowerPipe2.setVelocityX(-300);
            } 
            else if (this.currentDifficulty === 'hard') {
                this.upperPipe1.setVelocityX(-400);
                this.upperPipe2.setVelocityX(-400);
                this.lowerPipe1.setVelocityX(-400);
                this.lowerPipe2.setVelocityX(-400);
            }
            else if (this.currentDifficulty == 'extraHard') {
                this.upperPipe1.setVelocityX(-500);
                this.upperPipe2.setVelocityX(-500);
                this.lowerPipe1.setVelocityX(-500);
                this.lowerPipe2.setVelocityX(-500);
            }

               


            if(this.upperPipe1.x < -30) {
                this.resetUpperPipe(this.upperPipe1);
            }


  
            if(this.upperPipe2.x < -30) {
              this.resetUpperPipe(this.upperPipe2);
            }

       
            if(this.lowerPipe1.x < -30) {
              this.resetLowerPipe(this.lowerPipe1);
            }

               
            

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
            this.bird.anims.stop("fly");
            
            bestScore = localStorage.getItem('bestScore')
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
            pipe.y = Phaser.Math.Between(-110, -10);
            pipe.x = 810;
            this.increaseScore();
         }
         
         resetLowerPipe(pipe) {
           pipe.y = Phaser.Math.Between(355, 500)
           pipe.x = 810;

         }

         createColliders() {
            this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
            this.physics.add.collider(this.bird, this.grounds, this.gameOver, null, this);
         }

         increaseScore() {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
            this.increaseDifficulty();
         }

         increaseDifficulty() {
            if(this.score === 10) {
                this.currentDifficulty = 'normal';
            } else if (this.score === 20) {
                this.currentDifficulty = 'hard';
            } else if (this.score === 30) {
                this.currentDifficulty = 'extraHard'
            }
         }

}

export default PlayScene;