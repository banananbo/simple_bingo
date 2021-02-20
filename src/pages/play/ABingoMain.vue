<template>
<div v-if="bingo">
    <BingoOverlay :bingo="bingo" :width="size" :height="bingo_h" @afterPerfectAnime='onClearBingo'></BingoOverlay>
    <div ref="bingoview">
    <BingoView :bingo="bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div style="margin-top:10px">
        <div v-if="!bingo.is_playing" class="text-center ">
            <button @click="startGame" class="btn btn-primary">スタート！</button>
        </div>
        <div id="score_container" v-if="bingo.is_playing">
            <ScoreView :timer="timer" :bingo="bingo"></ScoreView>
             <!-- <section class="inline">
                    <button type="button" class="btn btn-primary" @click="clickEndBtn">{{$t("function.finish")}}</button>
            </section> -->
        </div>
    </div>
    <CheckPop v-if="cellPop" :checkstr="`チェックした`" :cell="selectedCell" @submit="submitCell" @cancel="cancellCell" @close="cellPop = false;"></CheckPop>
    <!-- <EndPop v-if="endPop" :bingo="bingo" :timer="timer" @submit="endGame" @cancel="endPop=false" @remove="confirmDiscard"></EndPop> -->
    <DiscardGamePop v-if="view_discardPop" @discard="discardGame" @cancel="view_discardPop = false"></DiscardGamePop>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Cell} from "@lib/bingo/Cell";
import BingoView from "@organisms/BingoView.vue";
import ScoreView from "@atoms/ScoreView.vue";
import CellView from "@organisms/CellView.vue";
import CheckPop from "@organisms/CheckPop.vue";
import EndPop from "@organisms/EndPop.vue";
import BingoOverlay from "@organisms/BingoOverlay.vue";
import DateFunc from "@mixin/date_func";
import DiscardGamePop from "@organisms/DiscardGamePop.vue";
import { Bingo } from "@src/lib/bingo/Bingo";
import { DBBingos } from "@src/lib/db/dbbingos";

export type DataType ={
    bingo:Bingo,
    size: number,
    cellPop: Boolean,
    endPop: Boolean,
    selectedCell: Cell,
    timer:string,
    timerObj:any,
    bingo_w:number,
    bingo_h:number,
    view_discardPop:Boolean
}

export default Vue.extend({
    data:function():DataType {
        return {
            bingo:null,
            size: screen.width - 10,
            cellPop: false,
            endPop: false,
            selectedCell: null,
            timer: "",
            timerObj: null,
            bingo_w:100,
            bingo_h:100,
            view_discardPop: false,
        };
    },
    mixins: [DateFunc],
    computed:{

    },
    watch: {
     },

    props: {

    },
    beforeCreate(){

    },
    created(){
        // this.bingo = this.$store.state.yome.my_bingo_archives[this.$route.params.id]
    },
    mounted(){
        this.loadGame().then(
            () => {
                this.bingo_w = (this.$refs.bingoview as Element).clientWidth;
                this.bingo_h = (this.$refs.bingoview as Element).clientHeight;
                this.$store.commit('yome/setTitle',this.bingo.title);
            }
        )

    },
    beforeDestroy(){
        // clearInterval(this.timerObj);
    },

    components: {
        BingoView,
        CheckPop,
        EndPop,
        CellView,
        BingoOverlay,
        DiscardGamePop,
        ScoreView
    },

    methods: {
        async loadGame(){
            let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_BINGO);
            this.bingo = await db.load(this.$route.params.id);
        },
        async endGame(){
            this.$store.state.bingo.endGame();
            this.$store.commit('saveBingoData');
            // this.$store.commit('addToBingoArchives',this.$store.state.bingo);
            await this.$store.dispatch('archives/addToBingoDBArchives');
            // context.commit('archives/addToBingoArchivesLocal');

            const newId = this.$store.state.bingo.id;

            this.$store.commit('removeBingoData',null);
            this.$router.push(`result/`+newId);
        },
        startGame(){
            this.bingo.startGame();
            this.$store.commit('yome/saveRecords');
         },
        onCellClicked: function(obj:any){
            if (!this.bingo.is_playing) return;
            this.selectedCell = obj.cell
            this.cellPop = true;
        },
        submitCell :function(obj:any){
            this.cellPop = false;
            this.selectedCell = null;
            obj.cell.check( false );
            this.saveBingo();
            // this.$store.commit('saveBingoData');
        },
        cancellCell :function(obj:any){
            obj.cell.unCheck();
            this.cellPop = false;
            this.selectedCell = null;
            this.saveBingo();
        },
        saveBingo:function(){
            let db:DBBingos = new DBBingos(DBBingos.DOC_AMAZON_BINGO);
            db.save(this.bingo);
        },
        clickEndBtn(){
            this.endPop = true;
        },
        onClearBingo : function():void{
            // this.clickEndBtn();
        },
        confirmDiscard: function(){
            this.endPop=false;
            this.view_discardPop = true;
        },
        discardGame: function(){
            this.view_discardPop = false;
            this.$router.push('/');
        }
  },
});
</script>
<style scoped>
.inline{
  display: inline-block;
  vertical-align: middle;
}
</style>