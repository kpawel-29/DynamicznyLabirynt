/*jslint browser: true, jquery: true, devel: true */
$(document).ready(function(){
var startBtn = $('#startbtn'),
    gameArea = $('#gamearea'),
    radarArea = $('#radar'),
    playerPosition,
    pressedKey,
    rand;

var labiryntFloors = [/*14,*/28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,48,49,50,52,55,57,60,62,65,71,73,75,77,79,82,84,85,87,89,90,91,92,94,95,96,98,100,101,102,104,105,106,121,123,125,129,136,137,138,139,140,141,142,143,144,145,146,147,148,150,151,152,154,155,156,157,158,159,160,163,173,181,185,187,190,192,193,194,195,196,198,200,201,202,204,205,206,208,210,211,212,214,217,223,225,229,231,233,235,244,245,246,247,248,249,250,252,253,254,255,256,258,260,262,263,264,265,266,267,268,271,285,287,295,298,300,302,303,304,305,306,307,308,309,310,311,312,314,316,317,318,320,321,322,325,327,329,341,345,347,349,352,353,354,356,357,358,359,361,362,363,364,365,366,367,368,369,370,371,372,373,374,376,379,383,395,403,406,408,410,411,412,413,414,415,416,417,418,419,420,422,424,425,426,428,429,430,433,434,435,447,452,455,460,462,464,465,466,467,468,470,471,472,474,475,476,478,479,480,481,482,483,484,487,491,497,503,511,514,515,516,517,518,519,520,521,522,523,524,526,527,528,529,530,532,533,534,535,536,537,538/*,553*/];

startBtn.on('click', function(){
    for (var i = 0; i < 567; i++) {  
        gameArea.append('<div class="h" data-id='+i+'></div>');
    };
    generateRadarArea();
    setPlayerFirstPosition();
});

var generateRadarArea = function() {
    for (var i = 0; i < 16; i++) {
       radarArea.append('<div class="re" data-id='+i+'></div>') 
   };
};

$('body').bind('keydown', function(e) {
     switch (e.keyCode) {
        case 87:
            movePlayer('up');
            break;
        case 83:
            movePlayer('down');
            break;
        case 65:
            movePlayer('left');
            break;
        case 68:
            movePlayer('right');
            break;
    }  
});


var movePlayer = function(key) {
    var position = gameArea.find('.p').data('id');
    if (key == 'up') {
        if (isInArray(position-27, labiryntFloors)) {
            updateRadar(findRadarPosition(position), 'rne', 're');
            changeBackground('p',position);
            position -= 27;
            updateGameArea(position);
        };
    } else if (key == 'down') {
        if (isInArray(position+27, labiryntFloors)) {
            updateRadar(findRadarPosition(position), 'rne', 're');
            changeBackground('p',position);
            position += 27;
            updateGameArea(position);
        };
    } else if (key == 'left') {
        if (isInArray(position-1, labiryntFloors)) {
            updateRadar(findRadarPosition(position), 'rne', 're');
            changeBackground('p',position);
            position -= 1;
            updateGameArea(position);
        };
    } else if (key == 'right') {
        if (isInArray(position+1, labiryntFloors)) {
            updateRadar(findRadarPosition(position), 'rne', 're');
            changeBackground('p',position);
            position += 1;
            updateGameArea(position);
        };
    };
};

var updateGameArea = function(position){
    gameArea.find('.f[data-id="'+position+'"]').removeClass('f').addClass('p');
    showAreaNearPlayer(position);
    updateRadar(findRadarPosition(position), 're', 'rne');
};

var setPlayerFirstPosition = function() {
    rand = labiryntFloors.randomElement();
    playerPosition = gameArea.find('.h[data-id="'+rand+'"]');
    playerPosition.removeClass('h').addClass('p');
    showAreaNearPlayer(rand);
};

var changeBackground = function(selector, position) {
    if (isInArray(position, labiryntFloors)) {
      gameArea.find('.'+selector+'[data-id="'+(position)+'"]').removeClass(selector).addClass('f');  
    } else{
        gameArea.find('.'+selector+'[data-id="'+(position)+'"]').removeClass(selector).addClass('w');  
    };  
};

var findRadarPosition = function(id) {
    var kol;//w ktorej kolumnie znajduje sie player
    var wiersz;//w ktorym wierszu
    var idRadar;
    //znajduje kolumnę/4 i wiersz 
    for (var i = 0; i < 20; i++) {
        if ((i*27 <=id) && (id <= i*27+5)) {
            wiersz = i;
            kol = 1;
        }else if ((i*27+6 <=id) && (id <= i*27+12)) {
            wiersz = i;
            kol = 2;
        }else if ((i*27+13 <=id) && (id <= i*27+18)) {
            wiersz = i;
            kol = 3;
        }else if ((i*27+19 <=id) && (id <= i*27+25)) {
            wiersz = i;
            kol = 4;
        };
    };
    //zamienia wyniki na id radaru
    if ((1<=wiersz) && (wiersz<=4)) {
        idRadar = -1 + kol;
    }else if ((5<=wiersz) && (wiersz<=9)) {
        idRadar = 3 + kol;
    }else if ((10<=wiersz) && (wiersz<=14)) {
        idRadar = 7 + kol;
    }else if ((15<=wiersz) && (wiersz<=19)) {
        idRadar = 11 + kol;
    };
    //console.log('idRadar: '+idRadar);
    return idRadar;
};

var updateRadar = function(position, before, after) {
    radarArea.find('.'+before+'[data-id="'+position+'"]').removeClass(before).addClass(after);
    console.log(position, before, after);
};
//zamienia z hidden na f - jeżeli pozycja jest floor, w - jezeli pozycja jest wall 
var showAreaNearPlayer = function(position) {
    changeBackground('h',position+1);
    changeBackground('h',position-1);
    changeBackground('h',position+27);
    changeBackground('h',position+26);
    changeBackground('h',position+28);
    changeBackground('h',position-26);
    changeBackground('h',position-27);
    changeBackground('h',position-28);
};

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
};

});
