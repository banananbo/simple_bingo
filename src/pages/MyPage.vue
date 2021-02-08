<template>
<div>
    <h5>{{$t("lead.your_bingo")}}</h5>
    <!-- <h6>サーバーデータ</h6> -->
    <div  v-for="(bingo,idx) in this.$store.state.archives.my_bingo_archives" :key="`s${idx}`">
        <ResultCard :bingo="bingo" :location_link="true"></ResultCard>
    </div>
    <!-- <h6>端末データ</h6> -->
    <div  v-for="(bingo,idx) in this.$store.state.archives.my_bingo_archives_local" :key="`t${idx}`">
        <ResultCard :bingo="bingo" :location_link="true" :enable_copy="true"></ResultCard>
    </div>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo";
import ResultCard from "@organisms/ResultCard.vue";

export type DataType = {
    bingo: Bingo
}

export default Vue.extend({
    data: function(){
        return {
            bingo: null,
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
    },

    methods: {

  },
});
</script>
<style scoped>

</style>