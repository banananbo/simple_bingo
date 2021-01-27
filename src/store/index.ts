import Vue from 'vue'
import Vuex from 'vuex'
import {Bingo,Cell} from "@lib/bingo/Bingo.ts";
import {User} from "@lib/bingo/user.ts";
import firebase from "firebase"
import {user_setting} from './modules/user_setting.ts'

Vue.use(Vuex);

interface State {
  bingo: Bingo,
  user: User,
  my_bingo_archives_local: Array<Bingo>,
  my_bingo_archives: Array<Bingo>,
  recent_archives: Array<Bingo>,
}

export default new Vuex.Store({
state: {
    bingo: null,
    user: new User(),
    my_bingo_archives: [],
    my_bingo_archives_local: [],
    recent_archives: [],
    
} as State,
modules: {
  user_setting
},
mutations: {
    setBingoData (state:State,bingo:Bingo) {
        state.bingo = bingo;
        localStorage.setItem('mainBingo', JSON.stringify(bingo));
    },
    setBingoId (state:State,id:string) {
      state.bingo.id = id;
　　},
    updatePlayer (state:State,user:User){
      console.log("update player");
      if(state.bingo){
        console.log("update player2");
        state.bingo.setPlayer(user);
      }
    },
    saveBingoData (state:State) {
      console.log('save');
      localStorage.setItem('mainBingo', JSON.stringify(state.bingo));
    },
    addToBingoArchivesLocal (state:State) {
      if(!state.user.is_guest) return; // ゲストでない場合はローカルに記録しない
      state.my_bingo_archives_local.unshift(state.bingo);
      localStorage.setItem('my_bingo_archives_local', JSON.stringify(state.my_bingo_archives_local));
    },
    login (state:State,user:User){
      state.user = user
    },
    async addToBingoDBArchives (state:State) {
      console.log("pushing");
      // let database = firebase.database();
      // let newPostRef  = database.ref('archives').push(JSON.parse(JSON.stringify(state.bingo)));

      const db = firebase.firestore();
      let res  =  await db.collection('archibes').add(JSON.parse(JSON.stringify(state.bingo)));

      let newid = res.id;
      state.bingo.id = newid;
      console.log("pushed"+newid);
    },
    initBingoArchives_local (state:State,bingos:Array<Bingo>) {
      state.my_bingo_archives_local = bingos;
    },
    discardPlayingGame (state:State){
       state.bingo = null;
       localStorage.removeItem('mainBingo');
    },
    loadRecentArchives (state:State){
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
    loadMyArchives (state:State) {
      const db = firebase.firestore();
      let room = "archives";
      let list:any[] = [];
      console.log("load my archives "+state.user.id);
      let query = db.collection(room).where(`user_id`,`==`,state.user.id).orderBy("_end_time","desc").limit(5);
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
    }
},
actions: {
  doSaveFinished (context:any) {
      // context.commit('addToBingoDBArchives');    
      context.commit('addToBingoArchivesLocal');
  },
  doLoad (context:any) {
    let strage_bingo = localStorage.mainBingo;
    if(strage_bingo == "null") strage_bingo = null;
    if(strage_bingo){
      let bingo = Bingo.createByJson(strage_bingo);
      bingo.checkBingo();
      context.commit('setBingoData',bingo);
    }

    let my_bingo_archives_local = localStorage.my_bingo_archives_local;
    if(my_bingo_archives_local){
      let my_bingo_archives_obj:Array<any> = JSON.parse(my_bingo_archives_local);
      let arr:Array<Bingo> = [];
      my_bingo_archives_obj.forEach( o => arr.push( Bingo.createByObj(o) ) )
      context.commit('initBingoArchives_local',arr);
    }

    let login_user_json = localStorage.login_user;
    if(login_user_json){
      console.log(User.createByJson(login_user_json));
      context.commit('login',User.createByJson(login_user_json));
    }
    context.commit('loadRecentArchives');
    context.commit('loadMyArchives');
    context.commit("user_setting/doLoad");
  },
  doLoginTwitter (context:any) {
    let provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result:any) => {
        let user =new User(`t-${result.user.uid}`,result.user.displayName,result.user.photoURL);
        console.log(result.user);
        context.commit('login',user);
        localStorage.setItem('login_user', JSON.stringify(user));
        context.commit('loadMyArchives');
        context.commit('updatePlayer',user);
      }).catch((error:any) => {
        alert(error.message);
      });
  },
  doLogin (context:any) {
    let provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth()
    .signInWithPopup(provider)
    .then((result:any) => {
        let user =new User(`g-${result.user.uid}`,result.user.displayName,result.user.photoURL);
        context.commit('login',user);
        localStorage.setItem('login_user', JSON.stringify(user));
        context.commit('loadMyArchives');
        context.commit('updatePlayer',user);
      }).catch((error:any) => {
        alert(error.message);
      });
  },
  doLogout (context:any) {
    context.commit('login',User.GUEST_USER);
    localStorage.setItem('login_user', JSON.stringify(User.GUEST_USER));
    context.commit('loadMyArchives');
    context.commit('updatePlayer',User.GUEST_USER);
  }
}
})