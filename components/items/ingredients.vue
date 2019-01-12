<template>
  <div class="">
    <el-row >
      <el-col
        :span="12"
        class="font-18">名称</el-col>
      <el-col
        :span="12"
        class="font-18">用量</el-col>
      <hr>
    </el-row>
    <el-row
      v-for="(ingredient,index) in ingredients"
      :key="'step'+index">
      <el-col
        :span="12"
        class="font-18">{{ ingredient.name }}</el-col>
      <el-col
        :span="12"
        class="font-18">{{ ingredient.count }}</el-col>
      <hr>
    </el-row>
  </div>
</template>
<style scoped>
hr {
  margin-top: 30px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
}
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
