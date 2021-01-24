import Start from '@pages/Start.vue';
import BingoEdit from '@pages/BingoEdit.vue';
import BingoMain from '@pages/BingoMain.vue';
import BingoResult from '@pages/BingoResult.vue';
import MyPage from '@pages/MyPage.vue';
import BingoArchives from '@pages/BingoArchives.vue';


export default [
  { path: '/', component: Start },
  { path: '/create', component: BingoEdit },
  { path: '/game', component: BingoMain },
  { path: '/result/:id', component: BingoResult },
  { path: '/mypage', component: MyPage },
  { path: '/archives', component: BingoArchives },
];