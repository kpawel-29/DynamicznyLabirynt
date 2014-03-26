/*jshint globalstrict: true, devel: true */
'use strict';
var _ =  require("underscore");

var defFun = function(fun, types) {
	if ( typeof fun == 'function') {
		fun.typeConstr = types;
	}
	return fun;
};

var myfun = defFun(function (a, b) {
	return a + b;
}, ['number', 'number']);

var appFun = function(f) {
	
	var arr = _.toArray(f.typeConstr);
	for (var i = 1; i < arguments.length; i++) {
		if (typeof arguments[i] !== arr[i-1]) {
			throw({ typerr: "argument: "+i+" spowodował błąd, spodziewaliśmy się '"+arr[i-1]+"' a dostaliśmy: "+ typeof arguments[i] });
		}
	}	
	//_.toArray(arguments).slice(1)
	arr = _.toArray(arguments).slice(-2);
	//console.log(arr);
	return f.apply(this, arr);
	
};

try {
    console.log(appFun(myfun, 185, 15));
} catch (e) {
    console.log(e.typerr);
}










