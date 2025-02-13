const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.spritesheet('player_right', './Rohan moving right.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player_left', './Rohan moving left.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player_front', './Rohan moving.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('background', './background.jpg');
}

function create() {
    // Set background
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background')
        .setDisplaySize(window.innerWidth, window.innerHeight);

    // Create player sprite (default: facing front)
    this.player = this.physics.add.sprite(400, 300, 'player_front').setScale(5);
    this.player.setCollideWorldBounds(true);

    // Create animations
    this.anims.create({
        key: 'walk_right',
        frames: this.anims.generateFrameNumbers('player_right', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle_right',
        frames: [{ key: 'player_right', frame: 0 }],
        frameRate: 10
    });

    this.anims.create({
        key: 'walk_left',
        frames: this.anims.generateFrameNumbers('player_left', { start: 1, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle_left',
        frames: [{ key: 'player_left', frame: 0 }],
        frameRate: 10
    });

    this.anims.create({
        key: 'walk_front',
        frames: this.anims.generateFrameNumbers('player_front', { start: 1, end: 2 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idle_front',
        frames: [{ key: 'player_front', frame: 0 }],
        frameRate: 10
    });

    // Keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.facing = 'front'; // Default facing direction
}

function update() {
    if (!this.cursors) return;

    let moving = false;

    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        if (this.facing !== 'left' || this.player.anims.currentAnim?.key !== 'walk_left') {
            this.player.setTexture('player_left');
            this.player.play('walk_left', true);
            this.facing = 'left';
        }
        moving = true;
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        if (this.facing !== 'right' || this.player.anims.currentAnim?.key !== 'walk_right') {
            this.player.setTexture('player_right');
            this.player.play('walk_right', true);
            this.facing = 'right';
        }
        moving = true;
    } else {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
        if (this.facing !== 'front' || this.player.anims.currentAnim?.key !== 'walk_front') {
            this.player.setTexture('player_front');
            this.player.play('walk_front', true);
            this.facing = 'front';
        }
        moving = true;
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
        if (this.facing !== 'front' || this.player.anims.currentAnim?.key !== 'walk_front') {
            this.player.setTexture('player_front');
            this.player.play('walk_front', true);
            this.facing = 'front';
        }
        moving = true;
    } else {
        this.player.setVelocityY(0);
    }

    // Stop animation when not moving
    if (!moving) {
        if (this.player.anims.currentAnim?.key !== `idle_${this.facing}`) {
            this.player.play(`idle_${this.facing}`);
        }
    }
}