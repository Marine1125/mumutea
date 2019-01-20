<template>
  <el-row :gutter="20">
    <el-col
      :span="4"
      class="rainbow">
      <el-row class="item-category">
        <img
          class="logo-img"
          src="~/assets/images/logo.png"
          alt=""></el-row>
      <hr>
      <el-row class="item-category">
        <img
          class="img-content"
          src="~/assets/images/dish.png"
          alt="">
        <el-button
          type="text"
          @click="gouToMore('美食')">美食</el-button>
      </el-row>
      <el-row class="item-category">
        <img
          class="img-content"
          src="~/assets/images/drink.png"
          alt="">
        <el-button
          type="text"
          @click="gouToMore('饮品')"><span>饮品</span></el-button>
      </el-row>
      <el-row class="item-category">
        <img
          class="img-content"
          src="~/assets/images/bake.png"
          alt="">
        <el-button
          type="text"
          @click="gouToMore('烘焙')">烘焙</el-button>
      </el-row>
    </el-col>
    <el-col
      :span="16">
      <el-carousel height="500px">
        <el-carousel-item
          v-for="item in $store.state.item.hotItemList"
          :key="item._id">
          <a :href="'/items/itemDetail?id='+ item._id">
            <img
              :src="item.filename"
              alt=""
              @click="goToDetail(item._id)">
          <h3>{{ item.title }}</h3></a>
        </el-carousel-item>
      </el-carousel>
    </el-col>
    <el-col
      :span="4">
      <EatWhat/>
    </el-col>
  </el-row>
</template>
<style scoped>
.img-content {
  width: 90px;
  height: 90px;
}
.item-category {
  height: 22%;
  text-align: center;
  font-size: 30px;
  padding: 13px;
  display: flex;
  align-items: center;
  align-content: center;
  color: #e2c5a7;
}
.el-carousel__item img {
  width: 100%;
  height: 500px;
}
.el-carousel__item h3 {
  font-size: 30px;
  padding-left: 30px;
  margin-top: -150px;
  text-align: left;
  color: white;
}
.item-category .el-button {
  margin-left: 10px;
  color: #e2c5a7;
  font-size: 25px;
}
.rainbow {
  height: 500px;
  background-color: #ce4114;
}
.el-button {
  color: white !important;
}
.logo-img {
  margin: 25px;
  height: 50px;
  width: 130px;
}
</style>
<script>
import EatWhat from '@/components/index/eatWhat.vue'
export default {
  components: {
    EatWhat
  },
  methods: {
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
