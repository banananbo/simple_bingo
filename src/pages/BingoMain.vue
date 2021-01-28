<template>
<div v-if="this.$store.state.bingo">
    <Header></Header>
    <BingoOverlay :width="bingo_w" :height="bingo_h" @afterPerfectAnime='onClearBingo'></BingoOverlay>
    <div ref="bingoview">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <div style="margin-top:10px">
        <div v-if="!this.$store.state.bingo.is_playing" class="text-center ">
            <button @click="startGame" class="btn btn-primary">スタート！</button>
        </div>
        <div v-if="this.$store.state.bingo.is_playing">
            <table>
                <tr>
                    <th>スコア</th>
                    <th>ビンゴ</th>
                    <th>時間</th>
                    <th></th>
                </tr>
                <tr>
                    <td class="big">{{this.$store.state.bingo.score}}</td>
                    <td class="big">{{this.$store.state.bingo.bingonum}}</td>
                    <td>{{timer}}</td>
                    <td><button type="button" class="btn btn-primary" @click="clickEndBtn">おわる</button></td>
                </tr>
            </table>
        </div>
    </div>
    <ControlPop v-if="cellPop" :cell="selectedCell" @submit="submitCell" @cancel="cancellCell" @close="cellPop = false;"></ControlPop>
    <EndPop v-if="endPop" :bingo="this.$store.state.bingo" :timer="timer" @submit="endGame" @cancel="endPop=false" @remove="confirmDiscard"></EndPop>
    <DiscardGamePop v-if="view_discardPop" @discard="discardGame" @cancel="view_discardPop = false"></DiscardGamePop>
    <Footer></Footer>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import Header from "@organisms/Header.vue";
import Footer from "@organisms/Footer.vue";
import BingoView from "@organisms/BingoView.vue";
import CellView from "@organisms/CellView.vue";
import ControlPop from "@organisms/ControlPop.vue";
import EndPop from "@organisms/EndPop.vue";
import BingoOverlay from "@organisms/BingoOverlay.vue";
import DateFunc from "@mixin/date_func.ts";
import DiscardGamePop from "@organisms/DiscardGamePop.vue";
import firebase from "firebase"


export type DataType ={
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
            size: screen.width - 40,
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
    //   'size': {
    //       handler: function () {
    //           this.initBingo();
    //       }
    //   },
      // 'cell_num': {
      //     handler: function () {
      //       console.log("change cell num");
      //       this.initBingo();
      //     }
      // }
  },

    props: {
        // cell_size: {
        //     type: Number,
        //     required: true
        // },
        // bingo: {
        //     type: Bingo,
        //     required: true
        // }
    },
    beforeCreate(){
        if(!this.$store.state.bingo){
            // プレイ中のbingo無し
            this.$router.push("/create"); return; 
        }
    },
    mounted(){
        if(!this.$store.state.bingo){
            // プレイ中のbingo無し
            return; 
        }
        this.$store.state.bingo.checkBingo();
        this.timerObj = setInterval(() => {
            if (this.$store.state.bingo.time==0) return;
            this.timer = (this as any).format_to_time(this.$store.state.bingo.current_time)
         }, 1000);
         this.bingo_w = (this.$refs.bingoview as Element).clientWidth;
         this.bingo_h = (this.$refs.bingoview as Element).clientHeight;
    },
    beforeDestroy(){
        clearInterval(this.timerObj);
    },


    components: {
        Header,
        Footer,
        BingoView,
        ControlPop,
        EndPop,
        CellView,
        BingoOverlay,
        DiscardGamePop
    },

    methods: {
        async endGame(){
            console.log('before save finish');
            this.$store.state.bingo.endGame();
            this.$store.commit('saveBingoData');
            // this.$store.commit('addToBingoArchives',this.$store.state.bingo);
            console.log('save finish');

            // firestore
            const db = firebase.firestore();
            let res  =  await db.collection('archives').add(JSON.parse(JSON.stringify(this.$store.state.bingo)));
            this.$store.state.bingo.id = res.id;
            
            this.$store.commit('loadMyArchives');
            this.$store.dispatch('doSaveFinished');

            console.log('saved finish');
            const newId = this.$store.state.bingo.id;
            this.$store.commit('setBingoData',null);
            this.$router.push(`result/`+newId);
        },
        clickEndBtn(){
            this.endPop = true;
        },
        startGame(){
            this.$store.state.bingo.startGame();
            this.$store.commit('saveBingoData');
         },
        onCellClicked: function(obj:any){
            if (!this.$store.state.bingo.is_playing) return;
            this.selectedCell = obj.cell
            this.cellPop = true;
            console.log(this.$store.state.bingo.cells_checked);
        },
        onclick :function(obj:any){
            // this.count++;
            // this.$store.commit('increment');
        },
        submitCell :function(obj:any){
            obj.cell.check( this.$store.state.user_setting.allow_location );
            this.cellPop = false;
            this.selectedCell = null;
            // this.$store.state.bingo.checkBingo();
            this.$store.commit('saveBingoData');
        },
        cancellCell :function(obj:any){
            obj.cell.unCheck();
            this.cellPop = false;
            this.selectedCell = null;
            this.$store.state.bingo.checkBingo();
            this.$store.commit('saveBingoData');
        },
        onClearBingo : function():void{
            this.clickEndBtn();
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
table{
  width: 100%;
  border-collapse:separate;
  border-spacing: 0;
  /* padding: 5px 20px; */
}

table th:first-child{
  border-radius: 5px 0 0 0;
}

table th:last-child{
  border-radius: 0 5px 0 0;
  border-right: 1px solid #3c6690;
}

table th{
  text-align: center;
  color:white;
  background: linear-gradient(#829ebc,#225588);
  border-left: 1px solid #3c6690;
  border-top: 1px solid #3c6690;
  border-bottom: 1px solid #3c6690;
  box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
  width: 25%;
  padding: 5px 0;
  font-size: 80%;
}

table td{
  text-align: center;
  border-left: 1px solid #a8b7c5;
  border-bottom: 1px solid #a8b7c5;
  border-top:none;
  box-shadow: 0px -3px 5px 1px #eee inset;
  width: 25%;
  padding: 10px 0;
}

.big{
    font-size: 140%;
    /* font-weight: 600; */
    font-family: Impact,Charcoal;
}

table td:last-child{
  border-right: 1px solid #a8b7c5;
}

table tr:last-child td:first-child {
  border-radius: 0 0 0 5px;
}

table tr:last-child td:last-child {
  border-radius: 0 0 5px 0;
}
</style>