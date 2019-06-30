<template>
  <v-text-field
    label="ロケーション"
    v-model="locaCode"
    :readonly="locaReadonly"
    type="number"
    ref="locaField"
    @focus="checkInvalidLocaFocus"
    @keyup.enter="handleKeyUpEnterLocation"
    @keydown.tab="handleKyeDownTabLocation"
  >
  </v-text-field>
</template>

<script>
export default {
  props: {
    locaReadonly: {type: Boolean, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      locaCode: '',
    }
  },
  methods: {
    checkInvalidLocaFocus() {
      if (this.locaReadonly) {
        this.$refs.itemField.focus()
      }
    },
    handleKeyUpEnterLocation() {
      if (this.locaCode === '') {
        return
      }
      if (this.locaCode !== this.targetDetails[0].location) {
        this.displayError('ロケーションエラー')
        this.clearLoca()
        return
      }
      this.enableLoca(false)
      setTimeout(()=>this.setLocaNextFocus(), 100)
    },
    handleKyeDownTabLocation() {
      // タブキーガード
      setTimeout(()=>this.setFocusLoca(), 300)
    },
    setFocusLoca() {
      this.$refs.locaField.focus()
    },
    clearLoca() {
      this.locaCode = ''
    },
    setLoca(locaCode) {
      this.locaCode = locaCode
    },

    // 親コンポーネントメソッド呼び出しメソッド
    setLocaNextFocus() {
      this.$emit('setLocaNextFocus')
    },
    enableLoca(enable) {
      this.$emit('enableLoca', enable)
    },
    displayError(messaga) {
      this.$emit('displayError', messaga)
    }
  }
}
</script>
