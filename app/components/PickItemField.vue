<template>
  <v-text-field
    label="商品コード"
    v-model="itemCode"
    :readonly="itemReadonly"
    type="number"
    ref="itemField"
    @focus="checkInvalidItemFocus"
    @keyup.enter="handleKeyUpEnterItem"
    @keydown.tab="handleKyeDownTabItem"
  >
  </v-text-field>
</template>

<script>
export default {
  props: {
    itemReadonly: {type: Boolean, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      itemCode: '',
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
        this.displayError('商品コードエラー')
        this.itemCode = ''
        return
      }
      this.itemCode = ''
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
    displayError(messaga) {
      this.$emit('displayError', messaga)
    }
  }
}
</script>
