"use strict";

var callable = require("../../object/valid-callable")
  , aFrom    = require("../../array/from");

var apply = Function.prototype.apply
  , call = Function.prototype.call
  , callFn = function (arg, fn) { return call.call(fn, this, arg); };

module.exports = function (fnIgnored/*, …fnn*/) {
	var fns, first;
	fns = [this].concat(aFrom(arguments));
	fns.forEach(callable);
	fns = fns.reverse();
	first = fns[0];
	fns = fns.slice(1);
	return function (argIgnored) { return fns.reduce(callFn, apply.call(first, this, arguments)); };
};
