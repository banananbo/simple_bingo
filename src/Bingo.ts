import {Content} from "./content.ts";

export class Bingo{
    
    constructor( public cells:Array<Array<Cell>> ){
        
    }

    public get contents():Array<Content>{
        return this.cells.flat().map(c => c.content);
    }

    public get cell_num():number{
        return this.cells.length;
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

    static createByJson(json:string):Bingo{
        let obj:any = JSON.parse(json);
        // obj = JSON.parse(obj)
        console.log(obj);
        console.log(typeof(obj));
        console.log(obj.cells);
        let cells:Array<Array<Cell>> = [];
        for(let i:number=0;i<obj.cells.length;i++){
            let row:Array<Cell> = [];
                for(let j:number=0;j<obj.cells[i].length;j++){
                row.push(Cell.createByObj(obj.cells[i][j]));
            }
            cells.push(row);
        }
        console.log(cells);
        return new Bingo(cells);
    }
}

export class Cell{
    private _checked:Boolean = false;

    constructor( public x:number, public y:number, public content:Content=Content.blank ){
        
    }
    static createByObj(obj:any):Cell{
        const content:Content = Content.createByObj(obj.content);
        return new Cell(obj.x,obj.y,content);
    }
    public check(){
        this._checked = true;
    }
    public unCheck(){
        this._checked = false;
    }
    public get checked():Boolean{
        return this._checked;
    }
}