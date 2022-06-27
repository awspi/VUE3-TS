<script>
export default {
  render() {
    return (
      <div>
        <h2>HelloWorld</h2>
        {this.$slots.default ? this.$slots.default() : <span>nothing</span>}
      </div>
    )
  }

}
</script>

<style scoped>

</style>