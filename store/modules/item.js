const state = () => ({
  itemList: [],
  cookList: [],
  drinkList: [],
  bakeList: [],
  hotItemList: [],
  keyword: '',
  category: ''
})

const mutations = {
  setItem(state, val) {
    state.itemList = val
  },
  setDishItem(state, val) {
    state.cookList = val
  },
  setDrinkItem(state, val) {
    state.drinkList = val
  },
  setBakeItem(state, val) {
    state.bakeList = val
  },
  setKeyword(state, val) {
    state.keyword = val
  },
  setCategory(state, val) {
    state.category = val
  },
  setHotItem(state, val) {
    state.hotItemList = val
  }
}

const actions = {
  setItem({ commit }) {
    commit('setItem', val)
  },
  setDishItem({ commit }) {
    commit('setDishItem', val)
  },
  setDrinkItem({ commit }) {
    commit('setDrinkItem', val)
  },
  setBakeItem({ commit }) {
    commit('setBakeItem', val)
  },
  setHotItem({ commit }) {
    commit('setHotItem', val)
  },
  setKeyword({ commit }) {
    commit('setKeyword', val)
  },
  setCategory({ commit }) {
    commit('setCategory', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
