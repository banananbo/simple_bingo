import {Content} from "./content.ts";

export class Bingo{
    
    constructor( public cells:Array<Array<Cell>> ){
        
    }

    public get contents():Array<Content>{
        return this.cells.flat().map(c => c.content);
    }

    static createNew(cell_num:number,random:Boolean=false){
        let cells:Array<Array<Cell>> = [];
        for(let i:number=0;i<cell_num;i++){
            let row:Array<Cell> = [];
            for(let j:number=0;j<cell_num;j++){
                row.push(new Cell(i,j,random? Content.random : Content.blank));
            }
            cells.push(row);
        }
        return new Bingo(cells);
    }
}

export class Cell{
    constructor( public x:number, public y:number, public content:Content=null ){
        
    }
}