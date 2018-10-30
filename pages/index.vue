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
        v-for="(o,index) in 6"
        :span="3"
        :key="o"
        :offset="index==0 ? 3:0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="~/assets/images/hamburger.png"
            class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button">详细信息</el-button>
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
        v-for="(o,index) in 6"
        :span="3"
        :key="o"
        :offset="index==0 ? 3:0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="~/assets/images/hamburger.png"
            class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button">详细信息</el-button>
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
        v-for="(o,index) in 6"
        :span="3"
        :key="o"
        :offset="index==0 ? 3:0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="~/assets/images/hamburger.png"
            class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button">详细信息</el-button>
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
        v-for="(o,index) in 6"
        :span="3"
        :key="o"
        :offset="index==0 ? 3:0"
      >
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="~/assets/images/hamburger.png"
            class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button
                type="text"
                class="button">详细信息</el-button>
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
      currentDate: new Date()
    }
  },
  layout: 'mainlayout'
}
</script>
