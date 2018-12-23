<template>
  <div >
    <el-col
      :span="4"
      style=""
      class="rainbow">
      <el-row class="item-category">木木家</el-row>
      <hr>
      <el-row class="item-category">
        <el-button
          type="text"
          @click="gouToMore('美食')">美食</el-button>
      </el-row>
      <el-row class="item-category">
        <el-button
          type="text"
          @click="gouToMore('饮品')">饮品</el-button>
      </el-row>
      <el-row class="item-category"><el-button
        type="text"
        @click="gouToMore('烘焙')">烘焙</el-button>
      </el-row>
      <el-row class="item-category">
        <el-button
          type="text"
          @click="gouToMore('手工')">手工</el-button>
      </el-row>
    </el-col>
    <el-col
      :span="19"
      :offset="1">
      <el-carousel height="450px">
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
  </div>
</template>
<style scoped>
.item-category {
  padding: 13px;
  height: 15%;
}
.el-carousel__item img {
  width: 100%;
  height: 450px;
}
.el-carousel__item h3 {
  font-size: 30px;
  padding-left: 30px;
  margin-top: -150px;
  text-align: left;
  color: white;
}
.item-category .el-button {
  color: white;
}
.rainbow {
  background-color: #ce4114;
}
</style>
<script>
export default {
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
