<script>
import { h,ref } from 'vue'
export default {
  setup(){
    const counter=ref(0);
    return ()=>{
      return h('div', null, { class: "app" }, [
        h('h2', null, `当前计数${counter.value}`),
        h('button', {
          onclick: () =>counter.value++
        }, '+'),
        h('button', {
          onclick: () => counter.value--
        }, '-'),
      ])
    }
  }

}

</script>

<style scoped>
</style>