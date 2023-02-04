import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.config = config;
    }
    
    preload() { 
      
    }

    create() {
        this.scene.start('MenuScene');
    }


}

export default PreloadScene;