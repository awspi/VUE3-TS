// import "css-loader!../css/style.css"
import "../css/style.css"
import "../css/test.less"
import "../css/testpostcss.css"

const divEL=document.createElement("div");
divEL.className="title"
divEL.innerHTML="hello webpack"

document.body.appendChild(divEL);