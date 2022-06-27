<script>
import { ref } from "vue";
import HelloWorld from "./HelloWorld.vue";
export default {
  setup() {
    const counter = ref(1)
    const increment = () => counter.value++
    const decrement = () => counter.value--
    return {
      counter,
      increment,
      decrement
    }
  },
  render() {
    return (
      <div>
        <h2>当前计数{this.counter}</h2>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <HelloWorld>
          {{ default: props => <button>按钮</button> }}
        </HelloWorld>
      </div>
    )
  }

}
</script>

<style scoped>
</style>