var Maingame = function (game) {
};

var total = 0;
var isAnimating = false;
var timerT = null;
let ans_style = null;
let score_num = 0;
let goal = 0;
let time_is_up = false;
let mLeafSizes = [];
let platinum_colors = ['BRONZE', 'SILVER', 'GOLD'];
let tier_indicator;

function initialize() {
    total = content.time;
    isAnimating = false;
    timerT = null;
    score_num = 0;
    time_is_up = false;
    tier_indicator = 0;
}

function addZeros(num) {
    if (num < 0) {
        num = 0
    }
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function updateCounter() {
    total--;
    // timertxt.text = total;

    if (total <= 0) {
        timertxt.text = "00.00"
        timer.stop()
        time_is_up = true;
        showResults();
    }
}

Maingame.prototype = {

    preload: function () {
        initialize()
    },
    create: function () {

        var timeTextStyle = {
            //font: "50px NeulandGrotesk-CondensedBold",
            font: "40px Cairo",
            fill: "#ffffff"
        };
        var scoreStyle = {
            //font: "98.94px NeulandGrotesk-CondensedBold",
            font: "98.94px Cairo",
            fill: "#a30014"
        };

        bggame = game.add.image(0, 0, 'bg_ingame');
        time_frame = game.add.image(25, 25, 'time_frame');
        // time_frame

        timertxt = game.add.text(time_frame.x + time_frame.width - 50, time_frame.y + time_frame.height / 2 - 5, content.time, timeTextStyle);
        timertxt.anchor.set(1, 0.5);
        //  Create our Timer
        timer = game.time.create(false);
        //  Set a TimerEvent to occur after 2 seconds
        timer.loop(1000, updateCounter, this);
        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();

        game.input.maxPointers = 1;
        mLeafSizes = ['leaf', 'leaf_double'];

        //let timer_txt_right = game.add.text(time_frame.x + time_frame.width / 2, timertxt.y, content.sec, timeTextStyle);
        let timer_txt_right = game.add.text(time_frame.x+30, timertxt.y, content.sec, timeTextStyle);
        timer_txt_right.anchor.set(0, 0.5);

        let score_img = game.add.image(game.width - 25, 25, 'leaf_score')
        score_img.anchor.set(1, 0)

        score_txt = game.add.text(game.width - score_img.width - 35, score_img.height / 2 + 25, '0', scoreStyle);
        score_txt.anchor.set(1, 0.5);

        truck = game.add.image(0, game.height, 'truck')
        truck.anchor.set(0.5, 1)
        cover_truck_1 = game.add.image(0, game.height, 'tc-1')
        cover_truck_1.anchor.set(0.5, 1)
        cover_truck_1.alpha = 0;
        cover_truck_2 = game.add.image(0, game.height, 'tc-2')
        cover_truck_2.anchor.set(0.5, 1)
        cover_truck_2.alpha = 0;
        cover_truck_3 = game.add.image(0, game.height, 'tc-3')
        cover_truck_3.anchor.set(0.5, 1)
        cover_truck_3.alpha = 0;

        group_truck = game.add.group();
        group_truck.x = truck.x
        group_truck.y = truck.y
        group_truck.pivot.x = truck.x
        group_truck.pivot.y = truck.y
        group_truck.add(cover_truck_3)
        group_truck.add(cover_truck_2)
        group_truck.add(cover_truck_1)
        group_truck.add(truck)

        truck_twn = game.add.tween(group_truck).to({ x: game.width + truck.width / 2 }, 20000, Phaser.Easing.Linear.None, true, 0, -1);

        mySpawnInterval = setInterval(() => {
            if (!game.paused) {
                spawnLeaf()
            }
        }, 1250);

        // health();

        // gameManager();
        timertxt.bringToTop();
        // text = game.add.text(16, middleY, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });

    },
    update: function () {
    },
    render: function () {
        var tt = total * 1000 - (1000 - timer.duration.toFixed(0))

        var minutes = Math.floor(tt / 60000) % 60;
        var seconds = Math.floor(tt / 1000) % 60;
        // var milliseconds = Math.floor(tt / 10) % 100;

        timertxt.text = seconds;
        // timerT.text = addZeros(seconds);

        /* game.debug.geom(line1);
        game.debug.geom(line2);
        game.debug.geom(line3); */
        // game.debug.spriteBounds(sp_dummy)
    }
}

function spawnLeaf() {
    let randomX = game.rnd.integerInRange(0, game.width);
    let type = game.rnd.integerInRange(0, 1);
    let mLeaf = game.add.image(randomX, 0, mLeafSizes[type])
    mLeaf.anchor.set(0.5)
    mLeaf.angle = game.rnd.integerInRange(1, 135)
    mLeaf.scale.set(game.rnd.realInRange(0.5, 1).toFixed(2))
    // group_truck.bringToTop();
    game.world.bringToTop(group_truck);
    // health_bottom.bringToTop();

    if (type == 0) {
        mLeaf.points = 1
    }
    else if (type == 1) {
        mLeaf.points = 2
    }

    mLeaf.rotate = game.add.tween(mLeaf).to({ angle: mLeaf.angle + game.rnd.integerInRange(5, 20) }, 2000, Phaser.Easing.Linear.None, true, 0, -1, true);
    mLeaf.myTwnAlpha = game.add.tween(mLeaf).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, false);
    mLeaf.myTwnAlpha.onComplete.add(function () {
        mLeaf.destroy();
    })
    mLeaf.myTwn = game.add.tween(mLeaf).to({ y: game.height + 100 }, game.rnd.integerInRange(60, 110) * 100, Phaser.Easing.Linear.None, true);
    mLeaf.myTwn.onComplete.add(function () {
        mLeaf.destroy();
    })
    mLeaf.myTwnAfterDrag = game.add.tween(mLeaf).to({ y: game.height + 100 }, game.rnd.integerInRange(60, 110) * 100, Phaser.Easing.Linear.None, false);
    /* mLeaf.myTwnAfterDrag.onComplete.add(function () {
        mLeaf.destroy();
    }) */

    mLeaf.inputEnabled = true;
    mLeaf.input.useHandCursor = true;
    // // enable Drag (lockCenter, BringToTop)
    mLeaf.input.enableDrag(false, false);

    mLeaf.events.onDragStart.add(function () {
        mLeaf.myTwn.pause();
        mLeaf.rotate.pause();
        mLeaf.myTwnAfterDrag.stop();
    }, this);

    mLeaf.events.onDragStop.add(function () {
        if (checkOverlap(mLeaf, truck)) {
            // text.text = 'Drag the sprites. Overlapping: true';
            mLeaf.myTwnPos = game.add.tween(mLeaf).to({ x: mLeaf.x + 40, y: game.height - truck.height / 2 }, 250, Phaser.Easing.Linear.None, true);
            mLeaf.myTwnPop = game.add.tween(mLeaf.scale).to({ x: 0.5, y: 0.5 }, 250, Phaser.Easing.Linear.Out, true);
            /* mLeaf.myTwnPos.onComplete.add(function () {
            }) */
            mLeaf.myTwnAlpha.start();
            score_num += mLeaf.points
            score_txt.text = score_num;
            let increment = 0;

            if (cover_truck_1.alpha < 1) {
                /* increment = mLeaf.points / content.level_limits[0];
                cover_truck_1.alpha += parseFloat(increment.toPrecision(2)); */
                cover_truck_1.alpha += mLeaf.points / 20
                // console.log('by', parseFloat(increment.toPrecision(2)))
                // console.log('a', cover_truck_1.alpha)
            }
            else if (cover_truck_2.alpha < 1) {
                // tier_indicator = 1;
                cover_truck_1.alpha = 1
                cover_truck_2.alpha += mLeaf.points / 20
                // increment = mLeaf.points / (content.level_limits[1] - content.level_limits[0]);
                // cover_truck_2.alpha += parseFloat(increment.toPrecision(2));
                // console.log('by', parseFloat(increment.toPrecision(2)))
                // console.log('b', cover_truck_2.alpha)
            }
            else {
                // tier_indicator = 2;
                cover_truck_2.alpha = 1
                cover_truck_3.alpha += mLeaf.points / 20;
                // console.log(cover_truck_3.alpha)
            }
        }
        else {
            // text.text = 'Drag the sprites. Overlapping: false';
            // mLeaf.myTwnScale = game.add.tween(mLeaf.scale).to({ x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Linear.None, true);
            // mLeaf.myTwnAlpha.start();
            // mLeaf.myTwn.resume();
            // mLeaf.rotate.resume();
            // mLeaf.myTwnAfterDrag.start();
            mLeaf.myTwnAfterDrag = game.add.tween(mLeaf).to({ y: game.height + 100 }, game.rnd.integerInRange(60, 110) * 100, Phaser.Easing.Linear.None, true);
            // console.log('hi')
        }
        // mLeaf.inputEnabled = false;
    }, this);

    // mLeaf.events.onDragUpdate.add(function () {
    //     // Update
    // }, this)
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function showResults() {
    clearInterval(mySpawnInterval)
    if (score_num > content.level_limits[1]) {
        // gold
        tier_indicator = 2;
    }
    else if (score_num > content.level_limits[0]) {
        // silver
        tier_indicator = 1;
    }
    this.game.state.start("Endscreen");
}

/* function gameManager() {
    // play level
    level++;
    timer.stop();
    showResults();
    // this.game.state.start("Endscreen");
} */

// let place = game.rnd.integerInRange(1, 2);
// blue_alpha.yoyoDelay(500);

function trash() {
    /* if (score_num < content.level_limits[0]) {
        // increment = mLeaf.points / content.level_limits[0];
        // cover_truck_1.alpha += parseFloat(increment.toPrecision(2));
        cover_truck_1.alpha += mLeaf.points / 20
        // console.log('by', parseFloat(increment.toPrecision(2)))
        console.log('a', cover_truck_1.alpha)
    }
    else if (score_num < content.level_limits[1]) {
        tier_indicator = 1;
        cover_truck_1.alpha = 1
        increment = mLeaf.points / (content.level_limits[1] - content.level_limits[0]);
        cover_truck_2.alpha += parseFloat(increment.toPrecision(2));
        // console.log('by', parseFloat(increment.toPrecision(2)))
        // console.log('b', cover_truck_2.alpha)
    }
    else {
        // tier_indicator = 2;
        cover_truck_2.alpha = 1
        cover_truck_3.alpha += mLeaf.points / 10;
        // console.log(cover_truck_3.alpha)
    } */

    /* b_sp_dummy = game.add.image(middleX - (sp_dummy.width * 0.75), 500, 'sphere_red');
        c_sp_dummy = game.add.image(middleX, 700, 'sphere_red');
        c1_sp_dummy = game.add.image(middleX - (sp_dummy.width * 1.5), 300, 'sphere_red');
        c2_sp_dummy = game.add.image(middleX - (sp_dummy.width * 1.5), 700, 'sphere_red');

        b_sp_dummy.anchor.set(0.5);
        b_sp_dummy.scale.setTo(0.375)
        c_sp_dummy.anchor.set(0.5);
        c_sp_dummy.scale.setTo(0.375)
        c1_sp_dummy.anchor.set(0.5);
        c1_sp_dummy.scale.setTo(0.375)
        c2_sp_dummy.anchor.set(0.5);
        c2_sp_dummy.scale.setTo(0.375) 
        
        console.log('from', sphere.x, 'to', game.width + sphere.width + row_offset, '\n')
       */
}