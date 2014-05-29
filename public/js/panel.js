/*jslint browser: true, jquery: true, devel: true */
$(function () {
    var main = document.getElementById('calc'),
        rows = document.querySelectorAll('span'),
        inputs = document.querySelectorAll('input.score'),
        result = document.createElement('div'),
        nameinp = document.getElementById('name'),
        sendbtn = document.getElementById('sendbtn'),
        focusEH,
        blurEH,
        validate,
        recalc,
        i,
        inp,
        sty,
        results = {},
        lastSel;

    result.style.backgroundColor = '#dddddd';
    result.style.color = 'red';
    result.style.fontWeight = 'bold';
    result.style.width = '4em';
    result.style.border = '1px solid black';
    result.style.margin = '0.4ex auto 0.8ex auto';
    result.sum = 0;
    result.innerHTML = '0.0';

    main.appendChild(result);
    sendbtn.setAttribute('disabled','disabled');

    focusEH = function () {
        this.style.fontWeight = 'normal';
        this.style.backgroundColor = 'yellow';
    };

    blurEH = function () {
        this.style.fontWeight = 'normal';
        this.style.backgroundColor = '#eeeeee';
    };

    validate = function (e) {
        var key = e.keyCode;
        if ((key < 48 || key > 57) && !(key === 8 || key === 9 || key === 13 || key === 37 || key === 39 || key === 46)) {
            e.preventDefault();
        }
    };

    recalc = function () {
        var num = parseInt(this.value, 10);
        if (this.intValue !== num) {
            result.sum = result.sum - this.intValue + num;
            this.intValue = num;
            result.innerHTML =  (result.sum / rows.length).toFixed(2);
        }
        sendbtn.removeAttribute('disabled');
    };
    
    nameinp.textContent = '';
    for (i = 0; i < inputs.length; i += 1) {
        inp = inputs[i];
        // definiujemy atrybuty
        inp.setAttribute('maxlength', '2');
        inp.setAttribute('tabindex', (i % 5) * rows.length + Math.floor(i / 5) + 2);
        // inicjalizujemy wartość
        inp.intValue = 0;
        inp.value = '';
        // dodajemy procedury obsługi zdarzeń
        inp.addEventListener('focus', focusEH, false);
        inp.addEventListener('blur', blurEH, false);
        inp.addEventListener('keydown', validate, false);
        inp.addEventListener('change', recalc, false);
    }
    sendbtn.setAttribute('tabindex', inputs.length+2);
    
    var choose = function () {
        var name = this.getAttribute('data-name');
        var res = results[name];
        if (lastSel) {
            lastSel.style.backgroundColor = 'transparent';
        }
        sendbtn.setAttribute('disabled','disabled');
        this.style.backgroundColor = 'yellow';
        lastSel = this;
        nameinp.textContent = name;
        result.sum = 0.0;
        for (i = 0; i < inputs.length; i += 1) {
            inp = inputs[i];
            inp.intValue = 0;
            if (res) {
                inp.value = (res[i] ? res[i] : '');
                inp.intValue = parseInt(inp.value, 10);
                result.sum += parseInt(res[i], 10);
            } else {
                inp.value = '';
            }
        }
        result.innerHTML =  (result.sum / rows.length).toFixed(2);
    };
    
    sendbtn.addEventListener('click', function () {
        var name = nameinp.textContent;
        var i, v;
        results[name] = [];
        for (i = 0; i < inputs.length; i += 1) {
            v = inputs[i].value;
            results[name].push((v ? parseInt(v, 10) : 0));
        }
        console.log(results[name]);
        $.ajax({
            url: '/result/' + lastSel.getAttribute('data-no'),
            type: 'POST',
            data: {result: results[name]}
        }).done(function (data) {
            console.log('wysłano wynik' + data);
        });
    }, false);
    
    $.ajax({
        url: "/list"
    }).done(function (data) {
        data.forEach(function (el) {
            var li = $('<li data-name="' + el.name + '" data-no=' + el.no + '>' + el.name + '</li>');
            li.click(choose);
            $('#list').append(li);
            if (el.result) {
                results[el.name] = [];
                el.result.forEach(function (e, idx) {
                    results[el.name][idx] = parseInt(e, 10);
                });
            }
        });
    });
});
