
import { sum } from './js/math';
import './css/style.css'
import './css/title.less'
import mul from './ts/mul'

const divEl=document.createElement('div');
divEl.innerText='HELLO Vite';
divEl.className='title'
document.body.appendChild(divEl)
console.log(sum(20,30));
console.log(mul(20,30));
//
import App from './vue/App.vue' 
import {createApp} from 'vue'
createApp(App).mount("#app");
