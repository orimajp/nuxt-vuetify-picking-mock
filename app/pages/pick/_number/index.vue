<template>
  <v-layout column justify-center>
    <template v-if="!isError">
      <PickForm
        :targetDetails="targetDetails"
        :instruction="instruction"
        @complete="complete"
        @displayError="openSnackbar"
      >
      </PickForm>

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
import PickForm from '~/components/PickForm'
import WorkBottomSheet from '~/components/WorkBottomSheet'
import DetailList from '~/components/DetailList'
import ErrorSnackbar from '~/components/ErrorSnackbar'

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
    PickForm,
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
  computed: {
    isError() {
      return this.errorMessage !== ''
    },
    targetDetails() {
      return this.details.filter(detail => !detail.completed)
    },
  },
  methods: {
    complete() {
      this.$router.push('/complete')
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
