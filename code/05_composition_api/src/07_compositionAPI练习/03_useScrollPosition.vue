<template>
  <div>
    <p class="content"></p>
    <div class="scroll">
      <div class="srollx">srollx:{{ scrollX }}</div>
      <div class="srolly">srolly:{{ scrollY }}</div>
    </div>
  </div>
</template>

<script>
import useSrollPositon from './hooks/useScrollPosition'
export default {
  setup() {
    //滚动位置
    const {scrollX,scrollY}=useSrollPositon()

    return {
      scrollX,
      scrollY
    }
  }

}
</script>

<style scoped>
.content {
  display: inline-block;
  width: 1000px;
  height: 3000px;
}

.scroll {
  position: fixed;
  right: 40px;
  bottom: 20px;
}
</style>