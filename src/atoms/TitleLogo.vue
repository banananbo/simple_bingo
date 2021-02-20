<template>
<div class="logo">
  <div class="logo_inner">
    <strong>{{subtitle}}</strong>
    <span class="blue">{{title}}</span>
  </div>
</div>
</template>
<script lang="ts">
import Vue from "vue"

export type DataType ={
}

export default Vue.extend({

    data(): DataType {
        return {
        };
    },

    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        },
    },

  //   methods: {
  //       toggleSetting:function(){
  //           this.$store.state.allow_location = !this.$store.state.allow_location
  //       },
  // },
});
</script>
<style scoped>

@keyframes fuwa {
    0% { transform:scale(1,1); }
  50% { transform:scale(1.1,1.1); }
  100% { transform:scale(1,1); }
}

.logo {
  margin: 0 auto;
  padding: 10px;
  /* animation: fuwa 3s ease-in-out infinite; */
}

.logo_inner {
  border-radius: 3px;
  color: #37bcf2;
  font-family:"Maru Folk Heavy", sans-serif;
  font-size: 2em;
  font-style: bold;
  letter-spacing: 0;
  line-height: 1.2;
  padding: 3px 0;
  text-shadow: 2px 2px 0 #fff, 5px 5px 0 #dfe8f1;
  text-align: center;
}

.logo_inner .blue{
  font-size: 1.2em;
  color: #5856d0;
  font-weight: 900;
}

.logo_inner .last{
  letter-spacing: 10px;
}

.logo_inner strong {
  display: block;
  color: #e97792;
  font-size: 0.8em;
  font-family: "Maru Folk Medium", sans-serif;
  letter-spacing: 2px;
  text-shadow: 1px 1px 0 #fff, 3px 3px 0 #f1e3df;
}
</style>