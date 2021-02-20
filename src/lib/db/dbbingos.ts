import {Bingo} from "@lib/bingo/Bingo";
import firebase from "firebase/app"
import {User} from "@lib/bingo/user";

export class DBBingos{
    public static DOC_AMAZON_BINGO:string = "abingo";
    public static DOC_AMAZON_TEMPLATE:string = "templates";

    constructor(public collection_name:string){

    }
    async addBingo(bingo:Bingo){
        const db = firebase.firestore();
        let bingoobj:any = bingo.serialized
        bingoobj.user_ref = db.doc(`users/${bingoobj.user_id}`);
        let res  =  await db.collection(this.collection_name).add(bingoobj);
        return res.id;
    }
    async load(id:string){
        const db = firebase.firestore();
        let doc  =  await db.collection(this.collection_name).doc(id).get()
        return Bingo.createByObj(doc.data(),doc.id);
    }
    async save(bingo:Bingo){
        const db = firebase.firestore();
        await db.collection(this.collection_name).doc(bingo.id).update(bingo.serialized)
        return true
    }
    async fetch(length:number=10){
        const db = firebase.firestore();
        let datas  =  await db.collection(this.collection_name).get();

        let bingo_list:Bingo[] = [];//datas.docs.map( async (doc:any) => await this.createBingoData(doc) );

        for(let i=0;i<datas.docs.length;i++){
            let b:Bingo = await this.createBingoData(datas.docs[i]);
            bingo_list.push(b);
        }

        return bingo_list;

    }
    async createBingoData(doc:any){
        let data = doc.data();

        if(data.user_id == 0 || !data.user_ref){
            data.player = User.GUEST_USER;
        }else{
            let player = await data.user_ref.get();
            data.player = player.data();
        }
        return Bingo.createByObj(data,doc.id);
    }
}