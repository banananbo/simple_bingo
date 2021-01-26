export class User{
    constructor(
        public id:string = "0",
        public name:string = "ゲスト"
    ){
        
    }
    static createByObj(obj:any){
        return new User( obj.id,obj.name );
    }
    static createByJson(json:string){
        return User.createByObj(JSON.parse(json));
    }
}

export class UserProfile{
    constructor(){}
}