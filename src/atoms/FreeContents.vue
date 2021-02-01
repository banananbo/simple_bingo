<template>
<!-- <div class="gizagiza">GIZAGIZA LINE</div> -->
<div class="img_con" :style="{width:`${size}px`,height:`${size}px`}">
    <img src="/img/giza.svg">
    <p>FREE</p>
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
  　},
});
</script>
<style scoped>
.img_con{
    position: relative;
}
.img_con img {
  width: 100%;
  }
.img_con p{
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    margin:0;
    padding:0;
    color: white;
    font-weight: bold;
    font-size: 2em;
    font-family :Quicksand, sans-serif;
}
@keyframes spin {
  100% {transform: rotate(1turn); }
}
</style>