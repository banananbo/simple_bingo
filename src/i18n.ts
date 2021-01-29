import VueI18n from 'vue-i18n';
import Vue from 'vue';

// i18n
const dateTimeFormats = {
    'en': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric'
      }
    },
    'ja': {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    }
  }
  
  let locale:string = 'en';
  
  let brouser_lang:string = navigator.language;
  if(['ja','ja-JP'].includes(brouser_lang)){
    locale = 'ja';
  }
  
  
  Vue.use(VueI18n);
  const i18n_data = require('./lang/messages.json');

  export const i18n = new VueI18n({
    dateTimeFormats,
    locale: locale, // デフォルト言語はjaにしておくが、ブラウザの言語を拾ってきてここに入れる => 言語変更されたら書き換える
    messages: i18n_data
  });