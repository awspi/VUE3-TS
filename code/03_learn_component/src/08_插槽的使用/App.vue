<template>
  <div>
    <my-slot-cpn>
    </my-slot-cpn>

    <my-slot-cpn>
      <button>btn</button>
    </my-slot-cpn>
    <my-slot-cpn>
      <my-button></my-button>
    </my-slot-cpn>

    <my-slot-cpn>
      <h3>1</h3>
      <h3>2</h3>
      <h3>3</h3>
    </my-slot-cpn>
  </div>
</template>

<script>
import MySlotCpn from './MySlotCpn.vue' 
import MyButton from './MyButton.vue' 
  export default {
    components:{
      MySlotCpn,
      MyButton
    }
  }
</script>

<style scoped>

</style>