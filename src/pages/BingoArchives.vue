<template>
<div>
    <Header></Header>
    <h5>{{$t("lead.everyones_bingo")}}</h5>
    <div  v-for="(bingo,idx) in this.$store.state.archives.recent_archives" :key="idx">
        <ResultCard :bingo="bingo" :enable_copy="true"></ResultCard>
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
    bingo: Bingo
}

export default Vue.extend({
    data:function():DataType {
        return {
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