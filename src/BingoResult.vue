<template>
<div>
    <Header></Header>
    <h5>bingo results</h5>
    <div v-for="(bingo,idx) in this.$store.state.my_bingo_archives" :key="idx">
        <div class="container-fluid text-center">
        <BingoView :bingo="bingo" :size="size"></BingoView>
        </div>
        <div>
            <ul class="list-group list-group-horizontal  mx-auto" style="max-width: 80%;">
                <li class="list-group-item">score:{{bingo.score}}</li>
                <li class="list-group-item">bingo:{{bingo.bingonum}}</li>
                <li class="list-group-item">time:{{bingo.spentTime}}</li>
            </ul>
        </div>
        <p>{{bingo.memo}}</p>
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
        // this.bingo = this.$store.state.my_bingo_archives[0];
        // this.$store.state.bingo = null;
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