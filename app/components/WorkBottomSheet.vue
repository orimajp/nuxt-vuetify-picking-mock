<template>
  <v-bottom-sheet v-model="sheet">
    <v-list>
      <v-list-tile>
        <v-btn color="warning" large block @click="confirm">{{confirmMessage}}</v-btn>
      </v-list-tile>
      <v-list-tile>
        <v-btn large block @click="closeSheet">キャンセル</v-btn>
      </v-list-tile>
    </v-list>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    confirmMessage: String,
  },
  data() {
    return {
      sheet: false
    }
  },
  methods: {
    openSheet() {
      this.sheet = true
    },
    closeSheet() {
      this.sheet = false
    },
    confirm() {
      this.closeSheet()
      this.$emit('confirm')
    },
  }
}
</script>
