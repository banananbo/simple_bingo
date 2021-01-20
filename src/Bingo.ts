import {Content} from "./content.ts";

export class Bingo{

    public static BEFORE_PLAY:number = 0;
    public static PLAYING:number = 1;
    public static PLAYED:number = 2;

    public bingonum:number = 0;

    constructor( 
        public cells:Array<Array<Cell>>,
        private _game_state:number = Bingo.BEFORE_PLAY,
        private _start_time:number = 0,
        private _end_time:number = 0,
        private _title:String = "",
        public memo:string = ""
         ){
        
    }

    public get cell_last_checked():Cell{
        return this.cells_checked.slice(-1)[0];
    }

    public get cells_checked():Array<Cell>{
        return this.cells.flat().filter( c => c.checked ).sort( (a,b) => a.checkInfo.time - b.checkInfo.time );
    }

    public get endDate():string{
        return new Date(this._end_time).toLocaleDateString();
    }
    
    public get score():number{
        return this.cells.flat().filter(c =>  c.checked).length;
    }

    public get title():String{
        if(this._title == "") return this.getDateString(this._start_time)+"のビンゴ"
        return this._title;
    }

    public get game_state():number{
        return this._game_state;
    }

    public get is_playing():Boolean{
        return this._game_state==Bingo.PLAYING;
    }
    
    public get time_formatted():string{
        return this.formatedTime( Date.now()- <number>this._start_time);
    }

    public get spentTime():string{
        return this.formatedTime(<number>this._end_time - <number>this._start_time);
    }

    private formatedTime(time:number):string{
        return ("00"+Math.floor(time/3600000)).slice(-2)+":"+
        ("00"+Math.floor(time/60000)%60).slice(-2) +":"+
        ("00"+Math.floor(time/1000)%60).slice(-2);
    }

    public startGame(){
        this._game_state = Bingo.PLAYING;
        this._start_time = Date.now();
    }

    public endGame(){
        this._game_state = Bingo.PLAYED;
        this._end_time = Date.now();
    }

    private clearBingoFlag(){
        this.cells.flat().forEach( c => c.is_bingo = false );
    }

    private getDateString(time:number):string{
        const now = new Date(time);
        const year = now.getFullYear();
        const mon = now.getMonth()+1; //１を足すこと
        const day = now.getDate();
        const hour = now.getHours();
        const min = now.getMinutes();
    
        //出力用
        const s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分"; 
        return s;            
    }

    public checkBingo(){
        this.clearBingoFlag(); 
        let bingonum = 0;
        // 横
        this.cells.forEach(
            row => {
                if(row.every(c =>  c.checked)){
                   bingonum++;
                   row.forEach(c => c.is_bingo = true);

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

        };
        if(this.cells.every(
            (row,index) => {
                return row[this.cell_num-index-1].checked
            }
        )){
            bingonum++;
            this.cells.forEach( (c,index) => c[this.cell_num-index-1].is_bingo = true);
        };
        this.bingonum = bingonum;     
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

    static createByObj(obj:any):Bingo{
        let cells:Array<Array<Cell>> = [];
        for(let i:number=0;i<obj.cells.length;i++){
            let row:Array<Cell> = [];
                for(let j:number=0;j<obj.cells[i].length;j++){
                row.push(Cell.createByObj(obj.cells[i][j]));
            }
            cells.push(row);
        }
        return new Bingo(cells,obj._game_state,obj._start_time,obj._end_time,obj.title,obj.memo);
    }

    static createByJson(json:string):Bingo{
        let obj:any = JSON.parse(json);
        // obj = JSON.parse(obj)
        return Bingo.createByObj(obj);
    }
}

export class Cell{
    private _is_bingo:Boolean = false;

    constructor( 
        public x:number,
        public y:number, 
        public content:Content=Content.blank,
        private _check:any=null
        ){
        
    }
    static createByObj(obj:any):Cell{
        const check:any = (obj._check)? new CheckMetaData(obj._check.time) : null;
        const content:Content = Content.createByObj(obj.content);
        return new Cell(obj.x,obj.y,content,check);
    }
    public check(){
        this._check = new CheckMetaData(Date.now());
    }
    public unCheck(){
        this._check = null;
    }
    public get checked():Boolean{
        return <boolean>this._check;
    }
    public get is_bingo():Boolean{
        return this._is_bingo;
    }
    public set is_bingo(val:Boolean){
        this._is_bingo = val;
    }
    public get checkInfo():CheckMetaData{
        return this._check;
    }
    public get check_time():string{
        const now = new Date(this.checkInfo.time);
        const year = now.getFullYear();
        const mon = now.getMonth()+1; //１を足すこと
        const day = now.getDate();
        const hour = now.getHours();
        const min = now.getMinutes();
    
        //出力用
        const s = year + "年" + mon + "月" + day + "日" + hour + "時" + min + "分"; 
        return s; 
    }
}

export class CheckMetaData{
    constructor(
        public time:number,
    ){}
}