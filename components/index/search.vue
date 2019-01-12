<template>
  <div class="serach-input">
    <el-autocomplete
      v-model="keyword"
      :fetch-suggestions="querySearchAsync"
      style="width: 100%; margin-bottom:5px;"
      placeholder="请输入内容"
      @select="handleSelect"
    ><el-button
      slot="append"
      icon="el-icon-search"
      class="search-button"
      @click="search"/></el-autocomplete>
    <a
      v-for="item in $store.state.item.hotItemList"
      :key="item._id"
      href="javascript:void(0)"
      class="hot-link"
      @click="goToList(item.title)">{{ item.title }}</a>
  </div>
</template>
<style scoped>
.search-button {
  border: #ecf5ff;
}
.serach-input {
  width: 40%;
  margin: 30px 30px 10px 30%;
}
.el-button--text {
  color: #ce4114;
  background: 0 0;
  padding-left: 0;
  padding-right: 0;
}
.hot-link {
  margin: 0 5px;
}
a {
  color: #ce4114;
}
a:focus,
a:hover {
  color: #f79a29;
}
</style>
<script>
export default {
  data() {
    return {
      keyword: ''
    }
  },
  watch: {
    async $route(from, to) {
      console.log(from + to)
      this.fatchData()
    }
  },
  mounted() {
    if (this.$store.state.item.keyword) {
      this.keyword = this.$store.state.item.keyword
    }
  },
  methods: {
    querySearchAsync: async function(queryString, cb) {
      let results = []
      if (!queryString) {
        this.$store.state.item.hotItemList.forEach(element => {
          results.push({ value: element.title, _id: element._id })
        })
      } else {
        await this.$axios
          .get('/items/getItemsByTitle', {
            params: {
              title: window.encodeURIComponent(queryString)
            }
          })
          .then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                resp.data.data.forEach(element => {
                  console.log(element)
                  results.push({ value: element.title, _id: element._id })
                })
              }
            }
          })
      }
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000)
    },
    handleSelect: async function(item) {
      this.$store.commit('item/setKeyword', item.value)
      this.$router.push({
        path: '/items/itemList',
        query: { keyword: item.value }
      })
      this.$store.commit('item/setCategory', 'all')
    },
    goToList: function(title) {
      this.keyword = title
      this.$store.commit('item/setKeyword', title)
      this.$router.push({
        path: '/items/itemList',
        query: { keyword: title }
      })
    },
    search: function() {
      this.$store.commit('item/setCategory', '全部')
      this.$store.commit('item/setKeyword', this.keyword)
      this.fatchData()
      this.$router.push({
        path: '/items/itemList',
        query: { keyword: this.keyword }
      })
      console.log(this.keyword)
    },
    fatchData: async function() {
      const {
        status,
        data: { code: code1, data: data1 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: 'dish',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      console.log(data1)
      this.$store.commit('item/setDishItem', status === 200 ? data1 : [])

      const {
        status: status2,
        data: { data: data2 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: 'drink',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setDrinkItem', status2 === 200 ? data2 : [])

      const {
        status: status3,
        data: { data: data3 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: 'bake',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setBakeItem', status3 === 200 ? data3 : [])

      const {
        status: status4,
        data: { data: data4 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: 'handwork',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setHandworkItem', status4 === 200 ? data4 : [])

      const {
        status: status5,
        data: { data: data5 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setItem', status5 === 200 ? data5 : [])

      this.$store.commit('item/setCategory', 'all')
    }
  }
}
</script>
