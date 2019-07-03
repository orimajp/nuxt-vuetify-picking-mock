<template>
  <v-layout column justify-center>
    <template v-if="existsInstruction">
      <h1>{{instructionNumber | instructionNo}}</h1>
      <DetailList
        :header=true
        :details="details"
      >
      </DetailList>
    </template>

    <v-flex xs12>
      <v-alert
        v-model="noInstruction"
        type="warning"
      >
        検品対象の指示書が見つかりません。
      </v-alert>
    </v-flex>

    <v-footer
      fixied="false"
      app
    >
      <v-layout wrap>
        <v-flex xs6>
          <v-btn color="warning" large block @click="goSelect">指示書選択</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn color="primary" large block @click="goStartWork">作業開始</v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-layout>
</template>

<script>
import DetailList from '~/components/DetailList'

function getTargets(blocks) {
  if (blocks !== null && !blocks.completed()) {
    if (blocks.existsStartedInstruction()) {
      return  blocks.startedInstructions()
    }
    return blocks.nonCompletionInstructions()
  }
  return []
}

export default {
  components: {
    DetailList
  },
  head() {
    return {
      title: '指示書確認',
    }
  },
  async asyncData({store, params}) {
    store.dispatch('setTitle', '指示書確認')
    const code = params.blockcode
    if (code === null) {
      throw new Error('ロケブロックコードが指定されていません。')
    }

    const blocks = store.getters['bookcase/getLocationBlock'](code)
    const targets = getTargets(blocks)

    return {
      locationBlock: blocks,
      instructions: targets,
    }
  },
  computed: {
    existsInstruction() {
      return this.instructions.length > 0
    },
    noInstruction() {
      return this.instructions.length < 1
    },
    instructionNumber() {
      return this.getCurrentInstruction().instructionNumber
    },
    details() {
      return this.getCurrentInstruction().details
    }
  },
  methods: {
    getCurrentInstruction() {
      return this.instructions[0]
    },
    goSelect() {
      this.$router.replace('/select')
    },
    goStartWork() {
      this.$router.replace('/pick/' + this.instructionNumber)
    },
  }
}
</script>
