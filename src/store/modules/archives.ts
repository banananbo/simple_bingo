import {Bingo} from "@lib/bingo/Bingo.ts";
import firebase from "firebase"
import rootStore from '../index.ts';

export const archives = {
    namespaced: true,
    state: {
      my_bingo_archives: [],
      my_bingo_archives_local: [],
      recent_archives: [],
    } as ArchivesState,
    mutations: {
      loadRecentArchives (state:ArchivesState){
        const db = firebase.firestore();
        let room = "archives";
        let list:any[] = [];
        let query = db.collection(room).orderBy("_end_time","desc").limit(5);
        query.onSnapshot(querySnapshot => { 
          console.log( `変わったよ ${querySnapshot}`)
        })
  
        query.get().then(
          data => {
            data.forEach(doc => {
              console.log(doc.data());
              list.push(Bingo.createByObj(doc.data()));  
            });
            state.recent_archives = list;
          })
          .catch(err => {
            console.log('Error getting documents', err);
          })
      },
      addToBingoArchivesLocal (state:ArchivesState) {
        if(!rootStore.state.user.user.is_guest) return; // ゲストでない場合はローカルに記録しない
        state.my_bingo_archives_local.unshift(rootStore.state.bingo);
        localStorage.setItem('my_bingo_archives_local', JSON.stringify(state.my_bingo_archives_local));
      },
      
      loadMyArchives (state:ArchivesState) {
        if(rootStore.state.user.user.is_guest) return;
        const db = firebase.firestore();
        let room = "archives";
        let list:any[] = [];
        let query = db.collection(room).where(`user_id`,`==`,rootStore.state.user.user.id).orderBy("_end_time","desc").limit(5);
        query.get().then(
          data => {
            data.forEach(doc => {
              console.log(doc.data());
              list.push(Bingo.createByObj(doc.data()));  
            });
            state.my_bingo_archives = list;
          })
          .catch(err => {
            console.log('Error getting documents', err);
          })     
      },
      async addToBingoDBArchives (state:ArchivesState) {
        console.log("pushing");
        // let database = firebase.database();
        // let newPostRef  = database.ref('archives').push(JSON.parse(JSON.stringify(state.bingo)));

        const db = firebase.firestore();
        let res  =  await db.collection('archibes').add(JSON.parse(JSON.stringify(rootStore.state.bingo)));

        let newid = res.id;
        rootStore.state.bingo.id = newid;
        console.log("pushed"+newid);
      },
      initBingoArchives_local (state:ArchivesState,bingos:Array<Bingo>) {
        state.my_bingo_archives_local = bingos;
      },
    },
    actions: {

    }
}

export interface ArchivesState {
  my_bingo_archives_local: Array<Bingo>,
  my_bingo_archives: Array<Bingo>,
  recent_archives: Array<Bingo>,
}