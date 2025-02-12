const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,  // Make it full-width
    height: window.innerHeight,  // Make it full-height
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE,  // Resize when window resizes
        autoCenter: Phaser.Scale.CENTER_BOTH  // Center the game
    }
};


const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('player', './Rohan moving.png', {
        frameWidth: 32,  // Set this to the width of a single frame
        frameHeight: 32    // Set this to the height of a single frame
    });
    this.load.image('background', './background.jpg'); // Add a background image
}

function create() {
    // Set background to cover the entire window
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background')
        .setDisplaySize(window.innerWidth, window.innerHeight);

    // Create player sprite
    this.player = this.add.sprite(400, 300, 'player');
    this.player.setScale(5); // Scale the player 3x (adjust as needed)

    // Create animation (assuming 'player' is a sprite sheet)
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    // Enable keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.x -= 3;
        this.player.anims.play('walk', true); // Play walking animation
    } else if (this.cursors.right.isDown) {
        this.player.x += 3;
        this.player.anims.play('walk', true);
    } else if (this.cursors.up.isDown) {
        this.player.y -= 3;
        this.player.anims.play('walk', true);
    } else if (this.cursors.down.isDown) {
        this.player.y += 3;
        this.player.anims.play('walk', true);
    } else {
        this.player.anims.stop(); // Stop animation when no keys are pressed
        this.player.setFrame(0);  // Set to idle frame (first frame of spritesheet)
    }
}

