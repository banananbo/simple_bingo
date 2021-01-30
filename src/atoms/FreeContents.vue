<template>
<div class="wrap" :style="{width:`${size}px`}">
  <div class="sticker" :style="{width:`${size}px`,height:`${size}px`}"></div>
  <div class="msg" :style="{width:`${size}px`}">FREE</div>
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
        size: {
            type: Number,
            required: true
        },
    },

    methods: {
        toggleSetting:function(){
            this.$store.state.allow_location = !this.$store.state.allow_location
        },
  },
});
</script>
<style scoped>
body {padding:4em; background:#fcfcfc;}

.wrap {margin:auto;  z-index:1;}

.msg {
  color: whitesmoke;
  text-align:center;
  font-family: 'Bree Serif', Courier, monospaced;
  font-size:3.5em;
  position:absolute;
  margin:55px 0 0 2px;
  pointer-events: none; 
}

.sticker {
  position:absolute;
  background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/13034/sticker.png) top center no-repeat; 
  animation: spin 10s linear infinite;
  /*Set our animation play state to paused initially */
  animation-play-state: paused; 
}

.sticker:hover {
  /* Toggle our animation play state to running when we are hovering over our sticker */
  animation-play-state: running;
}


@keyframes spin {
  100% {transform: rotate(1turn); }
}
</style>