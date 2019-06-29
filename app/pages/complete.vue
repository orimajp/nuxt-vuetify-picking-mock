<template>
  <v-layout column justify-center>
    <v-flex xs12>
      <v-alert
        v-model="alert"
        type="success"
      >
        ピック完了
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  async fetch( { store } ) {
    store.dispatch('setTitle', 'ピッキング')
  },
  head() {
    return {
      title: 'ピッキング',
    }
  },
  data() {
    return {
      alert: true,
    }
  },
  mounted() {
    this.$nextTick(() => setTimeout(() => this.$router.push('/select'), 1000))
  }
}
</script>
