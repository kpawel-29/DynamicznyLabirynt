/*jshint browser: true, jquery: true, devel:true */
/*global io: false */
$(function () {
var startBtn1 = $('#startbtn1'),
    startBtn2 = $('#startbtn2'),
    gameArea = $('#gamearea'),
    radarArea = $('#radar'),
    info = $('.info'),
    open = $('#open'),
    secPlayerPosition,
    labiryntFloors,
    playerPosition,
    secPlayerId,
    playerId,
    socket,
    rand;

    startBtn1.hide();
    startBtn2.hide();

    var lab0 = [28,29,30,31,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,55,58,60,79,82,84,85,86,87,89,90,92,93,94,95,96,97,98,99,100,101,102,104,105,106,109,116,119,121,129,131,136,138,139,140,142,143,144,145,146,148,150,151,152,153,154,156,157,158,160,163,165,167,175,177,179,187,190,191,192,194,195,196,197,198,200,201,202,203,204,206,207,208,210,211,212,213,214,225,228,233,235,237,244,245,246,247,248,250,251,252,253,255,256,257,258,260,262,263,264,265,266,267,268,271,275,277,280,287,298,300,301,302,304,306,307,308,309,311,312,313,314,316,317,318,320,321,322,325,327,331,336,338,343,345,347,349,352,354,355,356,357,358,359,360,361,363,365,367,369,370,372,374,376,379,385,387,390,392,394,396,399,401,403,406,407,408,409,410,412,414,415,416,417,419,421,422,423,425,426,427,428,430,439,441,446,450,457,460,461,462,463,464,465,466,468,470,471,472,473,474,475,476,477,478,480,481,482,484,487,495,500,502,507,511,514,515,516,517,518,519,520,522,523,524,525,527,529,530,531,532,534,535,536,537,538];
    var lab1 = [28,29,30,31,32,33,34,35,36,38,39,40,41,42,44,45,46,47,48,49,50,51,52,57,61,63,69,71,79,82,83,84,86,88,90,92,93,94,95,96,98,100,101,102,103,104,106,109,113,115,117,119,121,125,131,133,136,138,139,140,142,144,145,146,148,149,150,151,152,153,154,155,156,157,158,160,163,165,167,171,179,183,187,190,194,192,194,196,197,198,199,200,202,203,204,205,206,208,210,212,213,214,221,223,227,229,235,237,241,244,245,246,248,250,251,252,254,256,257,258,260,261,262,264,266,267,268,273,275,279,285,287,291,293,298,299,300,302,304,306,307,308,310,312,314,315,316,318,320,322,325,329,331,335,337,339,343,345,347,349,352,354,355,356,358,360,361,362,364,366,367,368,370,372,374,375,376,379,381,385,387,391,395,397,399,406,408,409,410,412,413,414,416,417,418,419,420,422,424,425,426,428,429,430,433,435,437,441,443,447,449,453,457,460,461,462,464,465,466,467,468,470,472,473,474,476,477,478,480,481,482,484,491,493,495,497,505,507,509,511,514,515,516,517,518,520,522,523,524,526,527,528,529,530,531,532,534,536,537,538];
    var lab2 = [28,29,30,32,33,34,36,37,38,39,40,41,42,44,45,46,47,48,49,50,51,52,55,57,59,63,67,69,71,75,82,84,85,86,88,89,90,91,92,94,96,98,100,101,102,103,104,105,106,109,115,117,119,123,125,157,133,136,137,138,139,140,141,142,144,146,148,149,150,152,154,155,156,158,159,160,171,173,175,183,187,190,191,192,194,195,196,197,198,200,202,204,205,206,207,208,210,211,212,214,217,219,221,229,235,239,241,244,246,247,248,249,250,251,252,253,254,256,257,258,259,260,262,263,264,266,268,281,283,287,289,291,293,298,299,300,302,303,304,306,307,308,310,311,312,314,316,318,320,321,322,325,327,329,331,333,339,341,343,345,349,352,354,355,356,358,359,360,361,362,363,364,366,368,369,370,372,373,374,376,379,387,391,393,397,403,406,408,409,410,411,412,414,415,416,418,420,421,422,424,426,427,428,429,430,433,435,439,445,449,453,455,460,462,463,464,466,468,469,470,471,472,474,475,476,477,478,480,482,483,484,487,491,493,495,501,505,511,514,515,516,517,518,520,522,523,524,525,526,528,529,530,532,533,534,535,536,537,538];
    var lab5 = [28,29,30,31,32,33,34,35,36,38,39,40,41,42,43,44,45,46,48,49,50,52,55,57,60,62,65,71,73,75,77,79,82,84,85,87,89,90,91,92,94,95,96,98,100,101,102,104,105,106,121,123,125,129,136,137,138,139,140,141,142,143,144,145,146,147,148,150,151,152,154,155,156,157,158,159,160,163,173,181,185,187,190,192,193,194,195,196,198,200,201,202,204,205,206,208,210,211,212,214,217,223,225,229,231,233,235,244,245,246,247,248,249,250,252,253,254,255,256,258,260,262,263,264,265,266,267,268,271,285,287,295,298,300,302,303,304,305,306,307,308,309,310,311,312,314,316,317,318,320,321,322,325,327,329,341,345,347,349,352,353,354,356,357,358,359,361,362,363,364,365,366,367,368,369,370,371,372,373,374,376,379,383,395,403,406,408,410,411,412,413,414,415,416,417,418,419,420,422,424,425,426,428,429,430,433,434,435,447,452,455,460,462,464,465,466,467,468,470,471,472,474,475,476,478,479,480,481,482,483,484,487,491,497,503,511,514,515,516,517,518,519,520,521,522,523,524,526,527,528,529,530,532,533,534,535,536,537,538];
    var labirynty = [lab0, lab1, lab2, lab5];

open.on("click", function(){
    startBtn1.show();
    startBtn2.show();
    open.hide();
    socket = io.connect('http://' + location.host);
    socket.on('connect', function () {
        console.log('Nawiązano połączenie przez Socket.io');
        socket.emit('getPlayerList', 'getPlayerList');
    });
    socket.on("error", function (err) {
        console.log('Błąd połączenia z serwerem: ' + JSON.stringify(err));
    });
    socket.on("playerLogIn", function(data){
        info.append(data.html);
        if (data.id == 1) {
            startBtn1.attr('disabled', 'disabled');
        }else if (data.id == 2) {
            startBtn2.attr('disabled', 'disabled');
        }
    });
    socket.on('startGame', function(labiryntId) {
        generateGameArea(playerId, labiryntId);
    });
    socket.on('updatePosition', function(data) {
        secPlayerPosition = data;
        updateRadar(findRadarPosition(secPlayerPosition), 're', 'rne');
    });
    
});

startBtn1.on('click', function(){
    startGame(startBtn1);
    startBtn2.attr('disabled', 'disabled');
    playerId = 'p';
    secPlayerId = 'c';
}); 
startBtn2.on('click', function(){
    startGame(startBtn2);
    startBtn1.attr('disabled', 'disabled');
    playerId = 'c';
    secPlayerId = 'p';
});

var startGame = function(button) {
        socket.emit("login", button.text());
        socket.emit('askForStart', 'askForStart');
};

var generateGameArea = function(playerId, labiryntId) {
    labiryntFloors = labirynty[labiryntId];
    for (var i = 0; i < 567; i++) {  
        //if (isInArray(i, labiryntFloors)) { gameArea.append('<div class="f" data-id='+i+'></div>'); } else{ gameArea.append('<div class="w" data-id='+i+'></div>');    };
        gameArea.append('<div class="h" data-id='+i+'></div>');
    }
    setPlayerFirstPosition(playerId);
    generateRadarArea();
};
var generateRadarArea = function() {
    for (var i = 0; i < 64; i++) {
       radarArea.append('<div class="re" data-id='+i+'></div>');
   }
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
    var klasa;    if (playerId == 'p') { klasa = '.p';} else {klasa = '.c';}
    var position = gameArea.find(klasa).data('id');
    if (key == 'up') {
        if (isInArray(position-27, labiryntFloors)) {
            changeBackground(playerId,position);
            position -= 27;
            updateGameArea(position);
        }
    } else if (key == 'down') {
        if (isInArray(position+27, labiryntFloors)) {
            changeBackground(playerId,position);
            position += 27;
            updateGameArea(position);
        }
    } else if (key == 'left') {
        if (isInArray(position-1, labiryntFloors)) {
            changeBackground(playerId,position);
            position -= 1;
            updateGameArea(position, -1);
        }
    } else if (key == 'right') {
        if (isInArray(position+1, labiryntFloors)) {
            changeBackground(playerId,position);
            position += 1;
            updateGameArea(position);
        }
    }
};

var updateGameArea = function(position){
    gameArea.find('.f[data-id="'+position+'"]').removeClass('f').addClass(playerId);
    showAreaNearPlayer(position);
    checkCollision(position);
    socket.emit('updateMyPosition', position);
};

var checkCollision = function(position) {
    if (position-1 == secPlayerPosition) {
        gameArea.find('.f[data-id="'+(position-1)+'"]').removeClass('h').addClass(secPlayerId);
        alert('znalazłeś');
    }else if (position+1 == secPlayerPosition) {
        gameArea.find('.f[data-id="'+(position+1)+'"]').removeClass('h').addClass(secPlayerId);
        alert('znalazłeś');
    }else if (position-27 == secPlayerPosition) {
        gameArea.find('.f[data-id="'+(position-27)+'"]').removeClass('h').addClass(secPlayerId);
        alert('znalazłeś');
    }else if (position+27 == secPlayerPosition) {
        gameArea.find('.f[data-id="'+(position+27)+'"]').removeClass('h').addClass(secPlayerId);
        alert('znalazłeś');
    }
};  

var setPlayerFirstPosition = function(playerId) {
    rand = labiryntFloors.randomElement();
    playerPosition = gameArea.find('.h[data-id="'+rand+'"]');
    playerPosition.removeClass('h').addClass(playerId);
    showAreaNearPlayer(rand);
};

var changeBackground = function(selector, position) {
    if (isInArray(position, labiryntFloors)) {
      gameArea.find('.'+selector+'[data-id="'+(position)+'"]').removeClass(selector).addClass('f');  
    } else{
        gameArea.find('.'+selector+'[data-id="'+(position)+'"]').removeClass(selector).addClass('w');  
    }
};

var findRadarPosition = function(id) {//id - pozycja gracza w gamearea
    var kol;//w ktorej kolumnie znajduje sie player
    var wiersz;//w ktorym wierszu
    var idRadar;
    //znajduje kolumnę/4 i wiersz 
    for (var i = 0; i < 20; i++) {//petla przechodzi po wierszach
        if ((i*27 <=id) && (id <= i*27+2)) {
            wiersz = i;
            kol = 1;
        }else if ((i*27+3 <=id) && (id <= i*27+5)) {
            wiersz = i;
            kol = 2;
        }else if ((i*27+6 <=id) && (id <= i*27+9)) {
            wiersz = i;
            kol = 3;
        }else if ((i*27+10 <=id) && (id <= i*27+12)) {
            wiersz = i;
            kol = 4;
        }else if ((i*27+13 <=id) && (id <= i*27+15)) {
            wiersz = i;
            kol = 5;
        }else if ((i*27+16 <=id) && (id <= i*27+18)) {
            wiersz = i;
            kol = 6;
        }else if ((i*27+19 <=id) && (id <= i*27+22)) {
            wiersz = i;
            kol = 7;
        }else if ((i*27+23 <=id) && (id <= i*27+26)) {
            wiersz = i;
            kol = 8;
        }
    }
    //zamienia wyniki na id radaru
    if ((1<=wiersz) && (wiersz<=2)) {
        idRadar = -1 + kol;
    }else if ((3<=wiersz) && (wiersz<=4)) {
        idRadar = 7 + kol;
    }else if ((5<=wiersz) && (wiersz<=6)) {
        idRadar = 15 + kol;
    }else if ((7<=wiersz) && (wiersz<=9)) {
        idRadar = 23 + kol;
    }else if ((10<=wiersz) && (wiersz<=11)) {
        idRadar = 31 + kol;
    }else if ((12<=wiersz) && (wiersz<=14)) {
        idRadar = 39 + kol;
    }else if ((15<=wiersz) && (wiersz<=16)) {
        idRadar = 47 + kol;
    }else if ((17<=wiersz) && (wiersz<=19)) {
        idRadar = 55 + kol;
    }
    return idRadar;
};

var updateRadar = function(position, before, after) {
    radarArea.find('.rne').removeClass('rne').addClass('re');
    radarArea.find('.'+before+'[data-id="'+position+'"]').removeClass(before).addClass(after);
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
};
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

});
