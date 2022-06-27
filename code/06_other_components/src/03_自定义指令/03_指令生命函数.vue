<template>
  <div>
    <button v-show="counter>1"  @click='counter--' v-pith>-</button>
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'

export default {
  setup(){
    const counter=ref(3)
    return {
      counter
    }
  },
  directives: {
    pith: {
      created() {
        console.log('created');
      },
      beforeMount() {
        console.log('beforeMount');
      },
      beforeUpdate() {
        console.log('beforeUpdate');
      },
      updated() {
        console.log('updated');
      },
      beforeMount() {
        console.log('beforeMount');
      },
      beforeUnmount() {
        console.log('beforeUnmount');
      },
      unmounted() {
        console.log('unmounted');
      },
    }
  }

}
</script>

<style scoped>
</style>