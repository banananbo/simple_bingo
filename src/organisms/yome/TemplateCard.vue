<template>
<div :v-if="bingo" class="main card row" @click="toggleView">
        <div style="float:left">
            <table>
                <tr>
                    <td rowspan="2">
                        <ContentView v-if="!detail_view" :content="main_cell.content" :size="50"></ContentView>
                    </td>
                    <td class="title">
                        {{bingo.title}}Template
                    </td>
                </tr>
                <tr>
                    <td class="player">
                        by {{bingo.player.name}}
                    </td>
                </tr>
            </table>
        </div>
        <transition name="slide-fade">
            <div v-if="detail_view" class="container-fluid">
                <div>
                    <BingoView :bingo="bingo" :size="size"></BingoView>
                    <!-- <div class="text-right"><CopyBingoBtn v-if="enable_copy" :bingo="bingo"></CopyBingoBtn></div> -->
                    <div class="text-right"><button @click="startPlay"> このビンゴをプレイ </button></div>
                    <dl v-for="(cell,idx) in bingo.cells" :key="idx">
                        <dt><ContentView :content="cell.content" :size="50"></ContentView></dt>
                        <dd><a :href="cell.content.link" target="_blank">amazonで詳細を見る</a></dd>
                    </dl>
                </div>
            </div>
        </transition>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo} from "@lib/bingo/Bingo";
import {Cell} from "@lib/bingo/Cell";
import BingoView from "@organisms/BingoView.vue";
import ContentView from "@organisms/ContentView.vue";
import CopyBingoBtn from "@organisms/CopyBingoBtn.vue";
import DateFunc from "@mixin/date_func.ts";

export type DataType ={
    detail_view: Boolean,
}

export default Vue.extend({
    data:function():DataType{
        return {
            detail_view: false,
        };
    },
    mixins: [DateFunc],
    computed:{
        main_cell():Cell{
            return this.bingo.cell_last_checked ? this.bingo.cell_last_checked : this.bingo.cells[0]
        }
    },

    props: {
        bingo: {
            type: Bingo,
            required: true
        },
        size:{
            type: Number,
            required: false,
            default: screen.width -40
        },
        detail_mode:{
            type: Boolean,
            required: false,
            default: false
        },
        location_link:{
            type: Boolean,
            required: false,
            default: false
        },
        enable_copy:{
            type: Boolean,
            required: false,
            default: false
        }
    },
    created(){
        if(this.detail_mode) this.detail_view = true;
    },

    components: {
        BingoView,
        ContentView,
        CopyBingoBtn
    },

    methods: {
        toggleView(){
            if(!this.detail_mode) this.detail_view = !this.detail_view;
        },
        startPlay(){
            this.$store.commit('yome/startPlay',this.bingo);
            let id = this.$store.state.yome.my_bingo_archives.indexOf(this.bingo);
            this.$router.push(`/yome/game/local/${id}`);
        }
  },
});
</script>
<style scoped>
    div .main{
        margin: 5px 0;
        padding: 5px;
        cursor: hand;
    }
    .title{
        width: 100%;
        color: #010079;
        text-shadow: 0 0 5px white;
        padding: 0.3em 0.5em;
        background: -webkit-repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
        background: repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
    }
    .player{
        width: 100%;
        font-size: 0.8em;
        text-align: right;
    }


    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateY(-20px);
        opacity: 0;
    }

dl {
overflow: hidden;
zoom: 1;
	}
dt {
width: 80px;
float: left;
clear: both;
font-weight: bold;
	}
dd {
padding: 0 0 5px 50px;
}
</style>