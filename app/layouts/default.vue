<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    ...mapGetters(['getTitle'])
  },
  computed: {
    toolbarTitle() {
      return this.getTitle()
    }
  }
}
</script>
