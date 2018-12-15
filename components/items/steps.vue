<template>
  <div class="">
    <el-row
      v-for="(step,index) in steps"
      :key="'step'+index">
      <el-col :span="6"><img
        :src="step.stepImg"
        alt=""></el-col>
      <el-col
        :span="17"
        offset="1"><div>{{ step.stepText }}</div></el-col>
    </el-row>
  </div>
</template>
<style scoped>
img {
  width: 100%;
  height: 300px;
}
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['steps'],
  data() {
    return {}
  }
}
</script>
