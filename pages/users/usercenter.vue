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
          name="厨房">
          <el-row :gutter="20">
            <el-col
              v-for="(cookData,index) in myItems"
              :span="6"
              :key="'cook'+ index">
              <el-card :body-style="{ padding: '0px' }">
                <a :href="'/items/itemDetail?id='+cookData._id">
                  <img
                    :src="cookData.filename"
                    class="image">
                </a>
                <div style="padding: 14px;">
                  <a :href="'/items/itemDetail?id='+cookData._id">{{ cookData.title }}</a>
                  <time class="time float-right ">{{ cookData.create }}</time>
                  <div class="bottom clearfix">
                    <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
                    <span>{{ cookData.collectioncount }}</span>
                    <a
                      href="javascript:;"
                      class="float-right"
                      @click="removeItem(cookData._id)">删除</a>
                    <a
                      href="javascript:;"
                      class="float-right"
                      style="margin-right:10px"
                      @click="toEdit(cookData._id)">编辑</a>

                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col
              :span="6"
              style="margin-bottom:10px">
              <el-card
                :body-style="{ padding: '0px' }"
                class="upload-content">
                <a href="/items/itemCreate">
                  <div class="image">
                    <img
                      class="image-add"
                      src="~/assets/images/add.jpg"
                      alt="">
                  </div>
                  <div style="padding: 14px;" >
                    <div class="bottom clearfix">
                      <span class="add-text font-18">创建美食</span>
                    </div>
                  </div>
                </a>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <button
              round
              class="button page-button"
              @click="getMoreItems">获取更多内容<i class="el-icon-arrow-down"/></button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="我的粉丝"
          name="粉丝">
          <el-row :gutter="20">
            <el-col
              v-for="(fans,index) in myFans"
              :span="6"
              :key="index"
              class="person-card">
              <el-row :gutter="30">
                <el-col :span="8">
                  <img
                    :src="fans.photo"
                    class="fans-photo"
                    alt="">
                </el-col>
                <el-col :span="16">
                  <el-row>
                    <a
                      :href="'/users/mainPage?_id='+ fans._id"
                      class="font-18">{{ fans.username }}</a>
                  </el-row>
                  <el-row>
                    <span>{{ fans.sex }}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{{ fans.constellation }}</span>
                  </el-row>
                  <el-row>生日：{{ fans.birthday }}</el-row>
                  <el-row style="height:19px;overflow:hidden;">{{ fans.introduce }}</el-row>
                  <el-row>粉丝：{{ fans.fanscount }}&nbsp;&nbsp;&nbsp;关注：{{ fans.followscount }}</el-row>
                </el-col>

              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <button
              round
              class="button page-button"
              @click="getMoreFans">获取更多内容<i class="el-icon-arrow-down"/></button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="我的关注"
          name="关注">
          <el-row :gutter="20">
            <el-col
              v-for="(follow,index) in myFollows"
              :span="6"
              :key="index">
              <el-row :gutter="30">
                <el-col :span="8">
                  <img
                    :src="follow.photo"
                    class="fans-photo"
                    alt="">
                </el-col>
                <el-col :span="16">
                  <a
                    :href="'/users/mainPage?_id='+ follow._id"
                    class="font-18">{{ follow.username }}</a>
                  <el-row>
                    <span>{{ follow.sex }}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{{ follow.constellation }}</span>
                  </el-row>
                  <el-row>生日：{{ follow.birthday }}</el-row>
                  <el-row style="height:19px;overflow:hidden;">{{ follow.introduce }}</el-row>
                  <el-row>粉丝：{{ follow.fanscount }}&nbsp;&nbsp;&nbsp;关注：{{ follow.followscount }}</el-row>
                </el-col>

              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <button
              round
              class="button page-button"
              @click="getMoreFollows">获取更多内容<i class="el-icon-arrow-down"/></button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="我的收藏"
          name="收藏">
          <el-row :gutter="20">
            <el-col
              v-for="(collection,index) in myCollections"
              :span="6"
              :key="'cook'+ index">
              <el-card :body-style="{ padding: '0px' }">
                <a :href="'/items/itemDetail?id='+collection._id">
                  <img
                    :src="collection.filename"
                    class="image">
                </a>
                <div style="padding: 14px;">
                  <a :href="'/items/itemDetail?id='+collection._id">{{ collection.title }}</a>
                  <time class="time float-right ">{{ collection.create }}</time>
                  <div class="bottom clearfix">
                    <i class="mumuteaiconfont font-18 color-red">&#xe67b;</i>
                    <span>{{ collection.collectioncount }}</span>
                    <a
                      href="javascript:;"
                      class="float-right"
                      @click="deleteCollection(collection._id)">取消收藏</a>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <button
              round
              class="button page-button"
              @click="getMoreCollections">获取更多内容<i class="el-icon-arrow-down"/></button>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="我的草稿"
          name="草稿">
          <el-row :gutter="20">
            <el-col
              v-for="(draft,index) in myDrafts"
              :span="6"
              :key="'cook'+ index">
              <el-card :body-style="{ padding: '0px' }">
                <a :href="'/items/itemCreate?_id=' +draft._id">
                  <img
                    v-if="draft.filename"
                    :src="draft.filename"
                    class="image"
                    alt="~/asset/images/np-imgae.png">
                  <img
                    v-else
                    class="image"
                    src="~/assets/images/no-image.png">
                </a>
                <div style="padding: 14px;">
                  <span class="card-title">{{ draft.title?draft.title:'未命名' }}</span>
                  <div class="bottom clearfix">
                    <a
                      class="float-right"
                      style="margin:5px"
                      href="javascript:;"
                      @click="deleteDraft(draft._id)">删除</a>
                    <a
                      style="margin:5px"
                      class="float-right"
                      href="javascript:;"
                      @click="editDraft(draft._id)">编辑</a>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <button
              round
              class="button page-button"
              @click="getMoreCollections">获取更多内容<i class="el-icon-arrow-down"/></button>
          </el-row>
        </el-tab-pane>
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
export default {
  data() {
    return {
      category: '厨房',
      userInfo: '',
      myItems: [],
      myFans: [],
      myFollows: [],
      myCollections: [],
      myDrafts: [],
      foodPageOffset: 8,
      fansPageOffset: 8,
      followPageOffset: 8,
      collectionPageOffset: 8,
      draftPageOffset: 8
    }
  },
  async mounted() {
    const _id = this.$route.query._id
    const self = this
    await self.$axios
      .get('/users/getLoginUser', {
        params: {
          _id: _id
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.userInfo = resp.data.data
          } else {
            self.$router.push({ path: '/users/signin' })
          }
        } else {
          self.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
    await self.$axios
      .get('/items/getItemsByCreator', {
        params: {
          creator: self.userInfo._id,
          offset: 0,
          limit: 7
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
    await self.$axios
      .get('/fans/getFansList', {
        params: {
          userid: self.userInfo._id,
          offset: 0,
          limit: 7
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.myFans = resp.data.data
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      }),
      await self.$axios
        .get('/fans/getFollowList', {
          params: {
            userid: self.userInfo._id,
            offset: 0,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.myFollows = resp.data.data
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        }),
      await self.$axios
        .get('/collections/getCollectionList', {
          params: {
            userid: self.userInfo._id,
            offset: 0,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.myCollections = resp.data.data
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        }),
      await self.$axios
        .get('/drafts/getDraftList', {
          params: {
            userid: self.userInfo._id,
            offset: 0,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.myDrafts = resp.data.data
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        })
  },
  methods: {
    toEdit: function(id) {
      this.$router.push({ path: '/items/itemUpdate', query: { _id: id } })
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
    removeItem: async function(_id) {
      this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const self = this
          self.$axios.post('/items/removeItem', { _id }).then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                self.$message({
                  message: '删除成功',
                  type: 'success'
                })
              } else {
                self.$message.error(resp.data.msg)
              }
            } else {
              self.$message.error('服务器内部错误，错误码：' + resp.status)
            }
          })
        })
        .catch(() => {})
    },
    getMoreItems: async function() {
      const self = this
      await self.$axios
        .get('/items/getItemsByCreator', {
          params: {
            creator: self.userInfo._id,
            offset: self.foodPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myItems = self.myItems.concat(resp.data.data)
                self.foodPageOffset = self.foodPageOffset + 8
              }
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        })
    },
    getMoreFans: async function() {
      const self = this
      await self.$axios
        .get('/fans/getFansList', {
          params: {
            userid: self.userInfo._id,
            offset: self.fansPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myFans = self.myFans.concat(resp.data.data)
                self.fansPageOffset = self.fansPageOffset + 8
              }
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        })
    },
    getMoreFollows: async function() {
      const self = this
      await self.$axios
        .get('/fans/getFollowList', {
          params: {
            userid: self.userInfo._id,
            offset: self.followPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myFollows = self.myFollows.concat(resp.data.data)
                self.followsPageOffset = self.followsPageOffset + 8
              }
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        })
    },
    getMoreCollections: async function() {
      const self = this
      await self.$axios
        .get('/collections/getCollectionList', {
          params: {
            userid: self.userInfo._id,
            offset: self.followPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myCollections = self.myCollections.concat(resp.data.data)
                self.collectionPageOffset = self.collectionPageOffset + 8
              }
            } else {
              ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
            }
          } else {
            ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
          }
        })
    },
    deleteCollection: async function(itemid) {
      const self = this
      self.$axios
        .post('/collections/deleteCollection', { itemid })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.$message({
                message: '取消收藏成功',
                type: 'success'
              })
            } else {
              self.$message.error(resp.data.msg)
            }
          } else {
            self.$message.error('服务器内部错误，错误码：' + resp.status)
          }
        })
    },
    editDraft: function(draftid) {
      this.$router.push({
        path: '/items/itemCreate',
        query: { _id: draftid }
      })
    },
    deleteDraft: function(draftid) {
      const self = this
      self.$axios.post('/drafts/deleteDraft', { _id: draftid }).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            self.$message.error(resp.data.msg)
          }
        } else {
          self.$message.error('服务器内部错误，错误码：' + resp.status)
        }
      })
    }
  }
}
</script>
