<template>
    <!-- <canvas ref="canvas" :width="size" :height="size" @click='select'></canvas> -->
    <img :class="{unabled: !enable}" :src="this.content.img_src" :width="size" :height="size" @click='select'>
</template>
<script lang="ts">
import Vue from "vue"

import {Content} from "@lib/bingo/content.ts"

export type DataType ={
    canvas: HTMLCanvasElement
}

export default Vue.extend({

    data:function():DataType {
        return {
            canvas: null,
        };
    },

    props: {
        size: {
            type: Number,
            required: true
        },
        enable: {
            type: Boolean,
            default: true,
            required: false
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
        this.canvas = <HTMLCanvasElement>this.$refs.canvas;
        this.draw();
    },

    methods: {
        draw:function(){
            // let context = this.canvas.getContext( "2d" ) ;
            // if(!this.enable) context.globalAlpha = 0.3;
            // const chara = new Image();
            // chara.src =  this.content.img_src;
            // chara.onload = () => {
            //     context.clearRect(0,0,this.size,this.size);
            //     context.drawImage(chara, 0,  0, this.size,this.size);
            //     // const textsize:TextMetrics = context.measureText(this.content.title);
            //     // context.font = "14px 'ＭＳ ゴシック'"
            //     // context.fillText(this.content.title, (this.size-textsize.width)/2 , this.size - 20 );
            // };
        },
        select:function(){
            // speech test
            if(this.$store.state.user_setting.speech_mode) this.speech();

            if(!this.enable) return;
            this.$emit('onClick',{content:this.content});
        },
        speech:function(){
            let u = new SpeechSynthesisUtterance();
            u.lang = 'en-US';
            u.text = this.content.title_en;
            speechSynthesis.speak(u);
        }
  },
});
</script>
<style scoped>
    .unabled{
        opacity: 0.3;
    }
</style>