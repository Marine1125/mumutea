<template>
  <div>
    <el-row
      v-for="(step,index) in steps"
      :gutter="20"
      :key="'step'+index">
      <el-col :span="8"><img
        :src="step.stepImg"
        alt=""></el-col>
      <el-col
        :span="16" ><div class="font-18">{{ step.stepText }}</div></el-col>
    </el-row>
  </div>
</template>
<style scoped>
img {
  width: 100%;
  height: 200px;
}
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['steps']
}
</script>
