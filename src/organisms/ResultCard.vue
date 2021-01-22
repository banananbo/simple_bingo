<template>
<div class="main card row" @click="toggleView">
        <div style="float:left">
            <table>
                <tr>
                    <td>
                        <ContentView v-if="!detail_view" :content="main_cell.content" :size="50"></ContentView>
                    </td>
                    <td>
                        <span class="title">{{bingo.title}}</span>
                    </td>
                </tr>
            </table>
        </div>
        <transition name="slide-fade">
            <div v-if="detail_view">
                <BingoView :bingo="bingo" :size="size"></BingoView>
                <!-- <table>
                    <tr>
                        <th>スコア</th>
                        <th>ビンゴ</th>
                        <th>時間</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td class="big">{{bingo.score}}</td>
                        <td class="big">{{bingo.bingonum}}</td>
                        <td>{{format_to_time(bingo.spentTime)}}</td>
                        <td>{{format_to_date(bingo.start_time)}}~{{format_to_date(bingo.end_time)}}</td>
                    </tr>
                </table> -->
                <div>
                    <dl>
                        <dt>score</dt>
                        <dd>{{bingo.score}}</dd>
                        <dt>bingo</dt>
                        <dd>{{bingo.bingonum}}</dd>
                        <dt>開始</dt>
                        <dd>{{format_to_date(bingo.start_time)}}</dd>
                        <dt>終了</dt>
                        <dd>{{format_to_date(bingo.end_time)}}}</dd>
                         <dt>時間</dt>
                        <dd>{{format_to_time(bingo.current_time)}}</dd>
                        <dt>メモ</dt>
                        <dd>{{bingo.memo}}</dd>

                        <!-- <li class="list-group-item">bingo:{{bingo.bingonum}}</li>
                        <li class="list-group-item">開始:{{format_to_date(bingo.start_time)}}</li>
                        <li v-if="bingo.end_time" class="list-group-item">終了:{{format_to_date(bingo.end_time)}}</li>
                        <li v-if="bingo.end_time" class="list-group-item">time:{{format_to_time(bingo.spentTime)}}</li>
                        <li v-if="bingo.is_playing" class="list-group-item">time:{{format_to_time(bingo.current_time)}}</li> -->
                    </dl>
                </div>
                <dl v-for="(cell,idx) in bingo.cells_checked" :key="idx">
                    <dt><ContentView :content="cell.content" :size="50"></ContentView></dt>
                    <dd>{{format_to_date(cell.checkInfo.time)}}</dd>
                </dl>
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
    data(): DataType {
        return {
            detail_view:false,
        };
    },
    mixins: [DateFunc],
    computed:{
        main_cell():Cell{
            return this.bingo.cell_last_checked ? this.bingo.cell_last_checked : this.bingo.cells[0][0]
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
            default: screen.width - 40
        }
    },
    created(){

    },

    components: {
        BingoView,
        ContentView
    },

    methods: {
        toggleView(){
            this.detail_view = !this.detail_view;
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
  color: #010079;
  text-shadow: 0 0 5px white;
  padding: 0.3em 0.5em;
  background: -webkit-repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
  background: repeating-linear-gradient(-45deg, #cce7ff, #cce7ff 3px,#e9f4ff 3px, #e9f4ff 7px);
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
width: 100px;
float: left;
clear: both;
font-weight: bold;
	}
dd {
padding: 0 0 5px 120px;
}
</style>