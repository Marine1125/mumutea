import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'
import item from './modules/item'
import user from './modules/user'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      index,
      item,
      user
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app }) {
        const {
          status: status1,
          data: {
            code: code1,
            data: { count: count1, results: results1 }
          }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '美食' }
        })
        commit(
          'index/setDishItem',
          status1 === 200 && code1 === 0 ? results1 : []
        )

        const {
          status: status2,
          data: {
            code: code2,
            data: { count: count2, results: results2 }
          }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '饮品' }
        })
        commit(
          'index/setDrinkItem',
          status2 === 200 && code2 === 0 ? results2 : []
        )

        const {
          status: status3,
          data: {
            code: code3,
            data: { count: count3, results: results3 }
          }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '烘焙' }
        })
        commit(
          'index/setBakeItem',
          status3 === 200 && code3 === 0 ? results3 : []
        )

        const {
          status: status4,
          data: {
            code: code4,
            data: { count: count4, results: results4 }
          }
        } = await app.$axios.get('/hots/getHots', {
          params: { category: '手工' }
        })
        commit(
          'index/setHandworkItem',
          status4 === 200 && code4 === 0 ? results4 : []
        )

        const {
          status: status5,
          data: {
            code: code5,
            data: { count: count5, results: results5 }
          }
        } = await app.$axios.get('/hots/getHots')
        commit(
          'item/setHotItem',
          status4 === 200 && code5 === 0 ? results5 : []
        )
      }
    }
  })

export default store
