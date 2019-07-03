<template>
  <v-layout
    column
    justify-center
    >
    <v-flex xs12 mt-5>
      <v-btn color="primary" large block @click="goSelect">出荷検品</v-btn>
    </v-flex>
    <v-flex xs12 mt-5>
      <v-alert
        v-model="alert"
        type="info"
      >
        このページに戻ってくるとテストデータが初期化されます
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import DataCreator from '~/models/DataCreator'

export default {
  head() {
    return {
      title: '業務選択',
    }
  },

  async fetch( { store } ) {
    store.dispatch('setTitle', '業務選択')
    store.dispatch('bookcase/setBookCase', DataCreator.createData())
  },
  data() {
    return {
      alert: true
    }
  },
  methods: {
    goSelect() {
      this.$router.replace('/select')
    },
  },
}
</script>
