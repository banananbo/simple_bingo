import Start from '@pages/Start.vue';
import BingoEdit from '@pages/BingoEdit.vue';
import BingoMain from '@pages/BingoMain.vue';
import BingoResult from '@pages/BingoResult.vue';
import MyPage from '@pages/MyPage.vue';
import BingoArchives from '@pages/BingoArchives.vue';
import BingoTop from '@pages/BingoTop.vue';
import TestPage from '@pages/TestPage.vue';
import Basic from '@templates/Basic.vue';

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
  { path: '/bingo', component: BingoTop },
];