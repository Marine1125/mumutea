<template>
  <div class="content">
    <div style="height: 300px;">
      <el-steps
        :active="1"
        direction="vertical">
        <el-step title="步骤 1">123</el-step>
        <el-step title="步骤 2">456</el-step>
        <el-step
          title="步骤 3"
          description="这是一段很长很长很长的描述性文字">789</el-step>
      </el-steps>
    </div>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      detail: {}
    }
  },
  async mounted() {
    const self = this
    const _id = this.$route.params.id
    await this.$axios
      .get('/items/getItemDetail', {
        params: { _id: _id }
      })
      .then(resp => {
        if (resp.status === 2000) {
          if (resp.data && resp.data.code === 0) {
            self.detail = resp.data.data
          }
        }
      })
  }
}
</script>
