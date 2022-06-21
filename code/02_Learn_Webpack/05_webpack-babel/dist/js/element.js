"use strict";

require("../css/style.css");

require("../css/test.less");

require("../css/testpostcss.css");

require("../css/image.css");

require("../font/iconfont.css");

var _zznh = _interopRequireDefault(require("../img/zznh.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import "css-loader!../css/style.css"
//设置标签
var divEL = document.createElement("div");
divEL.className = "title";
divEL.innerHTML = "hello webpack";
document.body.appendChild(divEL); //设置背景图片

var bgDivEl = document.createElement('div');
bgDivEl.className = "image-bg";
document.body.appendChild(bgDivEl); //设置img元素src

var imgEl = document.createElement('img');
imgEl.src = _zznh["default"];
document.body.appendChild(imgEl); //设置字体图标 i元素

var iEl = document.createElement('i');
iEl.className = 'icon-ashbin';
document.body.appendChild(iEl);