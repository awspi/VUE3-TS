<template>
  <div>
    <button @click="title=title+'#'">changeTitle</button>
  </div>
</template>

<script>
import useTitle from './hooks/useTitle'
export default {
  setup() {
    const title=useTitle('abc')
    
    return {
      title
    }
  }
}
</script>

<style scoped>
</style>