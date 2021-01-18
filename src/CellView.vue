<template>
    <div class="rounded" :class="[{checked:cell.checked, bingocell:cell.is_bingo},'rounded']">
        <!-- <canvas ref="canvas" :width="size" :height="size" @click='select'></canvas> -->
        <ContentView :content="cell.content" :size="size" @onClick="select"></ContentView>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import {Cell} from "./Bingo.ts";
import {Content} from "./content.ts"
import ContentView from "./ContentView.vue"

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
    },

    watch: {
    //   'content': {
    //       handler: function (val) {
    //           this.draw();
    //       }
    //   }
    },

    components: {
        ContentView
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
            console.log(this.cell.content.title);
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
</style>