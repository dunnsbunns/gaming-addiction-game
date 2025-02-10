class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("player", "player.png");
        this.load.image("platform", "platform.png");
        this.load.image("trap", "trap.png");
        this.load.image("powerup", "powerup.png");
        this.load.image("npc", "npc.png");
    }

    create() {
        this.add.text(20, 20, "Escape the Addiction Trap", { font: "16px Arial", fill: "#fff" });
        
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 300, "platform");
        this.platforms.create(400, 400, "platform");
        this.platforms.create(600, 500, "platform");
        
        this.player = this.physics.add.sprite(100, 250, "player");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.trap = this.physics.add.sprite(400, 350, "trap");
        this.physics.add.collider(this.trap, this.platforms);
        this.physics.add.overlap(this.player, this.trap, this.hitTrap, null, this);

        this.powerup = this.physics.add.sprite(600, 450, "powerup");
        this.physics.add.collider(this.powerup, this.platforms);
        this.physics.add.overlap(this.player, this.powerup, this.collectPowerup, null, this);
        
        this.npc = this.physics.add.staticSprite(700, 450, "npc");
        this.physics.add.overlap(this.player, this.npc, this.showDialogue, null, this);
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-300);
        }
    }

    hitTrap(player, trap) {
        this.add.text(300, 100, "You hit a gaming addiction trap!", { font: "16px Arial", fill: "#ff0000" });
        player.setTint(0xff0000);
        this.time.delayedCall(1000, () => { player.clearTint(); }, [], this);
    }

    collectPowerup(player, powerup) {
        powerup.destroy();
        this.add.text(300, 120, "You gained a treatment power-up!", { font: "16px Arial", fill: "#00ff00" });
    }

    showDialogue(player, npc) {
        this.add.text(250, 150, "Counselor: Gaming addiction affects brain chemistry...", { font: "16px Arial", fill: "#ffffff" });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: "arcade", arcade: { gravity: { y: 300 }, debug: false } },
    scene: MainScene
};

const game = new Phaser.Game(config);
