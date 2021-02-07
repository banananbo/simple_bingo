<template>
<div>
    <Header></Header>
        <FreeContents :size="120"></FreeContents>
        <button @click="test">test</button>
        <button @click="show_modal=!show_modal">OPEN</button>
        <BingoView :bingo="$store.state.bingo" :size="200"></BingoView>
        <!-- <BingoView :bingo="localbingo" :size="200"></BingoView> -->
        <ResultCard :bingo="$store.state.bingo" :size="200"></ResultCard>
        <BingoView :bingo="localbingo" :size="200"></BingoView>
        <ResultCard :bingo="localbingo" :size="200" :datail_view="true"></ResultCard>
        <TestModal v-if="show_modal" @close="show_modal=false"></TestModal>
    <Footer></Footer>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import TestModal from "@organisms/TestModal.vue";
import BingoView from "@organisms/BingoView.vue";
import ResultCard from "@organisms/ResultCard.vue";
import FreeContents from "@atoms/FreeContents.vue";
import {Bingo} from "@lib/bingo/Bingo";

export type DataType ={
    show_modal: boolean,
    localbingo: Bingo
}

export default Vue.extend({
    data: function(){
        return {
            show_modal: false,
            localbingo: null
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    created(){
    },

    components: {
        Header,
        Footer,
        FreeContents,
        TestModal,
        BingoView,
        ResultCard
    },

    methods: {
        test:function(){
            console.log(
                // JSON.parse(JSON.stringify(this.$store.state.bingo))
                this.$store.state.bingo.serialized
            );
            this.localbingo = Bingo.createByObj(this.$store.state.bingo.serialized);
        }
  },
});
</script>
<style scoped>

</style>