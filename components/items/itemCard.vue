<template>
  <el-row :gutter="8">
    <el-col
      v-for="item in items"
      :key="item._id"
      :span="12"
      class="card"
      @click="toDetail(item._id)">
      <el-col
        :span="12"
        style="overflow: hidden;">
        <a :href="'/items/itemDetail?id='+item._id">
          <img
            :src="item.filename"
            alt=""
            class="card-img">
        </a>
      </el-col>
      <el-col
        :span="12">
        <el-row>
          <a
            :href="'/items/itemDetail?id='+item._id"
            class="card-title">{{ item.title }}</a>
          <time class="time float-right ">{{ item.create }}</time>
          <el-row/>
          <el-row style="overflow:hidden">
            <el-tag
              v-for="item in item.label"
              :key="item">{{ item }}</el-tag>
          </el-row>
          <el-row class="summary">{{ item.summary }}</el-row>
          <el-row>
            <div class="clearfix">
              <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
              <span>{{ item.collectioncount }}</span>
              <a
                :href="'/users/mainPage?_id='+ item.creatorinfo._id"
                class="content-center float-right">
                <img
                  :src="item.creatorinfo.photo"
                  class="userinfo-photo"
                  alt="">
                <span>{{ item.creatorinfo.username }}</span>
              </a>
            </div>
          </el-row>
        </el-row>
      </el-col>
    </el-col>
  </el-row>
</template>
<style scoped>
.card {
  margin: 5px 0px;
}
.card-img {
  width: 100%;
  height: 150px;
}
.card-img:hover {
  opacity: 0.9;
}
.summary {
  color: #999;
  height: 40px;
  overflow: hidden;
}
.el-tag {
  background-color: #f79a29;
  margin: 0 2px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  border-color: #f79a29;
  box-sizing: border-box;
}
.userinfo-photo {
  margin: 0 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
}
.el-row {
  margin-top: 7px;
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['items'],
  data() {
    return {}
  },
  mounted() {
    console.log(JSON.stringify(this.items))
  },
  methods: {
    toDetail: function(id) {
      this.$router.push({ path: '/items/itemDetail', query: { id: id } })
    }
  }
}
</script>
