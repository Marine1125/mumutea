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
          <span>关注：111人</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <span>粉丝：111人</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <el-button
            size="small"
            class="center-content"
            type="danger"
            @click="addFollow(itemDetail.creator)">关注</el-button>
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
          name="我的厨房">
          <el-row :gutter="20">
            <el-col
              v-for="(cookData,index) in myItems"
              :span="6"
              :key="'cook'+ index">
              <el-card :body-style="{ padding: '0px' }">
                <img
                  :src="cookData.filename"
                  class="image">
                <div style="padding: 14px;">
                  <span>{{ cookData.title }}</span>
                  <div class="bottom clearfix">
                    <time class="time">{{ cookData.create }}</time>
                    <el-button
                      type="text"
                      class="button"
                      @click="getDetails(cookData._id)">详细信息</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card
                :body-style="{ padding: '0px' }"
                class="upload-content">
                <a href="/items/uploadItems">
                  <div class="image">
                    <img
                      class="image-add"
                      src="~/assets/images/add.jpg"
                      alt="">
                  </div>
                  <div style="padding: 14px;" >
                    <span class="add-text">创建美食</span>
                  </div>
                </a>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="我的粉丝"
          name="我的粉丝">我的粉丝</el-tab-pane>
        <el-tab-pane
          label="我的收藏"
          name="我的收藏">我的收藏</el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<style>
.add-text {
  line-height: 3;
  font-size: 20px;
}
.upload-content {
  transition: All 0.4s ease-in-out;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-add {
  margin-top: 50px;
  width: 100px;
  height: 100px;
}
.upload-content:hover {
  transform: scale(1.1);
}
.image {
  height: 200px;
  width: 100%;
  display: block;
}
.el-tabs__item:hover {
  color: #ce4114;
  cursor: pointer;
}
.el-tabs__item.is-active {
  color: white;
  background-color: #ce4114;
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
</style>
<script>
export default {
  data() {
    return {
      category: '我的厨房',
      userInfo: '',
      myItems: []
    }
  },
  async mounted() {
    const _id = this.$route.query._id
    const self = this
    await self.$axios
      .get('/users/getUserById', {
        params: {
          _id: _id
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.userInfo = resp.data.data
          } else {
            self.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          self.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
    await self.$axios
      .get('/items/getItemsByCreator', {
        params: {
          creator: self.userInfo.username
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.myItems = resp.data.data
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
  },
  methods: {
    getDetails: function(id) {
      this.$router.push({ path: '/items/itemDetail', query: { id: id } })
    },
    handleClick(tab, event) {
      //console.log(tab, event)
    },
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
