<template>
  <el-row>
    <el-row
      v-for="item in items"
      :key="item._id"
      class="card"
      @click="toDetail(item._id)">
      <a
        :href="'/items/itemDetail?id='+item._id">
        <el-col :span="5">
          <img
            :src="item.filename"
            alt="">
        </el-col>
        <el-col
          :span="6"
          offset="1">
          <el-row><h1>{{ item.title }}</h1>
            <el-tag
              v-for="item in item.label"
              :key="item">{{ item }}</el-tag></el-row>
          <el-row/>
          <el-row>
            <span
              v-for="item in item.ingredients"
              :key="item.name">{{ item.name }}</span>
          </el-row>
          <el-row>{{ item.summary }}</el-row>

          <el-row><span>{{ item.create }}</span><span>{{ item.creator }}</span></el-row>
        </el-col>
      </a>
    </el-row>
  </el-row>
</template>
<style scoped>
.card {
  width: 100%;
}
.card img {
  width: 100%;
  height: 200px;
}
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['items'],
  data() {
    return {}
  },
  methods: {
    toDetail: function(id) {
      this.$router.push({ path: '/items/itemDetail', query: { id: id } })
    }
  }
}
</script>
