<template>
  <div>
    <show-names :names="names">
    <!-- 需要获取ShowNames.vue里的item -->
    <template v-slot="slotProps">
    <button>{{slotProps.index}}-{{slotProps.item}}</button>
    </template>
    </show-names>
    <show-names :names="names">
    <!-- 需要获取ShowNames.vue里的item -->
    <template v-slot="slotProps">
    <i>{{slotProps.item+' '}}</i>
    </template>
    </show-names>
    
    <show-names :names="names" v-slot="slotProps">
    <div>{{"独占默认插槽的缩写"+slotProps.item}}</div>
    </show-names>
  </div>
</template>

<script>
  import ShowNames from './ShowNames.vue'
  export default {
    components:{
      ShowNames
    },
    data(){
      return {
        names:['a','b','c','d']
      }
    }
  }
</script>

<style scoped>

</style>