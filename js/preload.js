var Preload = function (game) {
};

var health_bottom = null;
var middleX = 0;
var middleY = 0;
var line1;
var line2;
var line3;
var level = 1;
var logo_group;
var logo_group_2;
var canIplay = false;

Preload.prototype = {

    preload: function () {

        game.load.image('bg_ingame', 'assets/bg-1.jpg');
        game.load.image('btn_start', 'assets/btn_start.png');
        game.load.image('btn_final', 'assets/button.png');
        game.load.image('logo-1', 'assets/logo-1.png');
        game.load.image('logo-2', 'assets/logo-2.png');
        game.load.image('logo-BRONZE', 'assets/leaf_score_bronze.png');
        game.load.image('logo-SILVER', 'assets/leaf_score_silver.png');
        game.load.image('logo-GOLD', 'assets/leaf_score_gold.png');
        game.load.image('time_frame', 'assets/time_frame.png');
        game.load.image('first-cut', 'assets/first-cut.png');
        game.load.image('lines', 'assets/lines.png');
        game.load.image('leaf', 'assets/leaf.png');
        game.load.image('leaf_double', 'assets/leaf_double.png');
        game.load.image('leaf_score', 'assets/leaf_score.png');
        game.load.image('leaf_silver', 'assets/leaf_score_silver.png');
        game.load.image('leaf_gold', 'assets/leaf_score_gold.png');
        game.load.image('truck', 'assets/truck.png');
        game.load.image('tc-1', 'assets/truck-cover-1.png');
        game.load.image('tc-2', 'assets/truck-cover-2.png');
        game.load.image('tc-3', 'assets/truck-cover-3.png');
        game.load.image('phone-rotate', 'assets/phone-rotate.png');
        game.load.image('trans', 'assets/trans.jpg');
        
        game.load.json('content', 'assets/content.json?36');

        middleX = game.width / 2;
        middleY = game.height / 2;

    },

    create: function () {

        bgintro = game.add.image(0, 0, 'bg_ingame');

        content = game.cache.getJSON('content');
        //console.log (content);

        let topTextStyle = {
            //font: "63.71px NeulandGrotesk-CondensedBold",
            font: "63.71px 'Cairo'",
            fill: "#ffffff",
            align: "center"
        };
        let secondTextStyle = {
            //font: "68.74px NeulandGrotesk-CondensedBold",
            font: "68px 'Cairo'",
            fill: "#ffffff",
            align: "center",
            wordWrap: false,
            wordWrapWidth: 800
        };
        let awardTextStyle = {
            //font: "43px NeulandGrotesk-CondensedBold",
            font: "40px 'Cairo'",
            fill: "#ffffff",
            align: "center"
        };

        let logo = game.add.image(middleX, 30, 'logo-1')
        logo.anchor.set(0.5, 0);
        let f_cut = game.add.image(middleX + 54.5, middleY + 15, 'first-cut')
        f_cut.anchor.set(0.5, 0);

        let mainText_1 = game.add.text(middleX, f_cut.y + f_cut.height + 30, content.mainMessage_1, topTextStyle);
        mainText_1.anchor.set(0.5, 0);

        logo_group = game.add.group();
        logo_group.add(logo)
        logo_group.add(f_cut)
        logo_group.add(mainText_1)

        let second_text = game.add.text(middleX, 140, content.mainMessage_2 + "\n"+ content.mainMessage_3 + "\n" + content.mainMessage_4 + "\n" + content.mainMessage_5, secondTextStyle)
        second_text.anchor.set(0.5, 0);
        second_text.alpha = 0;
        //let silver_text = game.add.text(middleX - 150, second_text.y + second_text.height + 70, content.collect + content.level_limits[0] + ' for Silver', awardTextStyle)
        let silver_text = game.add.text(middleX - 355, second_text.y + second_text.height + 70, content.tobacco_gold, awardTextStyle)
        silver_text.anchor.set(0, 0.5);
        silver_text.alpha = 0;
        //let gold_text = game.add.text(middleX - 150, silver_text.y + silver_text.height + 30, content.collect + content.level_limits[1] + ' for Gold', awardTextStyle)
        let gold_text = game.add.text(middleX - 355, silver_text.y + silver_text.height + 30, content.tobacco_silver, awardTextStyle)
        gold_text.anchor.set(0, 0.5);
        gold_text.alpha = 0;
        let leaf_silver = game.add.image(silver_text.x + silver_text.width + 10, silver_text.y, 'leaf_silver');
        leaf_silver.anchor.set(0, 0.5);
        leaf_silver.scale.set(0.1875)
        leaf_silver.alpha = 0;
        let leaf_gold = game.add.image(gold_text.x + gold_text.width + 10, gold_text.y, 'leaf_gold');
        leaf_gold.anchor.set(0, 0.5);
        leaf_gold.scale.set(0.1875)
        leaf_gold.alpha = 0;

        let truck = game.add.image(0, game.height, 'truck')
        truck.anchor.set(0.5, 1)
        cover_truck_1 = game.add.image(0, game.height, 'tc-1')
        cover_truck_1.anchor.set(0.5, 1)

        group_truck = game.add.group();
        group_truck.x = truck.x
        group_truck.y = truck.y
        group_truck.pivot.x = truck.x
        group_truck.pivot.y = truck.y
        group_truck.add(cover_truck_1)
        group_truck.add(truck)

        // logo_group_2 = game.add.group();

        start_btn = game.add.image(middleX, game.height - 190, 'btn_start');
        start_btn.anchor.set(0.5);
        //var s_btn_txt = game.add.text(start_btn.x, start_btn.y, content.play, { font: "40px NeulandGrotesk-Bold", fill: "#fff" });
        var s_btn_txt = game.add.text(start_btn.x, start_btn.y, content.play, { font: "40px Cairo", fill: "#fff" });
        s_btn_txt.anchor.set(0.5);

        start_btn.inputEnabled = true;
        start_btn.input.useHandCursor = true;
        start_btn.events.onInputDown.add(function () {
            if (!canIplay) {
                canIplay = true;
                logo_group.alpha = 0;
                second_text.alpha = 1;
                silver_text.alpha = 1;
                gold_text.alpha = 1;
                leaf_silver.alpha = 1;
                leaf_gold.alpha = 1;
                s_btn_txt.text = content.start;
                btn_twn = game.add.tween(start_btn).to({ y: start_btn.y - 100 }, 500, "Sine.easeOut", true);
                btn_twn_txt = game.add.tween(s_btn_txt).to({ y: s_btn_txt.y - 100 }, 500, "Sine.easeOut", true);
                truck_twn = game.add.tween(group_truck).to({ x: middleX }, 5000, Phaser.Easing.Cubic.Out, true, 0);
            }
            else {
                playbtnClick();
            }
        }, this);

        

        orienMulti = 1;
        if (isMobile()) {
            changeOrCheck()
            window.onorientationchange = changeOrCheck;
        }

        

    },
    update: function () {

    },
    render: function () {
        
    }
}



function changeOrCheck() {
    if (readDeviceOrientation().includes("portrait")) {
        if (trans != null) {
            trans.destroy()
            rotateicon.destroy()
            turntext.destroy()
        }
        trans = game.add.image(0, 0, 'trans');
        trans.alpha = 0.8;
        trans.inputEnabled = true;

        rotateicon = game.add.image(game.width / 2, game.height / 2 - 200, 'phone-rotate')
        rotateicon.anchor.set(0.5, 0.5)

        //var turnstyle = { font: "50px NeulandGrotesk-Bold", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 650 };
        var turnstyle = { font: "50px Cairo", fill: "#ffffff", align: "center", wordWrap: true, wordWrapWidth: 650 };
        turntext = game.add.text(rotateicon.x, rotateicon.y + rotateicon.height, content.rotatephone, turnstyle);
        turntext.anchor.set(0.5, 0.5)
        game.paused = true;
    } else {
        if (trans != null) {
            game.paused = false;
            trans.destroy()
            rotateicon.destroy()
            turntext.destroy()
        }
    }
}

function readDeviceOrientation() {

    if (Math.abs(window.orientation) === 90) {
        //if (window.orientation === 90) {
        if (window.orientation > 0) {
            orienMulti = 1
        } else {
            orienMulti = -1
        }

        // Landscape
        return "landscape";
    } else {
        // Portrait
        return "portrait";
    }
}

function playbtnClick() {
    // startbtn.events.onInputDown.removeAll();
    this.game.state.start("Maingame");
}

function isMobile() {
    return game.device.iOS || game.device.android
    // return game.device.android
}
