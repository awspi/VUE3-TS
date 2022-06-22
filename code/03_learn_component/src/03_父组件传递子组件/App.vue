<template>
  <div>
    <mult-root-element id="111"></mult-root-element>
    <show-message1 class="
    123" title="title1" content="cont1"></show-message1>
    <show-message1 title="title2" content="cont2"></show-message1>
    <show-message1 :title="title" :content="content"></show-message1>
    <show-message1 :title="msg.title" :content="msg.content"></show-message1>
    <show-message1 v-bind="msg"></show-message1>
    <div>——————————————————————</div>
    <show-message2 title="title1" content="cont1"></show-message2>
    <show-message2 title="title2" content="cont2"></show-message2>
    <show-message2 :title="title" ></show-message2>
    <show-message2 :title="msg.title" :content="msg.content"></show-message2>
    <show-message2 v-bind="msg"></show-message2>

  </div>
</template>

<script>
import ShowMessage1 from './ShowMessage1.vue'
import ShowMessage2 from './ShowMessage2.vue'
import MultRootElement from './MultRootElement.vue'

  export default {
    components:{
      ShowMessage1,
      ShowMessage2,
      MultRootElement
    },
    data(){
      return {
        title:'xixi',
        content:'haha',
        msg:{
          title:"msg's title",
          content:"msg's content",
        }
      }
    }
  }
</script>

<style scoped>

</style>