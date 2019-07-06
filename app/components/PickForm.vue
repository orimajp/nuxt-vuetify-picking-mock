<template>
  <v-layout wrap mb-2>
    <v-flex xs12>
      <PickLocaField
        ref="pickLocaField"
        :targetDetails="targetDetails"
        :locaReadonly="locaReadonly"
        @setLocaNextFocus="setLocaNextFocus"
        @enableLoca="enableLoca"
      >
      </PickLocaField>
    </v-flex>
    <v-flex xs8>
      <PickItemField
        ref="pickItemField"
        :targetDetails="targetDetails"
        :itemReadonly="itemReadonly"
        @setItemNextFocus="setItemNextFocus"
        @pickDetail="pickDetail"
      >
      </PickItemField>
    </v-flex>
    <v-flex xs4>
      <PickCounter
        :targetDetails="targetDetails"
      >
      </PickCounter>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex'
import PickCounter from '~/components/PickCounter'
import PickLocaField from '~/components/PickLocaField'
import PickItemField from '~/components/PickItemField'

export default {
  components: {
    PickCounter,
    PickLocaField,
    PickItemField
  },
  props: {
    instruction: {type: Object, required: true},
    targetDetails: {type: Array, required: true},
  },
  data() {
    return {
      valid: true,
      locaInputState: true,
    }
  },
  computed: {
    locaReadonly() {
      return !this.locaInputState
    },
    itemReadonly() {
      return this.locaInputState
    },
    started() {
      if (this.targetDetails.length === 0) {
        return false
      }
      return this.targetDetails[0].started
    },
  },
  watch: {
    targetDetails: function () {
      if (this.targetDetails.length === 0) {
        this.complete()
        return
      }
      if (this.targetDetails[0].started) {
        return;
      }
      this.enableLoca(true)
      this.$refs.pickLocaField.clearLoca()
      setTimeout(()=>this.$refs.pickLocaField.setFocusLoca(), 500)
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.started) {
        this.$refs.pickLocaField.setLoca(this.targetDetails[0].location)
        setTimeout(()=>this.$refs.pickItemField.setFocusItem(), 400)
        this.enableLoca(false)
        return
      }
      setTimeout(()=>this.$refs.pickLocaField.setFocusLoca(), 400)
    })
  },
  methods: {
    ...mapActions('bookcase', ['pick']),
    pickDetail() {
      this.pick({instructionNumber: this.instruction.instructionNumber,
        detailId: this.targetDetails[0].detailId})
    },
    enableLoca(enable) {
      this.locaInputState = enable
    },
    setItemNextFocus() {
      this.$refs.pickLocaField.setFocusLoca()
    },
    setLocaNextFocus() {
      this.$refs.pickItemField.setFocusItem()
    },

    // 親コンポーネントメソッド呼び出しメソッド
    complete() {
      this.$emit('complete')
    },
  },
}
</script>
