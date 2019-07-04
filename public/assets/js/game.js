$(document).ready(() => {

    

    // this sets up the game.  it's an object used in the creation of the game object below.
    var config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config); // creates an instance of a game object using the config object

    // globals
    var platforms, player, cursors, burgers;

    // score vars
    var scoreText, score = 0;

    function preload() {
        this.load.image('sky', 'assets/img/game-background.jpg');
        this.load.image('ground', 'assets//img/platform.png');
        this.load.image('burger', 'assets/img/output-onlinepngtools.png');
        this.load.spritesheet('dude',
            'assets/img/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    function create() {
        this.add.image(400, 300, 'sky');
    
        platforms = this.physics.add.staticGroup();
    
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        player = this.physics.add.sprite(100, 450, 'dude');
    
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        burgers = this.physics.add.group({
            key: 'burger',
            repeat: 0,
            setXY: {x: 400, y: 0},
            setScale: 0.2
        });
        
        burgers.children.iterate(function(burger) {
            burger.setBounce(1);
            burger.setScale(0.2);
            burger.setCollideWorldBounds(true);
            burger.setVelocity(Phaser.Math.Between(-200, 200), 20);
        });
        
    
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(burgers, platforms);
        // adding overlaps which sets two objects to compare and then runs a callback
        this.physics.add.overlap(player, burgers, collectBurger, null, this);
    
        // setting up the score text
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#333' });
    
        function collectBurger(player, burger) {
            burger.disableBody(true, true);

            score += 1;
            scoreText.setText(`Score: ${score}`);

            if (burgers.countActive(true) === 0) {
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                burger = burgers.create(x, 16, 'burger');
                burger.setBounce(1);
                burger.setScale(0.2);
                burger.setCollideWorldBounds(true);
                burger.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
            if (score === 5) {
                // stop the game, show the modal to go back to the main page
                this.physics.pause();
                $("#numBurgs").text(score);
                $(".modal").css("display", "block");
            }
        }
    }

    function update() {
        cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-320);
        }
    }

    $("#home").on("click", () => {
        var burgerId = parseInt(window.localStorage.getItem("burgerId"));
        $(".modal").fadeOut(500);
        updateDatabase(score, burgerId);
    });

    // update database with score
    const updateDatabase = (score, id) => {
        var updatedGame = {
            numEaten: score
        };
        $.ajax({
            method: "PUT",
            url: "/api/game/" + id,
            data: updatedGame
        }).then((data) => {
            location.assign("/");
        }).catch((err) => {
            console.log(err);
        });
    }
});