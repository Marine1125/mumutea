<template>
  <div class="content">
    <div >
      <el-carousel height="450px">
        <el-carousel-item
          v-for="item in 4"
          :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row class="category">
      <el-col
        :span="3"
        :offset="3"><h3>木木家的厨房</h3></el-col>
      <el-col
        :span="1"
        :offset="14"><a href="/">更多</a></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
        v-for="(cookData,index) in cookDatas"
        :span="3"
        :key="'cook'+ index"
        :offset="index==0 ? 3:0"
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
        :span="3"
        :offset="3"><h3>木木家的水吧</h3></el-col>
      <el-col
        :span="1"
        :offset="14"><a href="/">更多</a></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
        v-for="(drinkData,index) in drinkDatas"
        :span="3"
        :key="'drink'+ index"
        :offset="index==0 ? 3:0"
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
        :span="3"
        :offset="3"><h3>木木家的烘焙</h3></el-col>
      <el-col
        :span="1"
        :offset="14"><a href="/">更多</a></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
        v-for="(bakeData,index) in bakeDatas"
        :span="3"
        :key="'bake'+ index"
        :offset="index==0 ? 3:0"
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
        :span="3"
        :offset="3"><h3>木木家的手工</h3></el-col>
      <el-col
        :span="1"
        :offset="14"><a href="/">更多</a></el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col
        v-for="(handworkData,index) in handworkDatas"
        :span="3"
        :key="'handwork'+ index"
        :offset="index==0 ? 3:0">
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
  height: 250px;
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
export default {
  data() {
    return {
      cookDatas: [],
      drinkDatas: [],
      bakeDatas: [],
      handworkDatas: []
    }
  },
  async mounted() {
    await this.$axios.get('/items/getItems').then(resp => {
      this.cookDatas = resp.data.data
    })
    await this.$axios.get('/items/getItems').then(resp => {
      this.drinkDatas = resp.data.data
    })
    await this.$axios.get('/items/getItems').then(resp => {
      this.bakeDatas = resp.data.data
    })
    await this.$axios.get('/items/getItems').then(resp => {
      this.handworkDatas = resp.data.data
    })
  },
  methods: {
    getDetails: function(id) {
      this.$router.push({ name: 'itemDetail', params: { id: id } })
    }
  },
  layout: 'mainlayout'
}
</script>
