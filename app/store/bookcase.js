export const state = () => ({
  bookCase: null,

  items: [],
})

export const getters = {
  getAllLocationBlock: (state) => state.bookCase.locationBlocks,

  getBookCase: (state) => state.bookCase,
  isUnestablished: (state) => state.bookCase === null,
  isCompleted: (state) => state.bookCase.completed(),
  existsStartedInstruction: (state) => state.bookCase.existsStartedInstruction(),
  getNonCompleteLocationBlocks: (state) => state.bookCase.nonCompleteLocationBlocks(),
  getStartedLocationBlocks: (state) => state.bookCase.startedLocationBlocks(),

  getLocationBlock: (state) => (code) => state.bookCase.getLocationBlock(code),

  // 上記のようなパラメータ付きgetterをmapGettersで展開したコンポーネントで使えない問題は解決方法が見つからず。nuxt.jsだから？

//  getLocationBlock: (state) => (code) => {return state.bookCase.locationBlocks.find(block => block.locationBlockCode === code)}
//  getLocationBlock: (state, getters) => code => getters.getAllLocationBlock().find(block => block.locationBlockCode === code)
//  getLocationBlock: (state, getters) => (code) => {return getters.getAllLocationBlock().find(block => block.locationBlockCode === code)}
//  getLocationBlock: (state, code) =>  state.bookCase.getLocationBlock(code),

  getInstruction: (state) => (number) => state.bookCase.getInstruction(number),
}

export const mutations = {
  setBookCase(state, bookCase) {
    state.bookCase = bookCase
  },
  pick(state, {instructionNumber, detailId}) {
    if (state.bookCase === null) {
      throw new Error('指示書箱がnullです。')
    }
    const instruction = state.bookCase.getInstruction(instructionNumber)
    if (instruction === null) {
      throw new Error('ピック対象の指示書が見つかりません')
    }
    const detail = instruction.getDetail(detailId)
    if (detail === null) {
      throw new Error('ピック対象の指示書明細が見つかりません')
    }
    detail.pick()
  }
}

export const actions = {
  setBookCase({commit}, bookCase) {
    commit('setBookCase', bookCase)
  },

  // https://stackoverflow.com/questions/46097687/vuex-passing-multiple-parameters-to-action
  // https://mseeeen.msen.jp/deal-with-multiple-arguments-with-action-or-mutation-in-vuex/
  // https://qiita.com/amagurik2/items/bc426b7a9fcec051b885
  pick({commit}, {instructionNumber, detailId}) {
    console.log(`instructionNumber=${instructionNumber}, detailId=${detailId}`)
    commit('pick', {instructionNumber, detailId})
  },
}
