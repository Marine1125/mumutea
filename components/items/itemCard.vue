<template>
  <el-row>
    <el-row
      v-for="item in items"
      :key="item._id"
      class="card">
      <el-col :span="6">
        <img
          :src="item.filename"
          alt="">
      </el-col>
      <el-col :span="6">
        <el-row>{{ item.title }}</el-row>
        <el-row>{{ item.create }}</el-row>
      </el-col>
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
  }
}
</script>
