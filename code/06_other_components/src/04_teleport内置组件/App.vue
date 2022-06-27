<template>
  <div>
    <teleport to="#here">
    <h2>teleport1</h2>
    </teleport>
    <teleport to="#here">
    <h2>teleport2</h2>
    </teleport>
  </div>
</template>

<script>
  import { getCurrentInstance } from "vue";
  export default {
    setup(){
      const instance=getCurrentInstance()
      console.log(instance.appContext.config.globalProperties);
    }
  }
</script>

<style scoped>

</style>