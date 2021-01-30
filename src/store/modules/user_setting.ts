import {i18n} from '../../i18n.ts';

export const user_setting = {
    namespaced: true,
    state: {
      allow_location: false,
      lang_site: 'ja',
      lang_contents: 'ja',
      speech_mode: false
    } as UserSettingState,
    getters: {
      eng_study_mode: (state:UserSettingState) =>{
        return ((state.lang_contents == 'en') && state.speech_mode)
      }
    },
    mutations: {
      setAllowLocation (state:UserSettingState,allow_location:boolean) {
        state.allow_location = allow_location;
        localStorage.setItem('settings', JSON.stringify(state));
      },
      setLangSite (state:UserSettingState,lang_site:string) {
        state.lang_site = lang_site;
        i18n.locale  = state.lang_site;
        localStorage.setItem('settings', JSON.stringify(state));
      },
      setLangContents (state:UserSettingState,lang_contents:string) {
        state.lang_contents = lang_contents;
        localStorage.setItem('settings', JSON.stringify(state));
      },
      setSpeechMode (state:UserSettingState,speech_mode:Boolean) {
        state.speech_mode = speech_mode;
        localStorage.setItem('settings', JSON.stringify(state));
      },
      setEnglishStudyMode  (state:UserSettingState,mode:Boolean) {
        state.speech_mode = mode;
        state.lang_contents = (mode)? 'en' : 'ja';
        localStorage.setItem('settings', JSON.stringify(state));
      },
      loadFromStrage (state:UserSettingState) {
        let settings_json:string =localStorage.settings;
        if(settings_json){
          let obj:any = JSON.parse(settings_json);
          if(obj.allow_location) state.allow_location = obj.allow_location;
          if(obj.lang_site) state.lang_site = obj.lang_site;
          if(obj.lang_contents) state.lang_contents = obj.lang_contents;
          if(obj.speech_mode) state.speech_mode = obj.speech_mode;
        }
        i18n.locale  = state.lang_site;
      }
    },
    actions: {

    }
}

export interface UserSettingState {
  allow_location: Boolean,
  lang_site: string,
  lang_contents: string,
  speech_mode: Boolean
}