import Start from './Start.vue';
import BingoEdit from './BingoEdit.vue';
import Selector from './Selector.vue';
import BingoMain from './BingoMain.vue';
import BingoResult from './BingoResult.vue';

export default [
  { path: '/', component: Start },
  { path: '/create', component: BingoEdit },
  { path: '/select', component: Selector },
  { path: '/game', component: BingoMain },
  { path: '/result', component: BingoResult },
];