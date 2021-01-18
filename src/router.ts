import Start from './Start.vue';
import BingoEdit from './BingoEdit.vue';
import Selector from './Selector.vue';

export default [
  { path: '/', component: Start },
  { path: '/create', component: BingoEdit },
  { path: '/select', component: Selector },
//   { path: '/doneList', component: doneListView },
];