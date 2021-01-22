import Start from '@pages/Start.vue';
import BingoEdit from '@pages/BingoEdit.vue';
import BingoMain from '@pages/BingoMain.vue';
import BingoResult from '@pages/BingoResult.vue';

export default [
  { path: '/', component: Start },
  { path: '/create', component: BingoEdit },
  { path: '/game', component: BingoMain },
  { path: '/result', component: BingoResult },
];