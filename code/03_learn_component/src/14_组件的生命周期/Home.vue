<template>
  <div>
    Home
    <span ref="msg">{{msg}}</span>
    <button @click="btnClick">change</button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        msg:'123'
      }
    },
    methods:{
      btnClick(){
        this.msg+=this.msg
      }
    },
    beforeCreate(){
      console.log('beforeCreate');
    },
    created(){
      console.log('created');
    },
    beforeMount(){
      console.log('beforeMount');

    },
    mounted(){
      console.log('mounted');

    },
    beforeUnmount(){
      console.log('beforeUnmount');

    },
    unmounted(){
      console.log('unmounted');

    },
    beforeUpdate(){
      console.log(this.$refs.msg.innerHTML);
      console.log('beforeUpdate');


    },
    updated(){
      console.log(this.$refs.msg.innerHTML);
      console.log('updated');

    }
  }
</script>

<style scoped>

</style>