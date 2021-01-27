export const user_setting = {
    namespaced: true,
    state: {
      allow_location: false
    } as UserSettingState,
    mutations: {
      setAllowLocation (state:UserSettingState,allow_location:boolean) {
        state.allow_location = allow_location;
        localStorage.setItem('settings', JSON.stringify(state));
      },
      // setSettings (state:UserSettingState,settings:UserSettingState){
      //   state.allow_location = settings.allow_location;
      // },
      doLoad (state:UserSettingState) {
        let settings_json:string =localStorage.settings;
        if(settings_json){
          let obj:any = JSON.parse(settings_json);
          state.allow_location = obj.allow_location;
        }
      }
    },
    actions: {

    }
}

interface UserSettingState {
  allow_location: Boolean,
}