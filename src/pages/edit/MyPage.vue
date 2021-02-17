<template>
<div>
    <h5>{{$t("lead.your_bingo")}}</h5>
    <!-- <h6>サーバーデータ</h6> -->
    <div v-for="(bingo,idx) in $store.state.yome.my_bingo_templates" :key="`t${idx}`">
        <ResultCard :bingo="bingo" :location_link="true" :enable_copy="true"></ResultCard>
        <!-- <BingoView v-if="bingo" :bingo="bingo" :size="size"></BingoView> -->
    </div>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
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
    },

    components: {
        ResultCard,
        BingoView
    },

    methods: {

  },
});
</script>
<style scoped>

</style>