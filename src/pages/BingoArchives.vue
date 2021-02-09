<template>
<div>
    <h5>{{$t("lead.everyones_bingo")}}</h5>
    <div  v-for="(bingo,idx) in this.$store.state.archives.recent_archives" :key="idx">
        <ResultCard :bingo="bingo" :enable_copy="true"></ResultCard>
    </div>
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo.ts";
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