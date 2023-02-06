import Phaser from 'phaser';


class PauseScene extends Phaser.Scene {
    constructor(config) {
        super('PauseScene');
        this.config = config;
        this.middleX = config.width / 2;
        
    }

    preload() {
        this.load.image('sky', '../assets/sky.png');
        this.load.image('back', '../assets/back.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);
        const continueText = this.add.text(this.middleX, 200, 'Continue', 
        {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();
        const extitText = this.add.text(this.middleX, 250, 'Exit', {fontSize: '32px', fill: '#FFF'})
        .setOrigin(0.5, 1)
        .setInteractive();

        extitText.on("pointerdown", () => {
            this.scene.stop('PlayScene');
            this.scene.start('MenuScene');
        })

        extitText.on('pointerover', () => {
            extitText.setStyle({fill: '#ff0'})
        })

        extitText.on('pointerout', () => {
            extitText.setStyle({fill: '#FFF'})
        })

        continueText.on("pointerover", () => {
            continueText.setStyle({fill: '#ff0'})
        })
        
        continueText.on('pointerout', () => {
            continueText.setStyle({fill: '#FFF'})
        })

        continueText.on('pointerdown', () => {
            this.scene.stop();
            this.scene.resume('PlayScene');
        })
    }



}

export default PauseScene;