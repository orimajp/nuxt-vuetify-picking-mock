<template>
  <div class="rest-count">
    <transition name="fade" mode="out-in">
      <span :key="completeCount">{{completeCount}}</span>
    </transition>
    /
    <transition name="fade" mode="out-in">
      <span :key="allCount">{{allCount}}</span>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    targetDetails: {type: Array, required: true},
  },
  computed: {
    allCount() {
      if (this.targetDetails.length === 0) {
        return 0
      }
      return this.targetDetails[0].allCount
    },
    completeCount() {
      if (this.targetDetails.length === 0) {
        return 0
      }
      return this.targetDetails[0].completeCount
    },
  },
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
