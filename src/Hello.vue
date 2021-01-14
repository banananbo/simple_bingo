<template>
  <div>
    <p>{{ computed_greeting }} World!</p>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      greeting: ''
    };
  },
  created() {
    this.greeting = 'hello';
  },
  computed:{
      computed_greeting(){
          return this.greeting;
      }
  }
}
</script>
<style scoped>
p{
    font-size: 2em;
    text-align: center;
}
</style>