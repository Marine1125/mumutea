const state = () => ({
  loginUser: ''
})

const mutations = {
  setLoginUser(state, val) {
    state.loginUser = val
  }
}

const actions = {
  setLoginUser({ commit }) {
    commit('setLoginUser', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
