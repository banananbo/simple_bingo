<template>
<div>
    <h5>作成したビンゴ</h5>
    <div v-for="(bingo,idx) in templates" :key="`t${idx}`">
        <TemplateCard :bingo="bingo" :location_link="true" :enable_copy="true"></TemplateCard>
    </div>
    <h5>プレイ中のビンゴ</h5>
    <div v-for="(bingo,idx) in bingos" :key="`b${idx}`">
        <ResultCard :bingo="bingo" :location_link="true"></ResultCard>
    </div>
</div>


</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import TemplateCard from "@organisms/yome/TemplateCard.vue";
import ResultCard from "@organisms/ResultCard.vue";
import BingoView from "@organisms/BingoView.vue";
import {DBBingos} from "@lib/db/dbbingos.ts";

export type DataType = {
    templates: Bingo[],
    bingos: Bingo[],
}

export default Vue.extend({
    data: function(){
        return {
            templates: [],
            bingos:[]
        } as DataType;
    },
    computed:{

    },

    props: {

    },
    mounted(){
        this.$store.commit('yome/setTitle',`みんなのビンゴ`);
        this.initTemplate();
        this.initBingos();
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
        },
        initTemplate:async function(){
            let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_TEMPLATE);
            this.templates = await db.fetch();
        },
        initBingos:async function(){
            let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_BINGO);
            this.bingos = await db.fetch();
        }
  },
});
</script>
<style scoped>

</style>