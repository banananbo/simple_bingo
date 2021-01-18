<template>
<div>
    <!-- <canvas id="target" :width="size" :height="size"></canvas> -->
    <table>
        <tr v-for="(row, index1) in contents" :key="index1">
            <td v-for="(content, index2) in row" :key="index2">
                <Cell :size="cell_size" :content="content" :canvasid="index1+'_'+index2" @cellClick='onCellClicked'></Cell>
            </td>
        </tr>
    </table>
</div>
</template>
<script lang="ts">
import Vue from "vue"
import Cell from "./Cell.vue";
import {Content} from "./content.ts";

export type DataType ={
}

export default Vue.extend({

    data(): DataType {
        return {
        };
    },

    props: {
        // size: {
        //     type: Number,
        //     required: true
        // },
        // cell_num: {
        //     type: Number,
        //     required: true
        // },
        cell_size: {
            type: Number,
            required: true
        },
        contents: {
            type: Array,
            required: true
        }
    },

  components: {
    Cell
  },

    // watch: {
    //   'size': {
    //       handler: function (val) {
    //           this.refleshBingo();
    //       }
    //   },
    //   'cell_num': {
    //       handler: function (val) {
    //           this.refleshBingo();
    //       }
    //   }
    // },

    created(){

    },

    mounted(){
        // this.canvas = <HTMLCanvasElement>document.getElementById( "target" );
        // this.refleshBingo();
    },

    methods: {
        onCellClicked:function(obj:any){
            console.log(obj.content);
            this.$emit('cellClick',obj);
        },
        // initBingo: function(){
        //     this.contents = [];
        //     for(let i=0; i<this.cell_num;i++){
        //         let horizontal:Array<Content> = [];
        //         for(let j=0; j<this.cell_num; j++){
        //         horizontal.push(Content.random);
        //         }
        //         this.contents.push(horizontal);
        //     }
        // },
        // drawBingo: function(){
        //     let context = this.canvas.getContext( "2d" ) ;
        //     context.clearRect(0,0,this.size,this.size);

        //     for(let i=0;i<this.contents.length;i++){
        //         for(let j=0;j<this.contents[i].length;j++){
        //             this.drawCell(i,j);
        //         }
        //     }
        // },
        // drawBingo2:function(){
        //     const cel_canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById( "one_cell" );
        //     let context = cel_canvas.getContext( "2d" ) ;
        //     let cell:Cell = new Cell(Content.random);
        //     const chara = new Image();
        //     chara.src =  cell.img_src;
        //     chara.onload = () => {
        //         context.drawImage(chara, 0,  0, this.cell_size,this.cell_size);
        //         const textsize:TextMetrics = context.measureText(cell.content.title);
        //         context.font = "14px 'ＭＳ ゴシック'"
        //         context.fillText(cell.content.title, (this.cell_size-textsize.width)/2 , this.cell_size - 20 );
        //     };
        // },
        // refleshBingo(){
        //     this.initBingo();
        //     // this.drawBingo();
        // },
        // drawCell: function(x:number,y:number){
        //     let context = this.canvas.getContext( "2d" ) ;

        //     const chara = new Image();
        //     chara.src =  this.contents[x][y].img_src;
        //     chara.onload = () => {
        //         context.drawImage(chara, this.cell_size*x,  this.cell_size*y, this.cell_size,this.cell_size);
        //         const textsize:TextMetrics = context.measureText(this.contents[x][y].title);
        //         context.font = "14px 'ＭＳ ゴシック'"
        //         context.fillText(this.contents[x][y].title, this.cell_size*x + (this.cell_size-textsize.width)/2 , this.cell_size*y + this.cell_size - 20 );
        //     };
            
        //     // context.beginPath () ;
        //     // context.rect( this.bingo.cell_size*x, this.bingo.cell_size*y, this.bingo.cell_size, this.bingo.cell_size ) ;
        //     // context.strokeStyle = "blue" ;
        //     // context.lineWidth = 1 ;
        //     // context.stroke() ;
        // }
  },
});
</script>
<style scoped>

</style>