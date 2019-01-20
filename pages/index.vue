<template>
  <div class="content">
    <div><el-row><Carousel/></el-row></div>
    <el-row class="category">
      <el-col
        class="title">
        木木家的美食
        <el-button
          type="text"
          class="more float-right button-text"
          @click="gouToMore('美食')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(cookData,index) in $store.state.index.cookList"
        :span="6"
        :key="'cook'+ index">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="'/items/itemDetail?id='+ cookData._id">
            <img
              :src="cookData.filename"
              class="image">
          </a>
          <div style="padding: 14px;">
            <span>
              <a
                :href="'/items/itemDetail?id='+ cookData._id"
                class="font-18">{{ cookData.title }}</a>
              <time class="time float-right ">{{ cookData.create }}</time>
            </span>
            <div class="bottom clearfix">
              <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
              <span class="font-18">{{ cookData.collectioncount }}</span>
              <a
                :href="'/users/mainPage?_id='+ cookData.creatorinfo._id"
                class="content-center float-right">
                <img
                  :src="cookData.creatorinfo.photo"
                  class="userinfo-photo"
                  alt="">
                <span>{{ cookData.creatorinfo.username }}</span>
              </a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="category">
      <el-col
        class="title">
        木木家的饮品
        <el-button
          type="text"
          class="more float-right"
          @click="gouToMore('饮品')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(drinkData,index) in $store.state.index.drinkList"
        :span="6"
        :key="'drink'+ index">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="'/items/itemDetail?id='+ drinkData._id">
            <img
              :src="drinkData.filename"
              class="image">
          </a>
          <div style="padding: 14px;">
            <span>
              <a
                :href="'/items/itemDetail?id='+ drinkData._id"
                class="font-18">{{ drinkData.title }}</a>
              <time class="time float-right ">{{ drinkData.create }}</time>
            </span>
            <div class="bottom clearfix">
              <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
              <span class="font-18">{{ drinkData.collectioncount }}</span>
              <a
                :href="'/users/mainPage?_id='+ drinkData.creatorinfo._id"
                class="content-center float-right">
                <img
                  :src="drinkData.creatorinfo.photo"
                  class="userinfo-photo"
                  alt="">
                <span>{{ drinkData.creatorinfo.username }}</span>
              </a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="category">
      <el-col
        class="title">
        木木家的烘焙
        <el-button
          type="text"
          class="more float-right"
          @click="gouToMore('烘焙')">更多</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        v-for="(bakeData,index) in $store.state.index.bakeList"
        :span="6"
        :key="'bake'+ index">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="'/items/itemDetail?id='+ bakeData._id">
            <img
              :src="bakeData.filename"
              class="image">
          </a>
          <div style="padding: 14px;">
            <span>
              <a
                :href="'/items/itemDetail?id='+ bakeData._id"
                class="font-18">{{ bakeData.title }}</a>
              <time class="time float-right ">{{ bakeData.create }}</time>
            </span>
            <div class="bottom clearfix">
              <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
              <span class="font-18">{{ bakeData.collectioncount }}</span>
              <a
                :href="'/users/mainPage?_id='+ bakeData.creatorinfo._id"
                class="content-center float-right">
                <img
                  :src="bakeData.creatorinfo.photo"
                  class="userinfo-photo"
                  alt="">
                <span>{{ bakeData.creatorinfo.username }}</span>
              </a>
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
.title {
  text-align: center;
  font-size: 25px;
}
.more {
  color: #ce4114;
  position: relative;
  top: 0px;
  right: 0px;
}
.more:hover {
  color: #f79a29;
}
.userinfo-photo {
  margin: 0 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
}
.bottom {
  margin-top: 13px;
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
a {
  color: #ce4114;
}
a:focus,
a:hover {
  color: #f79a29;
}
</style>
<script>
import Carousel from '../components/index/carousel.vue'
export default {
  components: {
    Carousel
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
