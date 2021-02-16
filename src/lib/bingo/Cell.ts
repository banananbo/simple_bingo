import {EventEmitter} from 'events';
import {Content,MitsuketaContent,BlankContent} from "@lib/bingo/content";

export class Cell extends EventEmitter {
    private _is_bingo:Boolean = false;
    private _is_reach:Boolean = false;

    // public get content():Content{
    //     return MitsuketaContent.getById(this.content_id);
    // }

    // public set content(content:Content){
    //     this.content_id = content.id;
    // }

    constructor( 
        public content:Content,
        private _check:any=null
        ){
            super();
    }

    public get serialized(){
        return {
            _check: (this._check)? this._check.serialized : null,
            content_id: this.content.id,
            ctype: this.content.ctype
        }
    }

    static createByRandomMitsuketaContents(cell_num:number):Array<Cell>{
        let cells:Array<Cell> = [];
        let contents:Array<Content> = MitsuketaContent.random_arr(cell_num*cell_num);
        for(let i:number=0;i<cell_num;i++){
            for(let j:number=0;j<cell_num;j++){
                cells.push(new Cell(contents[i*cell_num+j]));
            }
        }
        return cells
    }

    static createBlankCell(cell_num:number):Array<Cell>{
        let cells:Array<Cell> = [];
        for(let i:number=0;i<cell_num;i++){
            for(let j:number=0;j<cell_num;j++){
                cells.push(new Cell(new BlankContent()));
            }
        }
        return cells
    }

    static createByObj(obj:any):Cell{
        const check:any = (obj._check)? new CheckMetaData(obj._check.time,obj._check.location) : null;
        const ctype:string = (obj.ctype)? obj.ctype : "mitsuketa"
        const content:Content = (ctype=="mitsuketa")? MitsuketaContent.getById(obj.content_id) : null;
        return new Cell(content,check);
    }

    public check(save_location:boolean = false){
        this._check = new CheckMetaData(Date.now());
        if(save_location){
            navigator.geolocation.getCurrentPosition((position)=>{
                if(this._check){
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
    public swapContents(cell:Cell){
        let tmp:Content = this.content;
        this.content = cell.content;
        cell.content = tmp;
    }
}

class CheckMetaData{
    public get serialized(){
        return {
            time: this.time,
            location: this.location
        }
    }
    // public location = {lat:0,lon:0}
    public get location_available(){
        return (this.location.lat!=0 && this.location.lon!=0)
    }
    constructor(
        public time:number,
        public location = {lat:0,lon:0}
    ){}
}