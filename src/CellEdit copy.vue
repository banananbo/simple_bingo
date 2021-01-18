<template>
<transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container modal-dialog modal-dialog-fluid">

              <div class="modal-header">
                <slot name="header">
                  {{cell.content.title}}
                </slot>
              </div>

              <div class="modal-body">
                <div name="body" class="boxContainer">
                  <div v-for="(content, index) in contents" :key="index" class="box">
                        <Cell :content='content' :size="cell.size" :canvasid="'canvas'+index"></Cell>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="$emit('close')">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>
<script lang="ts">

import Vue from "vue"
import Cell from "./Cell.vue";
import {Content} from "./content.ts"

export type DataType ={
      contents: Array<Content>
}

export default Vue.extend({
    data(): DataType {
        return {
            contents: Content.contents,
        };
    },

    props: {
        cell: {
            type: Cell,
            required: true
        },
    },
  components: {
    Cell
  },
})
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.box{
  float: left;
}

.boxContainer{
  overflow: hidden;
}

.modal-dialog-fluid {
  max-width: inherit;
  width: 80%;
  margin-left: 15px;
  overflow-y: auto;
  height: 100%;
}
</style>