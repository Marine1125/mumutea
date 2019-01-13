<template>
  <div
    class="content"
    style="margin-top:30px!important">
    <el-col v-if="role == '0'">没有权限</el-col>
    <el-col v-else>
      <el-tabs
        type="card"
        tab-position="top">
        <el-tab-pane label="用户管理"><UserList/></el-tab-pane>
        <el-tab-pane label="分类管理"><CategoryList/></el-tab-pane>
        <el-tab-pane label="标签管理"><LabelList/></el-tab-pane>
        <el-tab-pane label="热门管理"><ItemHot/></el-tab-pane>
        <el-tab-pane label="作品审核"><ItemReview/></el-tab-pane>
      </el-tabs>
    </el-col>
  </div>
</template>
<style scoped>
</style>
<script>
import UserList from '@/components/backup/userList.vue'
import CategoryList from '@/components/backup/categoryList.vue'
import ItemReview from '@/components/backup/itemReview.vue'
import ItemHot from '@/components/backup/itemHot.vue'
import LabelList from '@/components/backup/labelList.vue'
export default {
  components: {
    CategoryList,
    ItemReview,
    ItemHot,
    LabelList,
    UserList
  },
  data() {
    return {
      role: '0'
    }
  },
  async mounted() {
    await this.$axios.get('/users/getLoginUser').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.data) {
          this.role = resp.data.data.role
        } else {
          this.$router.push({ path: '/users/signin' })
        }
      }
    })
  }
}
</script>
