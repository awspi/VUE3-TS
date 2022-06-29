<template>
  <div>
    <h2>HOME</h2>
    <h2>{{counter}}</h2>
  </div>
</template>
<script>
import { useState } from "../hooks/useState";
  export default {
    setup(){
      const storeState=useState(['counter','name','age'])
      return{
        ...storeState
      }
    }

  }
</script>

<style scoped>

</style>