<template>
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper" @click="close">
            <div class="modal-container" @click="(event)=>{ event.stopPropagation(); }">

              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="close">
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
    import Vue from 'vue'
    export default Vue.extend({
      methods: {
        close(){
          console.log("lets");
          this.$emit('close')
        }
      }
    })
</script>
<style scoped>
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
  width: 90%;
  height: 80vh;
  overflow: auto;
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
  width: 90%;
  height: 80vh;
}

.modal-footer {
  height: 50px;
}

.modal-default-button {
  float: right;
}
</style>