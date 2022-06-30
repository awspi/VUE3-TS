<template>
  <div>
    <h2>counter:{{ $store.state.rootCounter }}</h2>
    <h2>counter:{{ $store.state.home.homeCounter }}</h2>
    <h2>counter:{{ $store.state.user.userCounter }}</h2>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
</style>