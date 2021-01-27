export class User{
    static GUEST_ID:string = '0';
    static get GUEST_USER():User{return new User()}

    constructor(
        public id:string = User.GUEST_ID,
        public name:string = "ゲスト",
        public image:string = ""
    ){
        
    }

    get is_guest():boolean{
        return this.id == User.GUEST_ID;
    }

    static createByObj(obj:any){
        return new User( obj.id,obj.name,obj.image );
    }
    static createByJson(json:string){
        return User.createByObj(JSON.parse(json));
    }
}

export class UserProfile{
    constructor(){}
}