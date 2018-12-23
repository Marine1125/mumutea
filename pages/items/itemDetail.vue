<template>
  <div class="content">
    <Crumbs :breadcrumbs="breadcrumbs"/>
    <el-row :gutter="40">
      <el-col :span="18">
        <h1 class="page-title">{{ itemDetail.title }}</h1>
        <div>
          <el-tag
            v-for="item in itemDetail.label"
            :key="item">{{ item }}</el-tag>
        </div>
        <hr >
        <div class="img-content">
          <img
            :src="itemDetail.filename"
            alt="">
        </div>
        <div class="rate-content">
          <div class="float-left rate">
            <el-rate
              v-model="rate"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"/>
          </div>
          <div class="float-right">
            <span>123人收藏</span>
            <el-button
              type="danger"
              @click="addCollection(itemDetail._id)">加入收藏</el-button>
          </div>
          <div style="clear:both"/>
        </div>
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
      </el-col>
      <el-col :span="6">
        作者信息<hr>
        <div class="side-content">
          <el-row class="center-content">
            <img
              class="photo"
              src="~/assets/images/no-photo.jpg"
              alt="">
          </el-row>
          <el-row class="center-content">{{ itemDetail.creator }}</el-row>
          <el-row class="center-content"><span>关注：111人</span><span>&nbsp;&nbsp;&nbsp;</span><span>粉丝：111人</span></el-row>
          <el-row class="center-content">
            <el-button
              size="small"
              class="center-content"
              type="danger"
              @click="addFollow(itemDetail.creator)">关注</el-button>
            <el-button
              size="small"
              class="center-content"
              type="danger"
              @click="addFollow(itemDetail.creator)">主页</el-button>
          </el-row>
        </div>
        其他作品<hr>
        <div class="side-content">
          <el-row
            v-for="item in creatorItems"
            :key="item.id"
            :gutter="10">
            <el-col :span = "10">
              <img
                :src="item.filename"
                alt="">
            </el-col>
            <el-col :span="14">
              <el-row>{{ item.title }}</el-row>
              <el-row>{{ item.create }}</el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
.content {
  margin-top: 10px;
  margin-bottom: 30px;
}
.side-content .el-row {
  margin-bottom: 20px;
}
.side-img {
  width: 50%;
  height: 50%;
}
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.img-content {
  height: 600px;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
}
.rate-content {
  margin: 20px 0px;
}
img {
  width: 100%;
  height: 100%;
}
.el-tag {
  margin-right: 10px;
}
.page-title {
  font-size: 34px;
  margin: 0 0 16px;
  line-height: 1.2;
  font-weight: 700;
  word-break: break-all;
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
  async asyncData(ctx) {
    let creator = ''
    let _id = ctx.query.id
    let itemDetail = ''
    let creatorItems = []
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
            creator = resp.data.data.creator
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
    await ctx.$axios
      .get('/items/getItemsByCreator', {
        params: {
          creator: creator
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            creatorItems = resp.data.data
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
    return { itemDetail, breadcrumbs, creatorItems, rate: 4.7 }
  },
  methods: {
    addCollection: function(id) {
      this.$message({
        message: '成功收藏' + id,
        type: 'success'
      })
    },
    addFollow: function(creator) {
      this.$message({
        message: '关注成功' + creator,
        type: 'success'
      })
    }
  }
}
</script>
