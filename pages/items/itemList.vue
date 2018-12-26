<template>
  <div class="content">
    <el-row>
      <Search/>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-tabs
          v-model="category"
          :stretch="true"
          type="card"
          @tab-click="handleClick">
          <el-tab-pane
            label="全部"
            name="全部"
            class="tab-style">
            <Cards
              :items="$store.state.item.itemList"
              :category="category"/></el-tab-pane>
          <el-tab-pane
            label="美食"
            name="美食"
            class="tab-style">
            <Cards
              :items="$store.state.item.cookList"
              :category="category"/></el-tab-pane>
          <el-tab-pane
            label="饮品"
            name="饮品"
            class="tab-style">
            <Cards
              :items="$store.state.item.drinkList"
              :category="category"/></el-tab-pane>
          <el-tab-pane
            label="烘焙"
            name="烘焙"
            class="tab-style">
            <Cards
              :items="$store.state.item.bakeList"
              :category="category"/></el-tab-pane>
          <el-tab-pane
            label="手工"
            name="手工"
            class="tab-style">
            <Cards
              :items="$store.state.item.handworkList"
              :category="category"/></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4">
        热门
        <hr>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.el-tabs__item {
  font-size: 18px !important;
  font-weight: 500;
}
</style>
<script>
import Search from '../../components/index/search.vue'
import Category from '../../components/items/category.vue'
import Cards from '../../components/items/itemCard.vue'
export default {
  components: {
    Search,
    Category,
    Cards
  },
  data() {
    return {
      category: this.$store.state.item.category
        ? this.$store.state.item.category
        : '全部'
    }
  },
  mounted() {
    this.fatchData()
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event)
    },
    fatchData: async function() {
      const {
        status,
        data: { code: code1, data: data1 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: '美食',
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
          category: '饮品',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setDrinkItem', status2 === 200 ? data2 : [])

      const {
        status: status3,
        data: { data: data3 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: '烘焙',
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setBakeItem', status3 === 200 ? data3 : [])

      const {
        status: status4,
        data: { data: data4 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          category: '手工',
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
