import {Content} from "@lib/bingo/content";
import {User} from "@lib/bingo/user";
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

    // public get cells_multi():Array<Array<Cell>>{
    //     let c:Array<Array<Cell>> = [];
    //     let cell_idx:number=0;
    //     for(let i:number=0;i<this.cell_num;i++){
    //         let row:Array<Cell> = [];
    //         for(let j:number=0;j<this.cell_num;j++){
    //             row.push(this.cells[cell_idx]);
    //             cell_idx++;
    //         }
    //         c.push(row);
    //     }
    //     return c;
    // }

    public user_id:string = '0';

    public setPlayer(user:User){
        this.player = user;
        this.user_id = user.id;
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
            console.log(`ビンゴ初期化します ${id}`);
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

    private bingo_groups:Array<BingoGroup>;
    public cells_multi:Array<Array<Cell>>;

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
        
        // let cells_multi = this.cells_multi;
        // // 横
        // cells_multi.forEach(
        //     row => {
        //         if(row.every(c =>  c.checked)){
        //            bingonum++;
        //            row.forEach(c => c.is_bingo = true);

        //         }
        //     }
        // )
        // // 縦
        // for(let i:number=0;i<this.cell_num;i++){
        //     if(cells_multi.every(
        //         row => {
        //             return row[i].checked
        //         }
        //     )){
        //         bingonum++;
        //         cells_multi.forEach(c => c[i].is_bingo = true);

        //     };
        // }
        // // 斜め
        // if(cells_multi.every(
        //     (row,index) => {
        //         return row[index].checked
        //     }
        // )){
        //     bingonum++;
        //     cells_multi.forEach( (c,index) => c[index].is_bingo = true);

        // };
        // if(cells_multi.every(
        //     (row,index) => {
        //         return row[this.cell_num-index-1].checked
        //     }
        // )){
        //     bingonum++;
        //     cells_multi.forEach( (c,index) => c[this.cell_num-index-1].is_bingo = true);
        // };

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
        let cells:Array<Cell> = [];
        let contents:Array<Content> = Content.random_arr(cell_num*cell_num);
        for(let i:number=0;i<cell_num;i++){
            for(let j:number=0;j<cell_num;j++){
                cells.push(new Cell(i,j,random? contents[i*cell_num+j].id : 0));
            }
        }
        return new Bingo(cells);
    }

    static copyFromBingo(origin:Bingo):Bingo{
        let cells:Array<Cell> = [];
        for(let i:number=0; i < origin.cell_num; i++){
            for(let j:number=0; j < origin.cell_num; j++){
                cells.push(new Cell(i,j, origin.cells[i*origin.cell_num+j].content.id));
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
        // obj = JSON.parse(obj)
        return Bingo.createByObj(obj);
    }
}

export class Cell extends EventEmitter {
    private _is_bingo:Boolean = false;
    private _is_reach:Boolean = false;

    public get content():Content{
        return Content.getById(this.content_id);
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
    public get is_reach():Boolean{
        return this._is_reach
    }
    public set is_reach(val:Boolean){
        this._is_reach= val;
    }
    public get checkInfo():CheckMetaData{
        return this._check;
    }
    public get location_available():Boolean{
        if(!this._check) return false;
        return this._check.location_available
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