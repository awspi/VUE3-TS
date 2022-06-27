
<script>
import { h } from "vue";

export default{
  render(){
    return h('div',null,[
      h('h2',null,'helloworld'),
      this.$slots.default?this.$slots.default({name:'pithy'}):h('span',null,"helloworld插槽默认值")
    ])
  }
}

</script>

<style scoped>

</style>