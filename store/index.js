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
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '美食' }
        })
        commit('index/setDishItem', status === 200 ? data1 : [])

        const {
          status: status2,
          data: { data: data2 }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '饮品' }
        })
        commit('index/setDrinkItem', status2 === 200 ? data2 : [])

        const {
          status: status3,
          data: { data: data3 }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '烘焙' }
        })
        commit('index/setBakeItem', status3 === 200 ? data3 : [])

        const {
          status: status4,
          data: { data: data4 }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '手工' }
        })
        commit('index/setHandworkItem', status4 === 200 ? data4 : [])

        const {
          status: status5,
          data: { data: data5 }
        } = await app.$axios.get('/hots/getHots')
        console.log('data5')
        console.log(data5)
        commit('item/setHotItem', status4 === 200 ? data5 : [])
      }
    }
  })

export default store
