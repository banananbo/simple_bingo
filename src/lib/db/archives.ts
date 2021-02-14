import {Bingo} from "@lib/bingo/Bingo";
import firebase from "firebase"
import {User} from "@lib/bingo/user";

export default class Archives{
    async fetchRecentArchives(){
        const db = firebase.firestore();
        let datas = await db.collection("archives").orderBy("_end_time","desc").limit(10).get();
        
         datas.docs.map(
            await this.createBingoData
        );
        
        let bingo_list:Bingo[] = [];

        for(let i=0;i<datas.docs.length;i++){
            let b:Bingo = await this.createBingoData(datas.docs[i]);
            bingo_list.push(b);
        }

        return bingo_list;

    }
    async createBingoData(doc:any){
        let data = doc.data();

        if(data.user_id == 0){
            data.player = User.GUEST_USER;
        }else{
            let player = await data.user_ref.get();
            data.player = player.data();
        }
        return Bingo.createByObj(data);
    }
}