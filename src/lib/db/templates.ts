import {Bingo} from "@lib/bingo/Bingo";
import firebase from "firebase/app"
import {User} from "@lib/bingo/user";

export default class Templates{
    async saveTemplates(bingobj:Bingo){
        const db = firebase.firestore();
        let res  =  await db.collection('templates').add(bingobj.serialized);
        return res.id;
    }
    async loadTemplate(id:string){
        const db = firebase.firestore();
        let doc  =  await db.collection('templates').doc(id).get()
        return Bingo.createByObj(doc.data());
    }
    async fetchTemplates(){
        const db = firebase.firestore();
        let datas  =  await db.collection('templates').get()
        return datas.docs.map( (doc:any) => Bingo.createByObj(doc.data()) );
    }

}