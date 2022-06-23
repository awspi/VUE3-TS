<template>
  <div>
    <h2>{{title}}</h2>
    <h2>{{content}}</h2>
    <h2>{{length}}</h2>
  </div>
</template>

<script>
  export default {
    inject:['title','content','length']
  }
</script>

<style scoped>

</style>