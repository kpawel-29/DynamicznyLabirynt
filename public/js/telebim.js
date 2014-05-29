/*jshint browser: true, jquery: true, devel:true */
/*global io: false */
$(function () {
    var status = document.getElementById("status");
    var open = document.getElementById("open");
    var close = document.getElementById("close");
    var message = $("#results");
    var socket;
    
    status.textContent = "Brak połączenia";
    close.disabled = true;

    // Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
    open.addEventListener("click", function (event) {
        open.disabled = true;
        socket = io.connect('http://' + location.host);

        socket.on('connect', function () {
            close.disabled = false;
            status.src = "img/bullet_green.png";
            console.log('Nawiązano połączenie przez Socket.io');
            socket.emit('getlist', 'getlist');
        });
        
        socket.on('disconnect', function () {
            open.disabled = false;
            status.src = "img/bullet_red.png";
            console.log('Połączenie przez Socket.io zostało zakończone');
        });
        
        socket.on("error", function (err) {
            console.log('Błąd połączenia z serwerem: ' + JSON.stringify(err));
        });
        
        socket.on("result", function (data) {
            var suma = 0;
            data.result.forEach(function (n) {
                suma += parseInt(n, 10);
            });
            var wynik = (suma / 3).toFixed(2);
            //jezeli juz jest na liscie to update wyniku

            var nieznaleziono = true;
            var el = $('#results').find('.wyniki[data-no="'+data.no+'"]');

            if($(el).length != 0){
                alert("wchodzi w html");
                $(el).find('.wyniki[data-no="'+data.no+'"]').text(data.no + '. ' + data.name + '<span><b>' + wynik + '</b></span>');
                /*$(el).html('<div class="wyniki" data-no="' + data.no + '" data-wynik="' + wynik + '">' +
                    data.no + '. ' + data.name + '<span><b>' + wynik + '</b></span></div>');*/
                nieznaleziono = false;
            }
            if (nieznaleziono) {
                alert("wchodzi w append");
                message.append('<div class="wyniki" data-no="' + data.no + '" data-wynik="' + wynik + '">' +
                    data.no + '. ' + data.name + '<span><b>' + wynik + '</b></span></div>');
            };
            //sortuj
            var lista = $(message).find('.wyniki');
            var posortowane = lista;
            posortowane = $(lista).sort(function (a, b) {
                var aWynik = parseFloat($(a).attr("data-wynik")),
                    bWynik = parseFloat($(b).attr("data-wynik")),
                    aNo = parseInt($(a).attr("data-no")),
                    bNo = parseInt($(b).attr("data-no"));

                if (aWynik === bWynik) {
                    if (aNo < bNo) {return -1} else{return 1};
                } else {
                    if (aWynik < bWynik) {return 1} else{return -1};
                }
            });
            //sortuj
            
            $(message).html(posortowane);
        });
    });

    // Zamknij połączenie po kliknięciu guzika „Rozłącz”
    close.addEventListener("click", function (event) {
        close.disabled = true;
        message.text('');
        socket.disconnect();
    });

});
