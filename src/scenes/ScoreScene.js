import Phaser from "phaser";

class ScoreScene extends Phaser.Scene {
        constructor(config) {
            super('ScoreScene');
            this.config = config;
            this.middleX = config.width / 2;
            
        }

        preload() {
            this.load.image('sky', '../assets/sky.png');
            this.load.image('back', '../assets/back.png');
        }

        create() {
            this.add.image(0, 0, 'sky').setOrigin(0,0);
            const backBtn = this.add.image(30, 30, 'back')
            .setScale(2)
            .setInteractive();
            

            let bestScore = localStorage.getItem('bestScore')
            this.add.text(this.middleX, 300, `Best Score: ${bestScore || 0}`, {fill: '#FFF', fontSize: '32px'}).setOrigin(0.5, 1);
        
            backBtn.on("pointerdown", () => {
                this.scene.stop();
                this.scene.start('MenuScene');
            })
        
        
        }

        
}

export default ScoreScene;