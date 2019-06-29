<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-layout wrap mb-2>
      <v-flex xs12>
        <v-text-field
          label="ロケーション"
          v-model="locaCode"
          :readonly="locaReadonly"
          type="number"
          ref="locaField"
          @keyup.enter="handleKeyUpEnterLocation"
          @keydown.tab="handleKyeDownTabLocation"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          label="商品コード"
          v-model="itemCode"
          :readonly="itemReadonly"
          type="number"
          ref="itemField"
          @keyup.enter="handleKeyUpEnterItem"
          @keydown.tab="handleKyeDownTabItem"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <div class="rest-count">
          <transition name="fade" mode="out-in">
            <span :key="completeCount">{{completeCount}}</span>
          </transition>
          /
          <transition name="fade" mode="out-in">
            <span :key="allCount">{{allCount}}</span>
          </transition>
        </div>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    instruction: {type: Object, required: true},
    targetDetails: {type: Array, required: true}
  },
  data() {
    return {
      valid: true,
      locaCode: '',
      itemCode: '',
      locaReadonly: false,
    }
  },
  computed: {
    itemReadonly() {
      return this.locaCode === ''
    },
    allCount() {
      if (this.targetDetails.length === 0) {
        return 0
      }
      return this.targetDetails[0].allCount
    },
    started() {
      if (this.targetDetails.length === 0) {
        return false
      }
      return this.targetDetails[0].started
    },
    completeCount() {
      if (this.targetDetails.length === 0) {
        return 0
      }
      return this.targetDetails[0].completeCount
    },
  },
  watch: {
    targetDetails: function () {
      if (this.targetDetails.length === 0) {
        this.complete()
        return
      }
      if (this.targetDetails[0].started) {
        return;
      }
      this.enableLoca(true)
      this.locaCode = ''
      setTimeout(()=>this.setFocusLoca(), 500)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.started) {
        this.locaCode = this.targetDetails[0].location
        setTimeout(()=>this.setFocusItem(), 500)
        this.enableLoca(false)
        return
      }
      setTimeout(()=>this.setFocusLoca(), 500)
    })
  },
  methods: {
    ...mapActions('bookcase', ['pick']),
    handleKeyUpEnterLocation() {
      if (this.locaCode === '') {
        return
      }
      if (this.locaCode !== this.targetDetails[0].location) {
        this.displayError('ロケーションエラー')
        this.locaCode = ''
        return
      }
      this.setFocusItem()
      this.enableLoca(false)
    },
    handleKyeDownTabLocation() {
      // タブキーガード
      setTimeout(()=>this.setFocusLoca(), 500)
    },
    handleKeyUpEnterItem() {
      if (this.itemCode === '') {
        return
      }
      if (this.itemCode !== this.targetDetails[0].itemCode) {
        this.displayError('商品コードエラー')
        this.itemCode = ''
        return
      }
      this.itemCode = ''
      this.pick({instructionNumber: this.instruction.instructionNumber,
        detailId: this.targetDetails[0].detailId})
    },
    handleKyeDownTabItem() {
      // タブキーガード
      setTimeout(()=>this.setFocusItem(), 500)
    },

    enableLoca(enable) {
      this.locaReadonly = !enable
    },
    setFocusLoca() {
      if (!this.isError) {
        this.$refs.locaField.focus()
      }
    },
    setFocusItem() {
      this.$refs.itemField.focus()
    },

    displayError(message) {
      this.$emit('displayError', message)
    },
    complete() {
      this.$emit('complete')
    },
  },
}
</script>

<style scoped>
.rest-count {
  font-size: 200%;
  color: gray;
  padding: 10px;
  margin-left: 10px;
  text-align: right;
  border-color: gray;
  border-style: solid;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .05s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
