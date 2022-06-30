<template>
  <div>
    <h2>HOME</h2>
    <h2>{{ totalPrice }}</h2>
  </div>
</template>
<script>
import { useGetters } from "../hooks/useGetters";
export default {
  setup() {
    const storeGetters = useGetters(['totalPrice', 'currentDiscount', 'priceGreaterN'])

    return {
      ...storeGetters
    }
  }
}
</script>

<style scoped>
</style>