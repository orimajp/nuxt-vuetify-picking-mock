<template>
  <v-snackbar
    v-model="snackbar"
    color="error"
    auto-height
    top
    :timeout=1000
  >
    {{message}}
    <v-btn
      dark
      flat
      @click="close"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      message: '',
    }
  },
  methods: {
    open(message) {
      this.message = message
      this.snackbar = true
    },
    close() {
      this.snackbar = false
    }
  }
}
</script>
