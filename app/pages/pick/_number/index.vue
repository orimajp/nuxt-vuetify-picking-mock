<template>
  <v-layout column justify-center>
    <template v-if="!isError">
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

      <DetailList
        :header=false
        :details="targetDetails"
      >
      </DetailList>
    </template>

    <v-flex xs12>
      <v-alert
        v-model="isError"
        type="warning"
      >
        {{errorMessage}}
      </v-alert>
    </v-flex>

    <WorkBottomSheet
      ref="bottomSheet"
      confirmMessage="指示書選択へ"
      @confirm="goSelect"
    >
    </WorkBottomSheet>

    <ErrorSnackbar
      ref="snackbar"
    >
    </ErrorSnackbar>

    <v-footer
      fixied="false"
      app
    >
      <v-btn
        color="warning"
        large
        block
        @click="cancel"
      >
        検品中断
      </v-btn>
    </v-footer>
  </v-layout>
</template>

<script>
import WorkBottomSheet from '~/components/WorkBottomSheet'
import DetailList from '~/components/DetailList'
import ErrorSnackbar from '~/components/ErrorSnackbar'
import { mapActions } from 'vuex'

function getInstruction(store, instructionNumber) {
  const instruction = store.getters['bookcase/getInstruction'](instructionNumber)
  if (instruction === null) {
    throw new Error('指示書が見つかりません')
  }
  if (instruction.completed()) {
    throw new Error('指示書は完了済です。')
  }
  return instruction
}

export default {
  components: {
    WorkBottomSheet,
    DetailList,
    ErrorSnackbar
  },
  head() {
    return {
      title: '出荷検品',
    }
  },
  async asyncData({store, params}) {
    store.dispatch('setTitle', '出荷検品')
    const instructionNumber = params.number
    if (instructionNumber === null) {
      throw new Error('指示書番号が指定されていません。')
    }

    let targetInstruction = null
    let targetDetails = []
    let message = ''
    try {
      targetInstruction = getInstruction(store, instructionNumber)
      targetDetails = targetInstruction.details
    } catch (e) {
      message = e.message
    }

    return {
      instruction: targetInstruction,
      details: targetDetails,
      errorMessage: message
    }
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
    isError() {
      return this.errorMessage !== ''
    },
    targetDetails() {
      return this.details.filter(detail => !detail.completed)
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
        this.$router.push('/complete')
        return
      }
      if (this.targetDetails[0].started) {
        return;
      }
      this.enableLoca(true)
      this.locaCode = ''
//      this.setFocusLoca()
      setTimeout(()=>this.setFocusLoca(), 500)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.started) {
        this.locaCode = this.targetDetails[0].location
//        this.setFocusItem()
        setTimeout(()=>this.setFocusItem(), 1000)
        this.enableLoca(false)
        return
      }
//      this.setFocusLoca()
      setTimeout(()=>this.setFocusLoca(), 1000)
    })
  },
  methods: {
    ...mapActions('bookcase', ['pick']),
    handleKeyUpEnterLocation() {
      if (this.locaCode === '') {
        return
      }
      if (this.locaCode !== this.targetDetails[0].location) {
        this.openSnackbar('ロケーションエラー')
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
        this.openSnackbar('商品コードエラー')
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

    cancel() {
      if (this.isError) {
        this.goSelect()
        return
      }
      this.openSheet()
    },
    openSnackbar(message) {
      this.$refs.snackbar.open(message)
    },
    openSheet() {
      this.$refs.bottomSheet.openSheet()
    },
    goSelect() {
      this.$router.push('/select')
    },
  }
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
