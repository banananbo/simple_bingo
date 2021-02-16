import {Content} from "@lib/bingo/content";
import {User} from "@lib/bingo/user";
import {Cell} from "@lib/bingo/Cell";
import {EventEmitter} from 'events';
import store from '../../store/index';
import {i18n} from '../../i18n';
import {ExDate} from "@lib/func/ex_date";

class BingoGroup{
    public is_bingo:Boolean = false;
    constructor(
        public cells:Array<Cell>
    ){
    }
    public checkBingo():Boolean{
        // check not checked
        let not_checked:Cell[] = this.cells.filter(c =>  !c.checked)
        if(not_checked.length == 0){
            // Bingo
            this.cells.forEach(c => {
                c.is_bingo = true;
                if(!this.is_bingo){
                    // new bingo
                    ( c as EventEmitter).emit("bingo");
                }
            });
            this.is_bingo = true;
                
        }else{

            if(this.is_bingo){
                // lost bingo
                this.is_bingo = false;
            }

            if(not_checked.length == 1){
                // reach
                (not_checked[0] as Cell).is_reach = true;
            }

        }
        return this.is_bingo;
    }
}

export class Bingo extends EventEmitter{

    public static BEFORE_PLAY:number = 0;
    public static PLAYING:number = 1;
    public static PLAYED:number = 2;
    
    private _template_id:string = "";

    public bingonum:number = 0;
    public all_clear:Boolean = false;

    public nice_point:number=0;
    
    private bingo_groups:Array<BingoGroup> = [];
    public cells_multi:Array<Array<Cell>> = [];

    public get template_id():string{
        if(this._template_id=="") return this.id;
        return this._template_id;
    }

    public set template_id(val:string){
        this._template_id = val;
    }

    public get current_time_str():String{
        return ExDate.format_to_time(this.current_time);
    }

    public user_id:string = '0';

    public setPlayer(user:User){
        this.player = user;
        this.user_id = user.id;
    }

    public get serialized(){
        return {
            cells: this.cells.map(c=>c.serialized),
            // player: this.player.serialized,
            _game_state: this._game_state,
            _start_time: this._start_time,
            _end_time: this._end_time,
            _title: this._title,
            memo: this.memo,
            id: this.id,
            user_id: this.user_id,
            _template_id: this._template_id,
            nice_point: this.nice_point
        }
    }

    constructor(
        public cells:Array<Cell>,
        public player:User = store.state.user.user,
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
            this.initBingoGroups();
    }

    private initBingoGroups(){
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
        this.cells_multi = c;

        this.bingo_groups =  this.cells_multi.map( cells => new BingoGroup(cells) );  // row bingo

        for(let i:number=0;i<this.cell_num;i++){
            this.bingo_groups.push(
                new BingoGroup(this.cells_multi.map( row => row[i])as Array<Cell>));
        }
        // ななめ
        this.bingo_groups.push(
            new BingoGroup(this.cells_multi.map( (row, index) => row[index])as Array<Cell>));

        this.bingo_groups.push(
            new BingoGroup(this.cells_multi.map( (row, index) => row[this.cell_num-index-1])as Array<Cell>));

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
        return this.cells.filter(c =>  c.checked).length + this.bingonum*this.cell_num;
    }

    public get title():String{
        if(this._title == ""){
            if(!this._start_time) return i18n.t("lead.not_start").toString();
            return i18n.d(new Date(this._start_time),'long')+"のビンゴ"
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
        if(this.cells.every(c => c.checked)){
            this.all_clear = true;
            this.emit('all_clear');
        }
    }
    
    public get current_time():number{
        if(this._start_time == 0) return 0;
        if(this._end_time != 0) return this.spentTime;
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
        this.memo = this.memo.substr(0,100);
        this.calc_nice_point();
    }

    public calc_nice_point(){
        if( this.spentTime <  300000 ) return;
        let point:number=0;
        point += this.score;
        point += this.memo.length/3;
        this.nice_point = point;
    }

    private clearBingoFlag(){
        this.cells.forEach( c => {c.is_bingo = false;c.is_reach = false} );
    }

    public checkBingo(){
        this.clearBingoFlag(); 
        let bingonum = 0;

        this.bingo_groups.forEach(
            group =>{
                if(group.checkBingo()){
                    bingonum++;
                }
            }
        );
        
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

    // static createNew(cells){
        
    //     return new Bingo(cells);
    // }

    static copyFromBingo(origin:Bingo):Bingo{
        let cells:Array<Cell> = [];
        for(let i:number=0; i < origin.cell_num; i++){
            for(let j:number=0; j < origin.cell_num; j++){
                cells.push(new Cell(origin.cells[i*origin.cell_num+j].content));
            }
        }
        const bingo:Bingo = new Bingo(cells);
        bingo.template_id = origin.id;
        return bingo;
    }

    static createByObj(obj:any,id:String=""):Bingo{
        let cells:Array<Cell> = [];
        for(let i:number=0;i<obj.cells.length;i++){
            cells.push(Cell.createByObj(obj.cells[i]));
        }
        const bingo:Bingo = new Bingo(cells,obj.player,obj._game_state,obj._start_time,obj._end_time,obj.title,obj.memo,(id!="")?id:obj.id);
        bingo.checkBingo();
        return bingo
    }

    static createByJson(json:string):Bingo{
        let obj:any = JSON.parse(json);
        return Bingo.createByObj(obj);
    }
}
