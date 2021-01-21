<template>
<div>
    <Header></Header>
    <h5>bingo results</h5>
    <div  v-for="(bingo,idx) in this.$store.state.my_bingo_archives" :key="idx">
        <ResultCard :size="size" :bingo="bingo"></ResultCard>
    </div>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import ResultCard from "./ResultCard.vue";

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
        Footer,
        ResultCard,
    },

    methods: {

  },
});
</script>
<style scoped>

</style>