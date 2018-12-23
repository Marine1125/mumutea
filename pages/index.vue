<template>
  <div class="content">
    <div>
      <el-row><Search/></el-row>
      <el-row><Carousel/>
      </el-row>
    </div>
    <el-row class="category">
      <el-col
        :span="3"><h3>木木家的厨房</h3></el-col>
      <el-col
        :span="1"
        :offset="20">
        <el-button
          type="text"
          @click="gouToMore('dish')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(cookData,index) in $store.state.index.cookList"
        :span="6"
        :key="'cook'+ index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="cookData.filename"
            class="image">
          <div style="padding: 14px;">
            <span>{{ cookData.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ cookData.create }}</time>
              <el-button
                type="text"
                class="button"
                @click="getDetails(cookData._id)">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="category">
      <el-col
        :span="3"><h3>木木家的水吧</h3></el-col>
      <el-col
        :span="1"
        :offset="20">
        <el-button
          type="text"
          @click="gouToMore('drink')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(drinkData,index) in $store.state.index.drinkList"
        :span="4"
        :key="'drink'+ index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="drinkData.filename"
            class="image">
          <div style="padding: 14px;">
            <span>{{ drinkData.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ drinkData.create }}</time>
              <el-button
                type="text"
                class="button"
                @click="getDetails(drinkData._id)">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="category">
      <el-col
        :span="3"><h3>木木家的烘焙</h3></el-col>
      <el-col
        :span="1"
        :offset="20">
        <el-button
          type="text"
          @click="gouToMore('bake')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(bakeData,index) in $store.state.index.bakeList"
        :span="4"
        :key="'bake'+ index"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="bakeData.filename"
            class="image">
          <div style="padding: 14px;">
            <span>{{ bakeData.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ bakeData.create }}</time>
              <el-button
                type="text"
                class="button"
                @click="getDetails(bakeData._id)">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="category">
      <el-col
        :span="3"><h3>木木家的手工</h3></el-col>
      <el-col
        :span="1"
        :offset="20">
        <el-button
          type="text"
          @click="gouToMore('handwork')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(handworkData,index) in $store.state.index.handworkList"
        :span="4"
        :key="'handwork'+ index">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="handworkData.filename"
            class="image">
          <div style="padding: 14px;">
            <span>{{ handworkData.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ handworkData.create }}</time>
              <el-button
                type="text"
                class="button"
                @click="getDetails(handworkData._id)">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  height: 200px;
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.category {
  margin: 20px 0px;
}
h3 {
  font-weight: 400;
  color: #1f2f3d;
}
</style>
<script>
import Carousel from '../components/index/carousel.vue'
import Search from '../components/index/search.vue'
export default {
  components: {
    Carousel,
    Search
  },
  data() {
    return {
      cookDatas: [],
      drinkDatas: [],
      bakeDatas: [],
      handworkDatas: []
    }
  },
  methods: {
    getDetails: function(id) {
      this.$router.push({ path: '/items/itemDetail', query: { id: id } })
    },
    gouToMore: function(category) {
      this.$store.commit('item/setCategory', category)
      this.$router.push({
        path: '/items/itemList',
        query: { category: category }
      })
    }
  }
}
</script>
