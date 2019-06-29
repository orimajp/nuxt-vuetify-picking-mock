<template>
  <v-layout column justify-center>
    <v-flex xs12>
      <v-alert
        v-model="completed"
        type="info"
      >
        未完了の指示書はありません
      </v-alert>
    </v-flex>

    <v-flex xs12 mb-3>
      <v-alert
        v-model="started"
        type="warning"
      >
        仕掛かり中の指示書のみ選択可能です
      </v-alert>
    </v-flex>

    <v-data-table
      :items="targetBlocks"
      :headers="headers"
      class="elevation-1"
      hide-actions
      v-if="!completed"
    >
      <template v-slot:items="props">
        <tr @click="goList(props.item.locationBlockCode)">
          <td>{{props.item.locationBlockCode}}</td>
          <td class="text-xs-right">{{targetInstructionCount(props.item)}}</td>
        </tr>
      </template>
    </v-data-table>

    <v-footer
      fixied="false"
      app
    >
      <v-btn color="warning" large block @click="goTop">業務選択</v-btn>
    </v-footer>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch( { store } ) {
    store.dispatch('setTitle', '指示書選択')
  },
  head() {
    return {
      title: '指示書選択',
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'ロケブロック',
          align: 'left',
          sortable: false,
          name: 'locaBlock',
        },
        {
          text: '指示書数',
          align: 'right',
          sortable: false,
          name: 'bookNumber',
        },
      ],
    }
  },
  computed: {
    completed() {
      return this.isCompleted()
    },
    started() {
      return this.existsStartedInstruction()
    },
    targetBlocks() {
      if (this.existsStartedInstruction()) {
        console.log('開始済リスト')
        return this.getStartedLocationBlocks()
      }
      console.log('全リスト')
      return this.getNonCompleteLocationBlocks()
    },
  },
  methods: {
    ...mapGetters('bookcase', ['isCompleted', 'getNonCompleteLocationBlocks',
      'getStartedLocationBlocks', 'existsStartedInstruction']),
    goTop() {
      this.$router.push('/')
    },
    goList(code) {
      this.$router.push('/list/' + code)
    },
    targetInstructionCount(block) {
      console.log(block)
      if (this.existsStartedInstruction()) {
        return block.startedInstructionsNumber()
      }
      return block.nonCompletionInstructionsNumber()
    }
  }
}
</script>
