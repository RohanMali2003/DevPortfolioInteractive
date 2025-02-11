import Phaser from "phaser";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('player', 'player.png'); // Load character image (we'll add this soon)
}

function create() {
    this.add.image(400, 300, 'player');
}

function update() {
    // Game logic will go here
}
