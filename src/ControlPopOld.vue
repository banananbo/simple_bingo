<template>
<div class="mymodal">
    <div class="modal__bg">
     <div class="modal__content rounded">
         <ContentView :size="100" :content="cell.content"></ContentView>
         <p>{{cell.content.title}}</p>
         <button @click="submitContent">見つけた！</button>
         <button @click="cancelContent">とりけす</button>
    </div>
    </div>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import BingoView from "./BingoView.vue";
import ContentView from "./ContentView.vue";

export type DataType ={
    
}

export default Vue.extend({
    data(): DataType {
        return {

        };
    },

    props: {
        cell:Cell
    },
    mounted(){
    },

    components: {
ContentView
    },

    methods: {
        submitContent:function(){
            this.$emit('submit',{cell:this.cell});
        },
        cancelContent:function(){
            this.$emit('cancel',{cell:this.cell});
        },
  },
});
</script>
<style scoped>
.mymodal{
    height: 100vh;
    position: fixed;
    top: 0;
    width: 100%;
}
.modal__bg{
    background: rgba(255, 243, 243, 0.8);
    height: 100vh;
    position: absolute;
    width: 120%;
}
.modal__content{
    background: #fff;
    /* left: 50%; */
    padding: 10px;
    position: absolute;
    top: 50%;
    transform: translate(-70%,-50%);
    width: 250px;
    overflow: auto;
    height: 250px;
}
</style>