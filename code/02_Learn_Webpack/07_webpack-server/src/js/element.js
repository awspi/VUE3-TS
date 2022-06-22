// import "css-loader!../css/style.css"
import "../css/style.css"
import "../css/test.less"
import "../css/testpostcss.css"
import '../css/image.css'
import '../font/iconfont.css'

import zzhnImg from '../img/zznh.png'

//设置标签
const divEL=document.createElement("div");
divEL.className="title"
divEL.innerHTML="hello webpack"
document.body.appendChild(divEL);
//设置背景图片
const bgDivEl=document.createElement('div')
bgDivEl.className="image-bg"
document.body.appendChild(bgDivEl);
//设置img元素src
const imgEl=document.createElement('img')
imgEl.src=zzhnImg
document.body.appendChild(imgEl);
//设置字体图标 i元素
const iEl=document.createElement('i')
iEl.className='icon-ashbin'
document.body.appendChild(iEl);


console.log('ele changed');