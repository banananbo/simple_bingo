<template>
    <div class="rounded celldiv" :width="size" ref="main" @click="select"
    :class="[{
        checked:cell.checked, 
        bingocell:cell.is_bingo, 
        no_check:!cell.checked,
        rotate_animation: rotate_animation,
        reach_animation: !cell.is_bingo&&cell.is_reach&&playing
        },'rounded']"
        @animationend="onAnimationEnd">
        <ContentView :content="cell.content" :size="content_size-4"></ContentView>
        <span v-if="show_title&&cell.content.title!=``" class="title">{{cell.content.title}}</span>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

import {Cell} from "@lib/bingo/Cell";
import ContentView from "@organisms/ContentView.vue"

export type DataType ={
    rotate_animation: Boolean,
}

export default Vue.extend({

    data:function():DataType {
        return {
          rotate_animation: false,
        };
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
        },
        playing: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        content_size:function():number{
            return this.size // 線幅
        }       
    },

    mounted(){
        this.cell.on('bingo',this.rotate);
    },

    watch: {
    },

    components: {
        ContentView,
    },

    methods: {
        rotate: function(){
            this.rotate_animation = true;
            (this.$el as HTMLElement).addEventListener('animationend', () => {
                this.rotate_animation = false;
            });
        },
        select:function(){
            this.$emit('cellClick',{cell:this.cell});
        },
        onAnimationEnd:function(e:any){
            // console.log(e);
        }
  },
});
</script>
<style scoped>

@keyframes rotation{
  0%{ transform:rotateY(0);}
  100%{ transform:rotateY(360deg); }
}

.rotate_animation{
  animation: 0.5s linear rotation;
}

.reach_animation{
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, .5);
  animation: 1.5s infinite linear pop;
}

.celldiv {/*親div*/
    border-style: solid;    
    border-width: 2 px;
    border-radius: 6px;
    position: relative;
    transform-origin: bottom;
}
.no_check{
    background-color: #f7faef;
    border-color: #f7faef;
}
.checked{
    background-color: #F7E174;
    border-color: #fddc37;
}
.bingocell{
    background-color: #ED766D;
    border-color: #7B3461;
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

@keyframes pop {
    0% { transform: translate(0%, -5%) scale(1.1, 0.90); }
    50% { transform: translate(0%, -10%) scale(1, 1); }
    55% { transform: translate(0%, -10%) rotate(5deg); }
    60% { transform: translate(0%, -10%) rotate(-5deg); }
    65% { transform: translate(0%, -10%) rotate(5deg); }
    70% { transform: translate(0%, -10%) rotate(-5deg); }
    100% { transform: translate(0%, -5%) scale(1.1, 0.9); }

    /* 0% { transform: translate(-50%, -50%) scale(1.25, 0.75); } */
    /* 50% { transform: translate(-50%, -150%) scale(1, 1); } */
    /* 55% { transform: translate(-50%, -150%) rotate(15deg); }
    60% { transform: translate(-50%, -150%) rotate(-15deg); }
    65% { transform: translate(-50%, -150%) rotate(15deg); }
    70% { transform: translate(-50%, -150%) rotate(-15deg); }
    100% { transform: translate(-50%, -50%) scale(1.25, 0.75); } */
}
</style>