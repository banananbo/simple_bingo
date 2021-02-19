<template>
<div>
    <h5>プレイしたビンゴ</h5>
    <!-- <h6>サーバーデータ</h6> -->
    <div v-for="(bingo,idx) in $store.state.yome.my_bingo_archives" :key="`t${idx}`">
        <ResultCard :bingo="bingo" :location_link="true"></ResultCard>
        <button @click="goToBingoPage(bingo)">ビンゴ画面へ</button>
    </div>

    <h5>作成したビンゴ</h5>
    <!-- <h6>サーバーデータ</h6> -->
    <div v-for="(bingo,idx) in $store.state.yome.my_bingo_templates" :key="`t${idx}`">
        <TemplateCard :bingo="bingo" :location_link="true" :enable_copy="true"></TemplateCard>
    </div>

</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import TemplateCard from "@organisms/yome/TemplateCard.vue";
import ResultCard from "@organisms/ResultCard.vue";
import BingoView from "@organisms/BingoView.vue";

export type DataType = {
    bingo: Bingo,
    size: number
}

export default Vue.extend({
    data: function(){
        return {
            bingo: null,
            size: screen.width - 20,
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    created(){
        this.$store.commit('yome/setTitle',`${this.$store.state.user.user.name}さんのビンゴ`)
    },

    components: {
        TemplateCard,
        ResultCard,
        BingoView
    },

    methods: {
        goToBingoPage: function(bingo:Bingo):void{
            let id = this.$store.state.yome.my_bingo_archives.indexOf(bingo);
            this.$router.push(`/yome/game/local/${id}`);
        }

  },
});
</script>
<style scoped>

</style>