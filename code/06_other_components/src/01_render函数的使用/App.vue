<script>
import { h } from 'vue'
import HelloWorld from "./HelloWorld.vue";
export default {
  render(){
    return h(HelloWorld,null,{
      default:(props)=>{
        return h('span',null,`app传入helloworld中的内容${props.name}`)
      }
    })
  }

}

</script>

<style scoped>
</style>