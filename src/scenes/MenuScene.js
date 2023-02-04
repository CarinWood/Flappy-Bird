import Phaser from 'phaser';
import PlayScene from './PlayScene';

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
    }
 

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);
        const playText = this.add.text(this.middleX, 200, 'Play', 
        {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
        const scoreText = this.add.text(this.middleX, 250, 'Score', {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
        
        const exitText = this.add.text(this.middleX, 300, 'Exit', {fontSize: '32px', fill: '#FFF'})
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
    }

 


}

export default MenuScene;