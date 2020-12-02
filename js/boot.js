var Boot = function (game) {

};

function playnext() {
    game.state.start("Preload");
}

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, playnext, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        //families: ['NeulandGrotesk-CondensedBold', 'NeulandGrotesk-Bold']
        families: ['Cairo']
    }

};


Boot.prototype = {


    preload: function () {
        game.stage.backgroundColor = "#5500ff";

        //game.load.spritesheet('loaderani', 'assets/loading_word.png', 400, 150);

        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        //game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //game.load.script('webfont', 'js/webfont.js');

    },

    create: function () {

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        trans = null;

    }
}

