<template>
  <div>
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
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['userinfo'],
  data() {
    return {
      myItems: [],
      foodPageOffset: 8
    }
  },
  async mounted() {
    let self = this
    console.error(this.$store.state.user.loginUser)
    await self.$axios
      .get('/items/getItemsByCreator', {
        params: {
          creator: self.userinfo._id,
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
  },
  methods: {
    toEdit: function(id) {
      this.$router.push({ path: '/items/itemUpdate', query: { _id: id } })
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
            creator: self.userinfo._id,
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
    }
  }
}
</script>
