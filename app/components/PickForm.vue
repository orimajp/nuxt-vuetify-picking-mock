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
          @focus="checkInvalidLocaFocus"
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
          @focus="checkInvalidItemFocus"
        >
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <PickCounter
          :targetDetails="targetDetails"
        >
        </PickCounter>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import PickCounter from '~/components/PickCounter'

export default {
  components: {
    PickCounter
  },
  props: {
    instruction: {type: Object, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      valid: true,
      locaCode: '',
      itemCode: '',
      locaInputState: true,
    }
  },
  computed: {
    itemReadonly() {
      return this.locaInputState
    },
    locaReadonly() {
      return !this.locaInputState
    },
    started() {
      if (this.targetDetails.length === 0) {
        return false
      }
      return this.targetDetails[0].started
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
        setTimeout(()=>this.setFocusItem(), 400)
        this.enableLoca(false)
        return
      }
      setTimeout(()=>this.setFocusLoca(), 400)
    })
  },
  methods: {
    ...mapActions('bookcase', ['pick']),
    checkInvalidLocaFocus() {
      if (this.locaReadonly) {
        this.$refs.itemField.focus()
      }
    },
    checkInvalidItemFocus() {
      if (this.itemReadonly) {
        this.$refs.locaField.focus()
      }
    },
    handleKeyUpEnterLocation() {
      if (this.locaCode === '') {
        return
      }
      if (this.locaCode !== this.targetDetails[0].location) {
        this.displayError('ロケーションエラー')
        this.locaCode = ''
        return
      }
      setTimeout(()=>this.setFocusItem(), 100)
      this.enableLoca(false)
    },
    handleKyeDownTabLocation() {
      // タブキーガード
      setTimeout(()=>this.setFocusLoca(), 400)
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
      setTimeout(()=>this.setFocusItem(), 400)
    },

    enableLoca(enable) {
      this.locaInputState = enable
    },
    setFocusLoca() {
      this.$refs.locaField.focus()
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
