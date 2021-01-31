<template>
    <div class="rounded celldiv" :width="size" :class="[{checked:cell.checked, bingocell:cell.is_bingo},'rounded']">
        <ContentView :content="cell.content" :size="size" @onClick="select"></ContentView>
        <span v-if="show_title" class="title">{{cell.content.title}}</span>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import {Cell} from "@lib/bingo/Bingo.ts";
import {Content} from "@lib/bingo/content.ts"
import ContentView from "@organisms/ContentView.vue"

export type DataType ={
    canvas: HTMLCanvasElement
}

export default Vue.extend({
    data: {

    },
    props: {
        size: {
            type: Number,
            required: true
        },
        cell: {
            type: Cell,
            required: true
        },
        show_title: {
            type: Boolean,
            default: true
        }
    },

    watch: {
    //   'content': {
    //       handler: function (val) {
    //           this.draw();
    //       }
    //   }
    },

    components: {
        ContentView,
    },

    created(){

    },

    mounted(){
        // this.canvas = <HTMLCanvasElement>this.$refs.canvas;
        // this.draw();
    },

    methods: {
        // draw:function(){
        //     let context = this.canvas.getContext( "2d" ) ;
        //     context.clearRect(0,0,this.size,this.size);
        //     const chara = new Image();
        //     chara.src =  this.cell.content.img_src;
        //     chara.onload = () => {
        //         console.log(this.size);
        //         context.drawImage(chara, 0,  0, this.size,this.size);
        //         const textsize:TextMetrics = context.measureText(this.cell.content.title);
        //         context.font = "14px 'ＭＳ ゴシック'"
        //         context.fillText(this.cell.content.title, (this.size-textsize.width)/2 , this.size - 20 );
        //     };
        // },
        select:function(){
            console.log('click');
            this.$emit('cellClick',{cell:this.cell});
        }
  },
});
</script>
<style scoped>
.checked{
    color: red;
    background-color: rgb(231, 127, 123);
}

.bingocell{
    border-color: red;
    border-width: 5em;
    background-color: rgb(32, 25, 214);
}

.celldiv {/*親div*/
  position: relative;
}

span {
  position: absolute;/*絶対配置*/
  top: 80%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  font-weight: bold;
  font-size: 0.8em;
  background: #145021;
  opacity:0.7;
  color:#fff;
  line-height: 1.4;
  margin-bottom: 2px;
  padding: 2px 2px;
  border-radius: 5px;
}
</style>