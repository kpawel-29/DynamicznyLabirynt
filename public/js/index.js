/*jslint browser: true, jquery: true, devel: true */
$(document).ready(function(){
var startBtn = $('#startbtn'),
    gameArea = $('#gamearea'),
    playerPosition,
    pressedKey;

var labiryntFloors = [/*14,*/28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,48,49,50,52,
55,57,60,62,65,71,73,75,77,79,82,84,85,87,89,90,91,92,94,95,96,98,100,101,102,104,105,106,121,123,125,129,136,137,138,139,140,141,142,143,144,145,
146,147,148,150,151,152,154,155,156,157,158,159,160,163,173,181,185,187,190,192,193,194,195,196,198,200,201,202,204,205,206,208,210,211,212,214,
217,223,225,229,231,233,235,244,245,246,247,248,249,250,252,253,254,255,256,258,260,262,263,264,265,266,267,268,271,285,287,295,298,300,302,
303,304,305,306,307,308,309,310,311,312,314,316,317,318,320,321,322,325,327,329,341,345,347,349,352,353,354,356,357,358,359,361,362,363,364,
365,366,367,368,369,370,371,372,373,374,376,379,383,395,403,406,408,410,411,412,413,414,415,416,417,418,419,420,422,424,425,426,428,429,430,
433,434,435,447,452,455,460,462,464,465,466,467,468,470,471,472,474,475,476,478,479,
480,481,482,483,484,487,491,497,503,511,514,515,516,517,518,519,520,521,522,523,524,526,527,528,529,530,532,533,534,535,536,537,538/*,553*/];

startBtn.on('click', function(){
    for (var i = 0; i < 567; i++) {
        if (isInArray(i, labiryntFloors)) {   
            gameArea.append('<div class="f" data-id='+i+'></div>');
            //daj obrazek podlogi
        } else{
            gameArea.append('<div class="w" data-id='+i+'></div>');
            //daj obrazek sciany
        };
        //wstaw koniec linii
        if (i>10 && i%27==0) {
            //gameArea.append("<br />");
        }
    };
    setPlayerPosition();
});


$('body').bind('keypress', function(e) {
    if(e.keyCode==119){//w
        pressedKey = 'w';
    }else if(e.keyCode==115){//s
        pressedKey = 's';
    }else if(e.keyCode==97){//a
        pressedKey = 'a';
    }else if(e.keyCode==100){//d
        pressedKey = 'd';
    }
});


var setPlayerPosition = function() {
    var rand = labiryntFloors.randomElement();
    playerPosition = gameArea.find('.f[data-id="'+rand+'"]');
    playerPosition.removeClass('f').addClass('p');
    showAreaNearPlayer(rand);
};

var showAreaNearPlayer = function(position) {
    gameArea.find('.f[data-id="'+(position+1)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position-1)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position+27)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position+26)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position+28)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position-26)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position-27)+'"]').css("background-color", "grey");
    gameArea.find('.f[data-id="'+(position-28)+'"]').css("background-color", "grey");

    gameArea.find('.w[data-id="'+(position+1)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position-1)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position+27)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position+26)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position+28)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position-26)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position-27)+'"]').css("background-color", "grey");
    gameArea.find('.w[data-id="'+(position-28)+'"]').css("background-color", "grey");

};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
};

});
