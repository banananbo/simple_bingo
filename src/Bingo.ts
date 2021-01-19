import {Content} from "./content.ts";

export class Bingo{

    public static BEFORE_PLAY:number = 0;
    public static PLAYING:number = 1;
    public static PLAYED:number = 2;

    private _game_state:number = Bingo.BEFORE_PLAY;
    private _start_time:Number = 0;

    public bingonum:number = 0;
    
    public get score():number{
        return this.cells.flat().filter(c =>  c.checked).length;
    }

    public get game_state():number{
        return this._game_state;
    }

    public get is_playing():Boolean{
        return this._game_state==Bingo.PLAYING;
    }
    
    public get time():number{
        return ( Date.now()- <number>this._start_time);
    }

    public startGame(){
        this._game_state=Bingo.PLAYING;
        this._start_time = Date.now();
    }

    public checkBingo(){
        let bingonum = 0;
        // 横
        this.cells.forEach(
            row => {
                if(row.every(c =>  c.checked)){
                   bingonum++;
                   row.forEach(c => c.is_bingo = true);
        console.log('bingo?');

                }
            }
        )
        // 縦
        for(let i:number=0;i<this.cell_num;i++){
            console.log(i);
            if(this.cells.every(
                row => {
                    return row[i].checked
                }
            )){
                bingonum++;
                console.log('bingo?');
                this.cells.forEach(c => c[i].is_bingo = true);

            };
        }
        // 斜め
        if(this.cells.every(
            (row,index) => {
                return row[index].checked
            }
        )){
            bingonum++;
            this.cells.forEach( (c,index) => c[index].is_bingo = true);
        console.log('bingo?');

        };
        if(this.cells.every(
            (row,index) => {
                return row[this.cell_num-index-1].checked
            }
        )){
            bingonum++;
        console.log('bingo?');

            this.cells.forEach( (c,index) => c[this.cell_num-index-1].is_bingo = true);
        };
        this.bingonum = bingonum;     
    }

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
    private _is_bingo:Boolean = false;

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
    public get is_bingo():Boolean{
        return this._is_bingo;
    }
    public set is_bingo(val:Boolean){
        this._is_bingo = val;
    }
}