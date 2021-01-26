import {Content} from "@lib/bingo/content.ts";
import {User} from "@lib/bingo/user.ts";
import {ExDate} from "@lib/func/ex_date.ts";
import {EventEmitter} from 'events';
import store from '../../store/index.ts';

export class Bingo extends EventEmitter{

    public static BEFORE_PLAY:number = 0;
    public static PLAYING:number = 1;
    public static PLAYED:number = 2;

    public bingonum:number = 0;
    public all_clear:Boolean = false;

    public get cells_multi():Array<Array<Cell>>{
        let c:Array<Array<Cell>> = [];
        let cell_idx:number=0;
        for(let i:number=0;i<this.cell_num;i++){
            let row:Array<Cell> = [];
            for(let j:number=0;j<this.cell_num;j++){
                row.push(this.cells[cell_idx]);
                cell_idx++;
            }
            c.push(row);
        }
        return c;
    }

    public user_id:string = '0';

    constructor(
        public cells:Array<Cell>,
        public player:User = store.state.user,
        private _game_state:number = Bingo.BEFORE_PLAY,
        private _start_time:number = 0,
        private _end_time:number = 0,
        private _title:String = "",
        public memo:string = "",
        public id:string = '',
         ){
            super();
            this.user_id = player.id;
            this.cells.forEach(
              c => { c.on( 'checked',()=> this.checkBingo() ) }
            )
    }

    public get cell_last_checked():Cell{
        return this.cells_checked.slice(-1)[0];
    }

    public get cells_checked():Array<Cell>{
        return this.cells.filter( c => c.checked ).sort( (a,b) => a.checkInfo.time - b.checkInfo.time );
    }

    public get endDate():string{
        return new Date(this._end_time).toLocaleDateString();
    }
    
    public get score():number{
        return this.cells.filter(c =>  c.checked).length;
    }

    public get title():String{
        if(this._title == ""){
            if(!this._start_time) return "未プレイのビンゴ"
            return ExDate.format_to_date(this._start_time)+"のビンゴ"
        }
        return this._title;
    }

    public get game_state():number{
        return this._game_state;
    }

    public get start_time():number{
        return this._start_time;
    }

    public get end_time():number{
        return this._end_time;
    }

    public get is_playing():Boolean{
        return this._game_state==Bingo.PLAYING;
    }

    private check_all_clear():void{
        if(this.cells.every(c=>c.checked)){
            this.all_clear = true;
            this.emit('all_clear');
        }
    }
    
    public get current_time():number{
        if(this._start_time == 0) return 0;
        return Date.now()- this._start_time;
    }

    public get spentTime():number{
        return this._end_time - this._start_time;
    }

    public startGame(){
        this._game_state = Bingo.PLAYING;
        this._start_time = Date.now();
        this.emit('start_game');
    }

    public endGame(){
        this._game_state = Bingo.PLAYED;
        this._end_time = Date.now();
    }

    private clearBingoFlag(){
        this.cells.forEach( c => c.is_bingo = false );
    }

    public checkBingo(){
        this.clearBingoFlag(); 
        let bingonum = 0;
        let cells_multi = this.cells_multi;
        // 横
        cells_multi.forEach(
            row => {
                if(row.every(c =>  c.checked)){
                   bingonum++;
                   row.forEach(c => c.is_bingo = true);

                }
            }
        )
        // 縦
        for(let i:number=0;i<this.cell_num;i++){
            if(cells_multi.every(
                row => {
                    return row[i].checked
                }
            )){
                bingonum++;
                cells_multi.forEach(c => c[i].is_bingo = true);

            };
        }
        // 斜め
        if(cells_multi.every(
            (row,index) => {
                return row[index].checked
            }
        )){
            bingonum++;
            cells_multi.forEach( (c,index) => c[index].is_bingo = true);

        };
        if(cells_multi.every(
            (row,index) => {
                return row[this.cell_num-index-1].checked
            }
        )){
            bingonum++;
            cells_multi.forEach( (c,index) => c[this.cell_num-index-1].is_bingo = true);
        };

        // あたらしくビンゴ
        const newbingo:number = bingonum - this.bingonum;
        if( 0 < newbingo){
            this.emit('bingo',{num:newbingo});
        }

        this.bingonum = bingonum;
        this.check_all_clear();   
    }

    public get contents():Array<Content>{
        return this.cells.map(c => c.content);
    }

    public get cell_num():number{
        // return this.cells.length;
        return Math.sqrt(this.cells.length);
    }

    static createNew(cell_num:number,random:Boolean=false){
        // let cells:Array<Array<Cell>> = [];
        // for(let i:number=0;i<cell_num;i++){
        //     let row:Array<Cell> = [];
        //     for(let j:number=0;j<cell_num;j++){
        //         row.push(new Cell(i,j,random? Content.random : Content.blank));
        //     }
        //     cells.push(row);
        // }
        let cells:Array<Cell> = [];
        for(let i:number=0;i<cell_num;i++){
            for(let j:number=0;j<cell_num;j++){
                cells.push(new Cell(i,j,random? Content.random.id : 0));
            }
        }
        return new Bingo(cells);
    }

    static createByObj(obj:any):Bingo{
        // let cells:Array<Array<Cell>> = [];
        // for(let i:number=0;i<obj.cells.length;i++){
        //     let row:Array<Cell> = [];
        //         for(let j:number=0;j<obj.cells[i].length;j++){
        //         row.push(Cell.createByObj(obj.cells[i][j]));
        //     }
        //     cells.push(row);
        // }
        let cells:Array<Cell> = [];
        for(let i:number=0;i<obj.cells.length;i++){
            cells.push(Cell.createByObj(obj.cells[i]));
        }
        const bingo:Bingo = new Bingo(cells,obj.player,obj._game_state,obj._start_time,obj._end_time,obj.title,obj.memo,obj.id);
        bingo.checkBingo();
        return bingo
    }

    static createByJson(json:string):Bingo{
        let obj:any = JSON.parse(json);
        // obj = JSON.parse(obj)
        return Bingo.createByObj(obj);
    }
}

export class Cell extends EventEmitter {
    private _is_bingo:Boolean = false;

    public get content():Content{
        return Content.contents[this.content_id-1];
    }

    public set content(content:Content){
        this.content_id = content.id;
    }

    constructor( 
        public x:number,
        public y:number, 
        public content_id:number=0,
        private _check:any=null
        ){
            super();
    }
    static createByObj(obj:any):Cell{
        const check:any = (obj._check)? new CheckMetaData(obj._check.time,obj._check.location) : null;
        // const content:Content = Content.createByObj(obj.content_id);
        return new Cell(obj.x,obj.y,obj.content_id,check);
    }
    public check(save_location:boolean = false){
        this._check = new CheckMetaData(Date.now());
        if(save_location){
            navigator.geolocation.getCurrentPosition((position)=>{
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                console.log(this._check);
                if(this._check){
                    console.log('whywhy');
                    this._check.location = {lat:position.coords.latitude,lon:position.coords.longitude}
                }
            });
        }

        (this as EventEmitter).emit("checked");
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
}

export class CheckMetaData{
    // public location = {lat:0,lon:0}
    public get location_available(){
        return (this.location.lat!=0 && this.location.lon!=0)
    }
    constructor(
        public time:number,
        public location = {lat:0,lon:0}
    ){}
}