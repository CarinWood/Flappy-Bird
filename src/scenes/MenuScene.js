import Phaser from 'phaser';
import PlayScene from './PlayScene';
import ScoreScene from './ScoreScene';

class MenuScene extends Phaser.Scene {
    constructor(config) {
        super('MenuScene');
        this.config = config;
        this.screenCenter = [config.width / 2, config.height /2];
        this.menu = [
            {scene: 'PlayScene', text: 'Play'},
            {scene: 'ScoreScene', text: 'Score'},
            {scene: null, text: 'Exti'}
        ]
        this.middleX = config.width / 2;
    }

    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('pipe', '../../assets/pipe-green.png')
    }
 

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.pipe1 = this.add.image(110, 50, 'pipe');
        this.pipe1.flipY = true;

        this.pipe2 = this.add.image(700, 550, 'pipe');
        this.pipe2.angle = -90;
        this.pipe2.flipX = true;
       

        const title = this.add.text(this.middleX, 150, 'Flappy Bird',{fontSize: '42px', fill: '#FFF'}).setOrigin(0.5, 1)
        const subtext = this.add.text(this.middleX, 190, 'by Carin Wood',{fontSize: '18px', fill: '#FFF'}).setOrigin(0.5, 1)

        const playText = this.add.text(this.middleX, 300, 'Play', 
        {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
        const scoreText = this.add.text(this.middleX, 350, 'Score', {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
        
        const exitText = this.add.text(this.middleX, 400, 'Exit', {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
    
        playText.on('pointerover', () => {
            playText.setStyle({fill: '#ff0'})
        })
       
        scoreText.on('pointerover', () => {
            scoreText.setStyle({fill: '#ff0'})
        })
       
        exitText.on('pointerover', () => {
            exitText.setStyle({fill: '#ff0'})
        })

        playText.on('pointerout', () => {
            playText.setStyle({fill: '#FFF'})
        })

        scoreText.on('pointerout', () => {
            scoreText.setStyle({fill: '#FFF'})
        })
        exitText.on('pointerout', () => {
            exitText.setStyle({fill: '#FFF'})
        })

        playText.on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('PlayScene');
        })
      
        scoreText.on('pointerdown', () => {
                this.scene.stop();
                this.scene.start('ScoreScene');
        })

        exitText.on('pointerdown', () => {
            this.game.destroy(true);
        })
    }

 


}

export default MenuScene;