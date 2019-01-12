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
              :category="category"/>
            <el-row>
              <button
                round
                class="button page-button"
                @click="getMoreItems('all')">获取更多内容<i class="el-icon-arrow-down"/></button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="美食"
            name="美食"
            class="tab-style">
            <Cards
              :items="$store.state.item.cookList"
              :category="category"/>
            <el-row>
              <button
                round
                class="button page-button"
                @click="getMoreItems('dish')">获取更多内容<i class="el-icon-arrow-down"/></button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="饮品"
            name="饮品"
            class="tab-style">
            <Cards
              :items="$store.state.item.drinkList"
              :category="category"/>
            <el-row>
              <button
                round
                class="button page-button"
                @click="getMoreItems('drink')">获取更多内容<i class="el-icon-arrow-down"/></button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label="烘焙"
            name="烘焙"
            class="tab-style">
            <Cards
              :items="$store.state.item.bakeList"
              :category="category"/>
            <el-row>
              <button
                round
                class="button page-button"
                @click="getMoreItems('bake')">获取更多内容<i class="el-icon-arrow-down"/></button>
            </el-row>
          </el-tab-pane>
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
.button {
  border-color: #ce4114 !important;
  color: #ce4114;
  background-color: white;
}
.button:hover {
  background-color: #ce4114;
  color: white;
}
.page-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 20px;
  width: 100%;
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
        : '全部',
      categoryObj: {
        dish: {
          name: '美食',
          offset: 20,
          store: 'item/setDishItem'
        },
        drink: {
          name: '饮品',
          offset: 20,
          store: 'item/setDrinkItem'
        },
        bake: {
          name: '烘焙',
          offset: 20,
          store: 'item/setBakeItem'
        },
        all: {
          name: '',
          offset: 20,
          store: 'item/setItem'
        }
      }
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
        status: status5,
        data: { data: data5 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          title: window.encodeURIComponent(this.$store.state.item.keyword)
        }
      })
      this.$store.commit('item/setItem', status5 === 200 ? data5 : [])

      this.$store.commit('item/setCategory', 'all')
    },
    getMoreItems: async function(category) {
      const {
        status,
        data: { data: data1 }
      } = await this.$axios.get('/items/getItems', {
        params: {
          offset: this.categoryObj[category].offset,
          title: this.categoryObj[category].name
        }
      })
      if (status === 200 && data1.length !== 0) {
        this.categoryObj[category].offset =
          this.categoryObj[category].offset + 20
        this.$store.commit(
          this.categoryObj[category].store,
          this.$store.state.item.itemList.concat(data1)
        )
      } else {
        this.$message.error('没有更多内容啦！！！')
      }
    }
  }
}
</script>
