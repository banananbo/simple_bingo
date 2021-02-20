<template>
<div>
    <LoginInfo :user="$store.state.user.user"></LoginInfo>
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
import LoginInfo from "@organisms/yome/LoginInfo.vue";
import ResultCard from "@organisms/ResultCard.vue";

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
        LoginInfo
    },

    methods: {
        goToBingoPage: function(bingo:Bingo):void{
            this.$router.push(`/yome/game/${bingo.id}`);
        }

  },
});
</script>
<style scoped>

</style>