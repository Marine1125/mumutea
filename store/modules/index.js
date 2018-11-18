const state = () => ({
  cookList: [],
  drinkList: [],
  bakeList: [],
  handworkList: []
})

const mutations = {
  setDishItem(state, val) {
    state.cookList = val
  },
  setDrinkItem(state, val) {
    state.drinkList = val
  },
  setBakeItem(state, val) {
    state.bakeList = val
  },
  setHandworkItem(state, val) {
    state.handworkList = val
  }
}

const actions = {
  setDishItem({ commit }) {
    commit('setDishItem', val)
  },
  setDrinkItem({ commit }) {
    commit('setDrinkItem', val)
  },
  setBakeItem({ commit }) {
    commit('setBakeItem', val)
  },
  setHandworkItem({ commit }) {
    commit('setHandworkItem', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
