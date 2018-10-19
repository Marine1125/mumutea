<template>
  <div>
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item
          v-for="item in 4"
          :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="40">
      <el-col
        v-for="(o,index) in 4"
        :span="4"
        :key="o"
        :offset="index==0 ? 4:0"
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
                class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  layout: 'mainlayout' // you can set a custom layout for the error page
}
</script>

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
