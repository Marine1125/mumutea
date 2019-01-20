<template>
  <div class="content">
    <Crumbs :breadcrumbs="breadcrumbs"/>
    <el-row :gutter="40">
      <el-col :span="18">
        <span class="page-title">{{ itemDetail.title }}</span>
        <el-tag
          v-for="item in itemDetail.label"
          :key="item">{{ item }}</el-tag>
        <hr >
        <div class="img-content">
          <img
            :src="itemDetail.filename"
            alt="">
        </div>
        <div class="rate-content">
          <div class="float-right">
            <span style="margin-right:10px;">{{ itemDetail.collectioncount }}人收藏</span>
            <el-button
              type="danger"
              @click="addCollection(itemDetail._id)">加入收藏</el-button>
          </div>
          <div style="clear:both"/>
        </div>
        <h1>简述</h1><hr>
        <div class="font-18">{{ itemDetail.summary }}</div>
        <h1>用料</h1><hr>
        <Ingredients :ingredients="itemDetail.ingredients"/>
        <h1>步骤</h1><hr>
        <Steps :steps="itemDetail.steps"/>
        <h1>小贴士</h1><hr>
        <div class="font-18">{{ itemDetail.tips }}</div>
      </el-col>
      <el-col :span="6">
        作者信息<hr>
        <div class="side-content">
          <el-row class="center-content">
            <img
              v-if="userInfo.photo"
              :src="userInfo.photo"
              class="photo">
            <img
              v-else
              src="~/assets/images/no-photo.jpg"
              class="photo">
          </el-row>
          <el-row class="center-content">{{ userInfo.username }}</el-row>
          <el-row class="center-content"><span>关注：{{ userInfo.follows }}人</span><span>&nbsp;&nbsp;&nbsp;</span><span>粉丝：{{ userInfo.fans }}人</span></el-row>
          <el-row class="center-content">
            <el-button
              v-if="!isFollow"
              round
              size="small"
              class="center-content"
              type="danger"
              @click="addFollow(userInfo._id)">关注</el-button>
            <el-button
              v-else
              round
              size="small"
              class="center-content"
              type="danger"
              @click="deleteFollow(userInfo._id)">取消关注</el-button>
            <el-button
              round
              size="small"
              class="center-content"
              type="danger"
              @click="toMainPage(userInfo._id)">主页</el-button>
          </el-row>
        </div>
        {{ userInfo.username }}的其他作品<hr>
        <div class="side-content">
          <el-row
            v-for="item in creatorItems"
            :key="item.id"
            :gutter="10">
            <el-col :span = "10">
              <a :href="'/items/itemDetail?id='+item._id">
                <img
                  :src="item.filename"
                  class="creator-img"
                  alt="">
              </a>
            </el-col>
            <el-col :span="14">
              <el-row><a :href="'/items/itemDetail?id='+item._id">{{ item.title }}</a></el-row>
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
  margin-bottom: 10px;
}
.side-img {
  width: 50%;
  height: 50%;
}
.creator-img {
  width: 120px;
  height: 90px;
}
.el-tag {
  background-color: #f79a29;
  margin: 10px 4px;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  color: white;
  border-radius: 4px;
  border-color: #f79a29;
  box-sizing: border-box;
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
a {
  color: #ce4114;
}
a:focus,
a:hover {
  color: #f79a29;
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
    let userInfo = ''
    let isFollow = false
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
              path: '/items/itemList?category=' + resp.data.data.category
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
      .get('/users/getUserById', {
        params: {
          _id: creator
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            userInfo = resp.data.data
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })

    await ctx.$axios.get('/users/getLoginUser').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          ctx.$axios
            .get('/fans/isFollow', {
              params: {
                userid: userInfo._id
              }
            })
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data && resp.data.code === 0) {
                  if (resp.data.data) {
                    isFollow = true
                  }
                } else {
                  //ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
                }
              } else {
                //ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
              }
            })
        }
      } else {
        self.$message.error('服务器内部错误，错误码：' + resp.status)
      }
    })

    await ctx.$axios
      .get('/items/getItemsByCreator', {
        params: {
          creator: creator,
          offset: 0,
          limit: 5
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
    return {
      itemDetail,
      breadcrumbs,
      creatorItems,
      userInfo,
      isFollow
    }
  },
  methods: {
    addCollection: async function(itemid) {
      const self = this
      let isLogin = ''
      await self.$axios.get('/users/getLoginUser').then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            isLogin = true
          } else {
            isLogin = false
          }
        } else {
          self.$message.error('服务器内部错误，错误码：' + resp.status)
        }
      })
      if (isLogin) {
        self.$axios
          .post('/collections/addCollection', { itemid })
          .then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                self.$message({
                  message: '成功收藏',
                  type: 'success'
                })
                self.isFollow = true
              } else {
                self.$message.error(resp.data.msg)
              }
            } else {
              self.$message.error('服务器内部错误，错误码：' + resp.status)
            }
          })
      } else {
        self.$router.push({ path: '/users/signin' })
      }
    },
    addFollow: async function(userid) {
      const self = this
      let isLogin = ''
      await self.$axios.get('/users/getLoginUser').then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            isLogin = true
          } else {
            isLogin = false
          }
        } else {
          self.$message.error('服务器内部错误，错误码：' + resp.status)
        }
      })
      if (isLogin) {
        await self.$axios.post('/fans/addFollow', { userid }).then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.$message({
                message: '关注成功',
                type: 'success'
              })
              self.isFollow = true
            } else {
              self.$message.error(resp.data.msg)
            }
          } else {
            self.$message.error('服务器内部错误，错误码：' + resp.status)
          }
        })
      } else {
        self.$router.push({ path: '/users/signin' })
      }
    },
    deleteFollow: function(userid) {
      const self = this
      self.$axios.post('/fans/deleteFollow', { userid }).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.$message({
              message: '取消关注成功',
              type: 'success'
            })
            self.isFollow = false
          } else {
            self.$message.error(resp.data.msg)
          }
        } else {
          self.$message.error('服务器内部错误，错误码：' + resp.status)
        }
      })
    },
    toMainPage: function(userid) {
      this.$router.push({
        path: '/users/mainpage',
        query: { _id: userid }
      })
    }
  }
}
</script>
