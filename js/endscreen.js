var Endscreen = function (game) {
};

Endscreen.prototype = {


    preload: function () {

    },

    create: function () {
        bg_final = game.add.image(0, 0, 'bg_ingame');

        congrats_style = {
            //font: "70px NeulandGrotesk-CondensedBold",
            font: "70px Cairo",
            fill: "#fff"
        }

        let width_one_third = game.width / 3;
        let logo_left = game.add.image(width_one_third, middleY, "logo-2");
        logo_left.anchor.set(0.5);
        logo_left.scale.set(1.2)

        //let harvest_txt = game.add.text(width_one_third * 2, 175, content.txt_harvest, { font: "80px NeulandGrotesk-CondensedBold", fill: "#a30014", align: "center" });
        let harvest_txt = game.add.text(width_one_third * 2, 175, content.txt_harvest, { font: "80px Cairo", fill: "#a30014", align: "center" });
        harvest_txt.anchor.set(0.5, 0);

        //let congrats_txt = game.add.text(width_one_third * 2, harvest_txt.y + harvest_txt.height + 50, content.win_text, { font: "51.69px NeulandGrotesk-CondensedBold", fill: "#fff", align: "center" })
        let congrats_txt = game.add.text(width_one_third * 2, harvest_txt.y + harvest_txt.height + 50, content.win_text, { font: "51.69px Cairo", fill: "#fff", align: "center" })
        congrats_txt.anchor.set(0.5);
        
        //prize_txt = game.add.text(width_one_third * 2, congrats_txt.y + congrats_txt.height / 2 + 0, platinum_colors[tier_indicator] + ' ' + content.tobacco, congrats_style);
        var message = "";
        switch(tier_indicator){
            case 0 :
                message = content.prize_msg_bronze;
                break;
            case 1 :
                message = content.prize_msg_silver;
                break;
            case 2 :
                message = content.prize_msg_gold;
                break;
        }
        prize_txt = game.add.text(width_one_third * 2, congrats_txt.y + congrats_txt.height / 2 + 0, message, congrats_style);
        console.log (platinum_colors[tier_indicator]);
        
        prize_txt.anchor.set(0.5, 0);
        /* let tbc_txt = game.add.text(middleX - 10, congrats_txt.y + congrats_txt.height / 2 + 0, content.tobacco, congrats_style)
        tbc_txt.anchor.set(0, 0); */

        let logo_2 = game.add.image(prize_txt.x + prize_txt.width / 2 + 10, prize_txt.y + prize_txt.height / 2, "logo-" + platinum_colors[tier_indicator])
        logo_2.anchor.set(0, 0.5);
        logo_2.scale.set(0.25);
        /* let logo_2 = game.add.image(width_one_third * 2, middleY - 100, "logo-" + platinum_colors[tier_indicator])
        logo_2.anchor.set(0.5);
        logo_2.scale.set(0.5); */

        var start_btn = game.add.image(width_one_third * 2, middleY - 20, 'btn_final');
        start_btn.anchor.set(0.5);

        //var s_btn_txt = game.add.text(width_one_third * 2, start_btn.y, content.play_again, { font: "38px NeulandGrotesk-CondensedBold", fill: "#fff" });
        var s_btn_txt = game.add.text(width_one_third * 2, start_btn.y, content.play_again, { font: "38px Cairo", fill: "#fff" });
        s_btn_txt.anchor.set(0.5);

        start_btn.inputEnabled = true;
        start_btn.input.useHandCursor = true;
        start_btn.events.onInputDown.add(playNextLevel, this);

        if (tier_indicator < 2) {
            //let msg_gold = game.add.text(width_one_third * 2, start_btn.y - 70, content.msg_gold, { font: "60px NeulandGrotesk-CondensedBold", fill: "#fff", align: "center" });
            let msg_gold = game.add.text(width_one_third * 2, start_btn.y - 70, content.msg_gold, { font: "60px Cairo", fill: "#fff", align: "center" });
            msg_gold.anchor.set(0.5, 1)
        }
        
        let f_cut = game.add.image(width_one_third * 2 + 54.5, middleY + 110, 'first-cut')
        f_cut.anchor.set(0.5, 0);
        //let celeb_text = game.add.text(width_one_third * 2, f_cut.y + f_cut.height, content.celeb, { font: "45px NeulandGrotesk-CondensedBold", fill: "#fff" })
        //let celeb_text = game.add.text(width_one_third * 2, f_cut.y + f_cut.height, content.celeb, { font: "45px Cairo", fill: "#fff" })
        //celeb_text.anchor.set(0.5)

        //let final_msg = game.add.text(width_one_third * 2, game.height - 164, content.final_msg, { font: "45px NeulandGrotesk-CondensedBold", fill: "#a30014", align: "center" });
        let final_msg = game.add.text(width_one_third * 2, game.height - 330, content.final_msg, { font: "45px Cairo", fill: "#a30014", align: "center" });
        final_msg.anchor.set(0.5, 1)
        
        //let myLines = game.add.image(width_one_third * 2, game.height - 134, 'lines');
        //myLines.anchor.set(0.5, 1);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        // health();
        // health_bottom.bringToTop();

        /* line1 = new Phaser.Line(middleX, 0, middleX, game.height);
        line2 = new Phaser.Line(0, middleY, game.width, middleY);
        line3 = new Phaser.Line(width_one_third * 2, 0, width_one_third * 2, game.height); */
        // line3 = new Phaser.Line(game.width - 1, 0, game.width - 1, game.height);
    },
    update: function () {
    },
    render: function () {
        /* game.debug.geom(line1);
        game.debug.geom(line2);
        game.debug.geom(line3); */
        // game.debug.spriteBounds(sp_dummy)
    }
}
function onTap() {
    game.input.onTap.removeAll();
    this.game.state.start("Preload");
}
function playNextLevel() {
    // startbtn.events.onInputDown.removeAll();
    this.game.state.start("Maingame");
}