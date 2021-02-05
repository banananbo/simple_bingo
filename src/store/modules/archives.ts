import {Bingo} from "@lib/bingo/Bingo";
import firebase from "firebase"
import rootStore from '../index';

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
              list.push(Bingo.createByObj(doc.data(),doc.id));
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
              list.push(Bingo.createByObj(doc.data()));  
            });
            state.my_bingo_archives = list;
          })
          .catch(err => {
            console.log('Error getting documents', err);
          })     
      },

      initBingoArchives_local (state:ArchivesState,bingos:Array<Bingo>) {
        state.my_bingo_archives_local = bingos;
      },
    },
    actions: {
      async addToBingoDBArchives (context:any) {
        // firestore
        const db = firebase.firestore();
        // test的に参照を追加している
        let bingobj:any = JSON.parse(JSON.stringify(context.rootState.bingo));
        bingobj.user_ref = db.doc(`users/${context.rootState.user.user.id}`);
        let res  =  await db.collection('archives').add(bingobj);
        context.rootState.bingo.id = res.id;
        context.commit('addToBingoArchivesLocal');
        
        context.commit('loadMyArchives');
      },
    }
}

export interface ArchivesState {
  my_bingo_archives_local: Array<Bingo>,
  my_bingo_archives: Array<Bingo>,
  recent_archives: Array<Bingo>,
}