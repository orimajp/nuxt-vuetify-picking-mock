<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    onsubmit="return false"
  >
    <v-text-field
      label="商品コード"
      v-model="itemCode"
      :readonly="itemReadonly"
      :rules="itemCodeRules"
      type="number"
      ref="itemField"
      @focus="checkInvalidItemFocus"
      @keyup.enter="handleKeyUpEnterItem"
      @keydown.tab="handleKyeDownTabItem"
    >
    </v-text-field>
  </v-form>
</template>

<script>
export default {
  props: {
    itemReadonly: {type: Boolean, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      valid: true,
      correct: true,
      itemCode: '',
      itemCodeRules: [
        v => this.correct || '商品コードエラー'
      ],
    }
  },
  methods: {
    checkInvalidItemFocus() {
      if (this.itemReadonly) {
        this.setItemNextFocus()
      }
    },
    handleKeyUpEnterItem() {
      if (this.itemCode === '') {
        return
      }
      if (this.itemCode !== this.targetDetails[0].itemCode) {
        this.correct = false
        this.itemCode = ''
        return
      }
      this.itemCode = ''
      this.correct = true
      this.$refs.form.resetValidation()
      this.pickDetail()
    },
    handleKyeDownTabItem() {
      // タブキーガード
      setTimeout(()=>this.setFocusItem(), 300)
    },
    setFocusItem() {
      this.$refs.itemField.focus()
    },

    // 親コンポーネントメソッド呼び出しメソッド
    setItemNextFocus() {
      this.$emit('setItemNextFocus')
    },
    pickDetail() {
      this.$emit('pickDetail')
    },
  }
}
</script>
