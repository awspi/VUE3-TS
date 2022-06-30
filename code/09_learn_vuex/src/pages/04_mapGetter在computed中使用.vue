<template>
  <div>
    <h2>HOME</h2>
    <h2>totoalPrice:{{$store.getters.totalPrice}}</h2>
    <h2>2Price:{{$store.getters.priceGreaterN(2)}}</h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
  export default {
    computed:{
      ...mapGetters(['totalPrice','currentDiscount','priceGreaterN']),
      ...mapGetters({
        stotalPrice:'totalPrice'
      })
    }
  }
</script>

<style scoped>

</style>