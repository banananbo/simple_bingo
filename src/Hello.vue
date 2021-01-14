<template>
  <div>
    <p>{{ greeting }} World!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: ''
    };
  },
  created() {
    this.greeting = 'hello';
  }
}
</script>
<style scoped>
p{
    font-size: 2em;
    text-align: center;
}
</style>