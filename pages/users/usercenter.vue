<template>
  <div class="content">
    <el-row style="margin-top:20px">
      <el-col :span="4">
        <img
          v-if="userInfo.photo"
          :src="userInfo.photo"
          class="photo"
          alt="">
        <img
          v-else
          class="photo"
          src="~/assets/images/no-photo.jpg"
          alt="">
      </el-col>

      <el-col
        :span="20"
        class="center-content">
        <el-row>
          <h1 class="page-title float-left">{{ userInfo.username }}</h1>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <a
            :href="'/users/userUpdate?_id='+ userInfo._id"
            style="line-height: 3">编辑资料</a>
        </el-row>
        <el-row class="center-content">
          <span>性别：</span><span v-if="userInfo.sex">{{ userInfo.sex }}</span><span v-else>暂无</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>出生年月：</span><span v-if="userInfo.birthday">{{ userInfo.birthday }}</span><span v-else>暂无</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>星座：</span><span v-if="userInfo.constellation">{{ userInfo.constellation }}</span><span v-else>暂无</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
        </el-row>
        <el-row class="center-content">
          <span>关注：{{ userInfo.follows }}人</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>粉丝：{{ userInfo.fans }}人</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
        </el-row>
        <el-row class="center-content">
          <p>{{ userInfo.introduce }}</p>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="tab-content">
      <el-tabs
        v-model="category"
        type="card"
        @tab-click="handleClick">
        <el-tab-pane
          label="我的厨房"
          name="厨房"><myItems :userinfo="userInfo"/></el-tab-pane>
        <el-tab-pane
          label="我的粉丝"
          name="粉丝"><myFans :userinfo="userInfo"/></el-tab-pane>
        <el-tab-pane
          label="我的关注"
          name="关注"><myFollows :userinfo="userInfo"/></el-tab-pane>
        <el-tab-pane
          label="我的收藏"
          name="收藏"><myCollections :userinfo="userInfo"/></el-tab-pane>
        <el-tab-pane
          label="我的草稿"
          name="草稿"><myDrafts :userinfo="userInfo"/></el-tab-pane>
        <el-tab-pane
          label="我的审核"
          name="审核"><myReview :userinfo="userInfo"/></el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<style scope>
.person-card {
  margin-bottom: 10px;
}

.fans-photo {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.button:hover {
  background-color: #ce4114;
  color: white;
}
.page-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 20px;
  width: 100%;
}
.card-title {
  font-size: 20px;
  font-weight: 1000;
}
.bottom {
  margin-top: 15px;
  line-height: 14px;
}
.add-text {
  line-height: 2;
  color: #ce4114;
}
.upload-content {
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-add {
  margin-top: 50px;
  width: 100px;
  height: 100px;
}
.image {
  height: 200px;
  width: 100%;
  display: block;
}

.tab-content {
  margin-top: 30px;
}
.photo {
  width: 200px;
  height: 200px;
  border-radius: 100px;
}
.page-title {
  font-size: 34px;
  margin: 0 0 16px;
  line-height: 1.2;
  font-weight: 700;
  word-break: break-all;
}
a {
  color: #ce4114;
}
a:focus,
a:hover {
  color: #f79a29;
}
</style>
<script>
import myCollections from '@/components/users/userCenter/myCollections.vue'
import myFans from '@/components/users/userCenter/myFans.vue'
import myFollows from '@/components/users/userCenter/myFollows.vue'
import myItems from '@/components/users/userCenter/myItems.vue'
import myDrafts from '@/components/users/userCenter/myDrafts.vue'
import myReview from '@/components/users/userCenter/myReview.vue'
export default {
  components: {
    myCollections,
    myFans,
    myFollows,
    myItems,
    myDrafts,
    myReview
  },
  async asyncData(ctx) {
    let userInfo = ''
    await ctx.$axios.get('/users/getLoginUser').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          userInfo = resp.data.data
        } else {
          //console.log(ctx.app.router.VueRouter.push('/users/signin'))
          ctx.redirect('/users/signin?from=/users/userCenter')
          //ctx.app.router.VueRouter.push('/users/signin')
        }
      } else {
        userInfo = ''
        ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
      }
    })
    return { userInfo, category: '厨房' }
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event)
    }
  }
}
</script>
