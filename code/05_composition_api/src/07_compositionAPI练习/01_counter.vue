<template>
  <div>
    <h2>{{ counter }}</h2>
    <h2>{{ doubleCounter }}</h2>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { useCounter } from './hooks/useCounter'
export default {
  setup() {
    // const { counter, doubleCounter,increment, decrement} = useCounter()

    return {
      ...useCounter()
    }
  }
}
</script>

<style scoped>
</style>