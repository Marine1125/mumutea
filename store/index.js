import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import item from './modules/item'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      index,
      item
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        const {
          status,
          data: { code: code1, data: data1 }
        } = await app.$axios.get('/items/getItems', {
          params: { category: 'dish' }
        })
        commit('index/setDishItem', status === 200 ? data1 : [])

        const {
          status: status2,
          data: { data: data2 }
        } = await app.$axios.get('/items/getItems', {
          params: { category: 'drink' }
        })
        commit('index/setDrinkItem', status2 === 200 ? data2 : [])

        const {
          status: status3,
          data: { data: data3 }
        } = await app.$axios.get('/items/getItems', {
          params: { category: 'bake' }
        })
        commit('index/setBakeItem', status3 === 200 ? data3 : [])

        const {
          status: status4,
          data: { data: data4 }
        } = await app.$axios.get('/items/getItems', {
          params: { category: 'handwork' }
        })
        commit('index/setHandworkItem', status4 === 200 ? data4 : [])

        const {
          status: status5,
          data: { data: data5 }
        } = await app.$axios.get('/items/getHotItems')
        commit('item/setHotItem', status4 === 200 ? data5 : [])
      }
    }
  })

export default store
