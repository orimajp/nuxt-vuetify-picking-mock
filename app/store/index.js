export const state = () => ({
  title: ''
})

export const getters = {
  getTitle: (state) => state.title
}

export const mutations = {
  setTitle(state, title) {
    state.title = title
  }
}

export const actions = {
  setTitle( { commit }, title) {
    commit('setTitle', title)
  }
}
