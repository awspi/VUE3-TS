<template>
  <div>
    <p class="content"></p>
    <div class="mouse">
      <div class="mousex">mousex:{{ mouseX }}</div>
      <div class="mousey">mousey:{{ mouseY }}</div>
    </div>
  </div>
</template>

<script>
import useMousePosition from './hooks/useMousePostion'
export default {
  setup() {
    const {mouseX,mouseY}=useMousePosition()

    return {
      mouseX,
      mouseY
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

.mouse {
  position: fixed;
  left: 40px;
  bottom: 20px;
}
</style>