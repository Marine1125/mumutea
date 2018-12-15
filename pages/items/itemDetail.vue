<template>
  <div class="content">
    <Crumbs :breadcrumbs="breadcrumbs"/>
    <h1>{{ itemDetail.title }}</h1>
    <div>
      <el-tag
        v-for="item in itemDetail.label"
        :key="item">{{ item }}</el-tag>
    </div>
    <hr >
    <img
      :src="itemDetail.filename"
      alt="">
    <h1>
      简述
    </h1>
    <hr >
    <div>{{ itemDetail.summary }}</div>
    <h1>
      用料
    </h1>
    <hr >

    <Ingredients :ingredients="itemDetail.ingredients"/>
    <h1>
      步骤
    </h1>
    <hr >
    <Steps :steps="itemDetail.steps"/>
    <h1>
      小贴士
    </h1>
    <hr >
    <div>{{ itemDetail.tips }}</div>
  </div>
</template>
<style scoped>
.content {
  margin-top: 10px;
  margin-bottom: 30px;
}
img {
  width: 100%;
  height: 500px;
}
h1 {
  color: #409eff;
}
.el-tag {
  margin-right: 10px;
}
</style>
<script>
import Steps from '@/components/items/steps.vue'
import Ingredients from '@/components/items/ingredients.vue'
import Crumbs from '@/components/items/crumb.vue'

export default {
  components: {
    Steps,
    Ingredients,
    Crumbs
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
  },
  async asyncData(ctx) {
    let _id = ctx.query.id
    let itemDetail = ''
    let breadcrumbs = []
    await ctx.$axios
      .get('/items/getItemDetail', {
        params: {
          _id: _id
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            itemDetail = resp.data.data
            breadcrumbs.push({
              name: resp.data.data.category,
              path: '/items/' + resp.data.data.category
            })
            breadcrumbs.push({
              name: resp.data.data.title,
              path: '#'
            })
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })

    return { itemDetail, breadcrumbs }
  }
}
</script>
