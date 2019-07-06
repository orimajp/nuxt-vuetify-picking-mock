<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    onsubmit="return false"
  >
    <v-text-field
      label="ロケーション"
      v-model="locaCode"
      :readonly="locaReadonly"
      :rules="locaCodeRules"
      type="number"
      ref="locaField"
      @focus="checkInvalidLocaFocus"
      @keyup.enter="handleKeyUpEnterLocation"
      @keydown.tab="handleKyeDownTabLocation"
    >
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    locaReadonly: {type: Boolean, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      valid: true,
      correct: true,
      locaCode: '',
      locaCodeRules: [
        v => this.correct || 'ロケーションエラー',
      ],
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
        this.correct = false
        this.clearLoca()
        return
      }
      this.correct = true
      this.$refs.form.resetValidation()
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
  }
}
</script>
