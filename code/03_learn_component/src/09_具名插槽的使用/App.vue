<template>
  <div>
    <nav-bar :dyName="name">
    
      <template v-slot:left>
        <button>left</button>
      </template>
      <template #center>
        <h2>title</h2>
      </template>
      <template #right>
        <button>right</button>
      </template>
      <template #[name]>
        <button>additon</button>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from './NavBar.vue'
  export default {
    components:{
      NavBar
    },
    data(){
      return {
        name:"dyName1"
      }
    }
  }
</script>

<style scoped>

</style>