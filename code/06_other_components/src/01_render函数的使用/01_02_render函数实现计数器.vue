<script>
import { h } from 'vue'
export default {
  data() {
    return {
      counter: 0
    }
  },
  render() {
    return h('div', null, { class: "app" }, [
      h('h2', null, `当前计数${this.counter}`),
      h('button', {
        onclick: () => this.counter++
      }, '+'),
      h('button', {
        onclick: () => this.counter--
      }, '-'),
    ])
  }
}
</script>

<style scoped>
</style>