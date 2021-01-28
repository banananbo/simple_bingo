import {User} from "@lib/bingo/user.ts";
import firebase from "firebase"

export interface UserState {
    user: User,
}

export const user = {
    namespaced: true,
    state: {
        user: new User(),
    } as UserState,
    mutations: {
        login (state:UserState,user:User){
            state.user = user
            localStorage.setItem('login_user', JSON.stringify(user));
        },
        loadLoginUser(state:UserState){
            let login_user_json = localStorage.login_user;
            if(login_user_json){
              console.log(User.createByJson(login_user_json));
              state.user = User.createByJson(login_user_json);
            }   
        }
    },
    actions: {
        doLogin (context:any, provider:any) {
            // let provider = new firebase.auth.GoogleAuthProvider();
            // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
            const sns_id:string = (provider instanceof firebase.auth.GoogleAuthProvider)? 'g' : 't';
            firebase.auth()
            .signInWithPopup(provider)
            .then((result:any) => {
                const db = firebase.firestore();
                const user_id:string = `${sns_id}-${result.user.uid}`
                let user:User = null;
                let query = db.collection('users').doc(user_id);
                query.get().then(
                  
                  doc => {
                    if(doc.exists){
                        const data = doc.data();
                        user = new User(user_id,data.name,data.image);
                    }else{
                        // 新規登録
                        user = new User(user_id,result.user.displayName,result.user.photoURL);
                        query.set(user.obj);
                    }

                    console.log('user is ');
                    console.log(user);
                    context.commit('login',user);
                    context.commit('archives/loadMyArchives', { root: true });
                    context.commit('updatePlayer',user, { root: true });
                  })
                //   .catch(err => {
                //     console.log('Error getting documents', err);
                //   })

              }).catch((error:any) => {
                alert('ログインに失敗しました');
              });
          },
          
            doLogout (context:any) {
                context.commit('login',User.GUEST_USER);
                context.commit('archives/loadMyArchives', { root: true });
                context.commit('updatePlayer',User.GUEST_USER, { root: true });
            }
    }
}