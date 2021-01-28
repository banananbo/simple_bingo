<template>
<div class="main card row" @click="toggleView">
        <div style="float:left">
            <table>
                <tr>
                    <td rowspan="2">
                        <ContentView v-if="!detail_view" :content="main_cell.content" :size="50"></ContentView>
                    </td>
                    <td class="title">
                        {{bingo.title}}
                    </td>
                </tr>
                <tr>
                    <td class="player">
                        {{bingo.id}} by {{bingo.player.name}}
                    </td>
                </tr>
            </table>
        </div>
        <transition name="slide-fade">
            <div v-if="detail_view" class="container-fluid">
                <div>
                    <BingoView :bingo="bingo" :size="size"></BingoView>
                    <div>
                        <dl>
                            <dt>score</dt>
                            <dd>{{bingo.score}}</dd>
                            <dt>bingo</dt>
                            <dd>{{bingo.bingonum}}</dd>
                            <dt>開始</dt>
                            <dd>{{format_to_date(bingo.start_time)}}</dd>
                            <dt>終了</dt>
                            <dd>{{format_to_date(bingo.end_time)}}</dd>
                            <dt>時間</dt>
                            <dd>{{format_to_time(bingo.current_time)}}</dd>
                            <dt>メモ</dt>
                            <dd>{{bingo.memo}}</dd>
                        </dl>
                    </div>
                    <dl v-for="(cell,idx) in bingo.cells_checked.reverse()" :key="idx">
                        <dt><ContentView :content="cell.content" :size="50"></ContentView></dt>
                        <dd>{{format_to_date(cell.checkInfo.time)}}
                        <a v-if="cell.checkInfo.location_available && location_link" :href="`https://www.google.com/maps?q=${cell.checkInfo.location.lat},${cell.checkInfo.location.lon}`" target="_blank">
                            <v-fa icon="map-marker-alt" />
                        </a></dd>
                    </dl>
                </div>
            </div>
        </transition>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import BingoView from "@organisms/BingoView.vue";
import ContentView from "@organisms/ContentView.vue";
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
            default: screen.width -60
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
        }
    },
    created(){
        if(this.detail_mode) this.detail_view = true;
    },

    components: {
        BingoView,
        ContentView
    },

    methods: {
        toggleView(){
            if(!this.detail_mode) this.detail_view = !this.detail_view;
        }
  },
});
</script>
<style scoped>
    div .main{
        margin: 10px;
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
width: 50px;
float: left;
clear: both;
font-weight: bold;
	}
dd {
padding: 0 0 5px 50px;
}
</style>