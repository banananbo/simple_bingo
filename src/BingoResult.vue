<template>
<div>
    <Header></Header>
    <div class="container-fluid text-center">
     <h5>bingo results</h5>
     <BingoView :bingo="this.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div>
        <ul class="list-group list-group-horizontal  mx-auto" style="max-width: 80%;">
            <li class="list-group-item">score:{{this.bingo.score}}</li>
            <li class="list-group-item">bingo:{{this.bingo.bingonum}}</li>
            <li class="list-group-item">time:{{this.bingo.spentTime}}</li>
        </ul>
    </div>
    <button @click="clickTopBtn">TOPへ</button>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import BingoView from "./BingoView.vue";

export type DataType ={
    size: number,
    bingo: Bingo
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 40,
            bingo: null,
        };
    },
    computed:{

    },

    props: {

    },
    created(){
        this.bingo = this.$store.state.bingo
        this.$store.state.bingo = null;
    },

    components: {
        Header,
        BingoView,
    },

    methods: {
        clickTopBtn:function(){
            this.$router.push('/');
        }
  },
});
</script>
<style scoped>
</style>