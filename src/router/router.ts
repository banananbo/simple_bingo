import Start from '@pages/Start.vue';
import BingoEdit from '@pages/BingoEdit.vue';
import BingoMain from '@pages/BingoMain.vue';
import BingoResult from '@pages/BingoResult.vue';
import MyPage from '@pages/MyPage.vue';
import BingoArchives from '@pages/BingoArchives.vue';
import BingoTop from '@pages/BingoTop.vue';
import TestPage from '@pages/TestPage.vue';
import ABingoEdit from '@pages/edit/ABingoEdit.vue';
import Template from '@pages/edit/Template.vue';
import YomeMyPage from '@pages/edit/MyPage.vue';
import TemplateList from '@pages/edit/TemplateList.vue';
import ABingoHome from '@pages/edit/ABingoHome.vue';
import ABingoMain from '@pages/play/ABingoMain.vue';
import Basic from '@templates/Basic.vue';
import Yome from '@templates/Yome.vue';

export default [
  { path: '/', component: Basic,
    children: [
      {path: "",component: Start},
      { path: '/create', component: BingoEdit },
      { path: '/game', component: BingoMain },
      { path: '/result/:id', component: BingoResult },
      { path: '/mypage', component: MyPage },
      { path: '/archives', component: BingoArchives },
      { path: '/test', component: TestPage },
    ]
  },
  { path: '/bingo', component: ABingoEdit },
  { path: '/template/:id', component: Template },
  { path: '/yome', component: Yome,
      children: [
        {path: "",component: ABingoHome},
        {path: "edit",component: ABingoEdit},
        {path: "mypage", component: YomeMyPage},
        { path: 'template/:id', component: Template },
        { path: 'others', component: TemplateList },
        { path: 'game/:id', component: ABingoMain },
      ]
  },
  // { path: '*', component: TestPage },
];