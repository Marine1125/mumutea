<template>
  <div class="">
    <el-row>
      <el-col :span="12">名称</el-col>
      <el-col :span="12">用量</el-col>
      <hr>
    </el-row>
    <el-row
      v-for="(ingredient,index) in ingredients"
      :key="'step'+index">
      <el-col :span="12">{{ ingredient.name }}</el-col>
      <el-col :span="12">{{ ingredient.count }}</el-col>
      <hr>
    </el-row>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['ingredients'],
  data() {
    return {}
  }
}
</script>
