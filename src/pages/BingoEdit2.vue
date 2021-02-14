<template>
  <table>
    <tr
      v-for="fruit in fruitsDisp"
      :key="fruit.id"
    >
      <td>{{ fruit.name }}</td>
      <td>{{ fruit.price }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      fruits: [
        { id: 1, name: 'りんご', price: 200, order: 1 },
        { id: 2, name: 'みかん', price: 50, order: 2 },
        { id: 3, name: 'ばなな', price: 100, order: 3 },
      ],
      draggingItem: null, // ドラッグ中の要素を保持するための変数
    };
  },
  computed: {
    fruitsDisp() {
      return this.fruits.sort((a, b) => a.order - b.order);
    },
  },
  methods: {
    dragstart(item, e) {
      this.draggingItem = item; // ドラッグ中の要素を保持
      e.dataTransfer.effectAllowed = 'move'; // 移動モードに設定
      e.target.style.opacity = 0.5; // ドラッグ中要素のスタイルを変更
    },
    dragenter(item) {
      // ドラッグ中の要素とドラッグ先の要素の表示順を入れ替える
      [item.order, this.draggingItem.order] = [this.draggingItem.order, item.order];
    },
    dragover(e) {
      e.dataTransfer.dropEffect = 'move'; // 移動モードに設定
    },
    dragend(e) {
      e.target.style.opacity = 1; // ドラッグ中要素のスタイルを変更（元に戻す）
      this.draggingItem = null; // ドラッグ中の要素をクリア
    },
  }
};
</script>
<style>
pre {
  text-align: start;
  background: #2c3e50;
  color: white;
  padding: 10px;
  font-weight: bold;
}

.item {
  padding: 5px;
}

.container {
  margin: auto;
  width: 600px;
  display: flex;
  justify-content: space-around;
}
</style>