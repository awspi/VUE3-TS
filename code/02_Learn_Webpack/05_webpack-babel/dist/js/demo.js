"use strict";

var msg = "hello world";
var name = ['abc', 'bcd', 'efg'];
name.forEach(function (item) {
  return console.log("".concat(msg).concat(item));
});