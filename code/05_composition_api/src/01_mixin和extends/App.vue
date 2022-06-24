<template>
  <div>
    <h2>{{msg}}</h2>
    <button @click="bar">bar</button>
  </div>
</template>

<script>
import { demoMixin } from './mixins/demoMixin'

import BasePage from './pages/BasePage.vue'
  export default {
    extends:BasePage,
    mixins:[demoMixin]
  }
</script>

<style scoped>

</style>