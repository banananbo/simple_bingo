<template>
<div style="position:relative;">
    <div style="position:absolute; 0%; right:10px;">
    <a type="button" class="btn btn-primary" :href="`http://twitter.com/share?url=https://bin5.xyz/%23/result/${$route.params.id}&text=おさんぽビンゴでお散歩しました！&hashtags=osanpo_bingo`" target="_blank">
    <v-fa :icon="['fab', 'twitter']" />シェアする
    </a>
    </div>
    <h5 style="padding-bottom:20px">template</h5>
    <BingoView v-if="this.bingo" :bingo="this.bingo" :size="size"></BingoView>
    <!-- <ResultCard v-if="bingo" :bingo="bingo" :datail_view="true" :detail_mode="true"></ResultCard> -->
</div>

</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import BingoView from "@organisms/BingoView.vue";
import Templates from "@lib/db/templates";

export type DataType ={
    bingo: Bingo,
    mypageurl: String,
    size: number
}

export default Vue.extend({
    data:function():DataType {
        return {
            bingo: null,
            mypageurl: encodeURI(window.location.href),
            size: screen.width - 10
        };
    },
    computed:{

    },

    props: {

    },
    created(){
        this.setup();
    },

    components: {
        BingoView,
    },

    methods: {
         setup:async function(){
            let db:Templates = new Templates();
            
            this.bingo =  await db.loadTemplate(this.$route.params.id);
            console.log(this.bingo);
        }
    },
});
</script>
<style scoped>

</style>