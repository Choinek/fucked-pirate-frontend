import Phaser from 'phaser';
import 'phaser';

let player;
let cursors;

let jumpCounter = 2;

export default class GameScene extends Phaser.Scene {
    constructor () {
        super('Game');
    }

    preload () {
        this.load.image('pirate-johntardo', 'assets/pirate-johntardo.png');
        this.load.image('tiles', 'assets/tilesets/deep-forest-tileset-32.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/deep-forest.json');
    }

    create () {
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('DeepForestTileset32', 'tiles');

        const deepBackgroundLayer = map.createStaticLayer("Deep Background", tileset, 0, 0);
        const treesLayer = map.createStaticLayer("Trees", tileset, 0, 0);
        const backgroundLayer = map.createStaticLayer("Background", tileset, 0, 0);
        const objectsLayer = map.createStaticLayer("Objects", tileset, 0, 0);

        objectsLayer.setCollisionByProperty({Collide: true});

        player = this.physics.add.image(32, 59, 'pirate-johntardo');
        // player.setBounce(0.2);
        player.body.setGravityY(1000);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, objectsLayer);

        // set the boundaries of our game world
        this.physics.world.bounds.width = deepBackgroundLayer.width;
        this.physics.world.bounds.height = deepBackgroundLayer.height;

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black
        // this.cameras.main.setBackgroundColor('#ccccff');
    }

    update() {
        let that = this;
        cursors = that.input.keyboard.createCursorKeys();

        function createNewPlayer() {
            let player2 = that.physics.add.image(32, 59, 'pirate-johntardo');
            // player2.body.setGravityY(300);
            // player2.setCollideWorldBounds(true);
            // this.physics.add.collider(player2, objectsLayer);
        }

        function handlePlayers() {
            // foreach players table
            // console.log(window.App.state.players);
            window.App.state.players.forEach(function(player) {
                // console.log(player);
            });
        }

        function handleMovements() {
            if (cursors.left.isDown) {
                player.setVelocityX(-520);
            } else if (cursors.right.isDown) {
                player.setVelocityX(520);
            } else {
                player.setVelocityX(0);
            }

            if ((cursors.up.isDown || cursors.space.isDown) && player.body.onFloor()) {
                player.setVelocityY(-500);
            }
        }

        function handleGui() {
            if (cursors.shift.isDown) {
                that.scene.start('Title');
            }
        }

        handleMovements();
        handlePlayers();
        handleGui();
    }
};
