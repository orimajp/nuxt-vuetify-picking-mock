<template>
  <v-list two-line>
    <template v-if="header">
      <v-subheader>明細一覧</v-subheader>
      <v-divider></v-divider>
    </template>
    <transition-group name="list">
      <template v-for="(detail, index) in details">
        <v-list-tile
          :key="detail.location"
          :class="getStyleClass(index)"
          ripple
        >
          <v-list-tile-content>
            <v-list-tile-title>{{detail.location | locationName}}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">
              <span class="detail-label">商品名</span><span>{{detail.itemName}}</span>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title class="text--primary">
              <span class="detail-label">商品コード</span><span>{{detail.itemCode}}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>
              <span class="detail-count">{{detail.allCount | detailCount}}</span>
            </v-list-tile-action-text>
            <v-icon
              v-if="detail.completed"
              color="grey darken-2"
            >
              done
            </v-icon>
            <v-icon
              v-else
              color="grey lighten-3"
            >
              done_outline
            </v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          v-if="index + 1 < details.length"
          :key="index"
        >
        </v-divider>
      </template>
    </transition-group>
  </v-list>
</template>

<script>
export default {
  props: {
    details: Array,
    header: Boolean,
  },
  methods: {
    getStyleClass(index) {
      return !this.header && index === 0 ? 'first-list' : ''
    },
  },
}
</script>

<style scoped>
.detail-label {
  display: inline-block;
  width: 100px;
}
.first-list {
  background-color: cyan;
}
.detail-count {
  color: #47494e;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(500px);
}
</style>
