<template>
    <div>
        <canvas :id="canvasid" :width="size" :height="size" @click='select'></canvas>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import {Content} from "./content.ts"

export type DataType ={
    canvas: HTMLCanvasElement
}

export default Vue.extend({

    data(): DataType {
        return {
            canvas: null,
        };
    },

    props: {
        size: {
            type: Number,
            required: true
        },
        canvasid: {
            type: String,
            required: true
        },
        content: {
            type: Content,
            required: true
        },
    },

    watch: {
      'content': {
          handler: function (val) {
              this.draw();
          }
      }
    },

    created(){

    },

    mounted(){
        this.canvas = <HTMLCanvasElement>document.getElementById( this.canvasid );
        this.draw();
    },

    methods: {
        draw:function(){
            let context = this.canvas.getContext( "2d" ) ;
            context.clearRect(0,0,this.size,this.size);
            const chara = new Image();
            chara.src =  this.content.img_src;
            chara.onload = () => {
                console.log(this.size);
                context.drawImage(chara, 0,  0, this.size,this.size);
                const textsize:TextMetrics = context.measureText(this.content.title);
                context.font = "14px 'ＭＳ ゴシック'"
                context.fillText(this.content.title, (this.size-textsize.width)/2 , this.size - 20 );
            };
        },
        select:function(){
            console.log(this.content.title);
            this.$emit('cellClick',{content:this.content,cell:this});
        }
  },
});
</script>
<style scoped>

</style>