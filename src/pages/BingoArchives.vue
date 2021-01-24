<template>
<div>
    <Header></Header>
    <h5>みんなのビンゴ</h5>
    <div  v-for="(bingo,idx) in this.$store.state.recent_archives" :key="idx">
        <ResultCard :size="size" :bingo="bingo"></ResultCard>
    </div>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import ResultCard from "@organisms/ResultCard.vue";

export type DataType ={
    size: number,
    bingo: Bingo
}

export default Vue.extend({
    data(): DataType {
        return {
            size: screen.width - 60,
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