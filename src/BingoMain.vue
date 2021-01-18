<template>
<div>
    <Header></Header>
    <div class="container-fluid text-center">
     <BingoView :bingo="this.$store.state.bingo" :size="size" @cellClick='onCellClicked'></BingoView>
    </div>
    <ControlPop v-if="cellPop" :cell="selectedCell"></ControlPop>
    <!-- <div>
        Count: {{ count }}
        <button @click="onclick">Increment</button>
        <router-link to="/create">Start!</router-link>
    </div> -->
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "./Bingo.ts";
import Header from "./Header.vue";
import BingoView from "./BingoView.vue";
import ControlPop from "./ControlPop.vue";

export type DataType ={
    bingo: Bingo,
    size: number,
    cellPop: Boolean,
    selectedCell: Cell
}

export default Vue.extend({
    data(): DataType {
        return {
            bingo: null,
            size: screen.width - 40,
            cellPop: false,
            selectedCell: null
        };
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
    mounted(){
        // this.bingo = this.$store.state.bingo;
        // console.log(this.$store.state.bingo);
    },

    components: {
        Header,
        BingoView,
        ControlPop
    },

    methods: {
        onCellClicked: function(obj:any){
            console.log(9);
            this.selectedCell = obj.cell
            this.cellPop = true;
        },
        onclick :function(obj:any){
            // this.count++;
            // this.$store.commit('increment');
        },
  },
});
</script>
<style scoped>
</style>