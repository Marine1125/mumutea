<template>
  <div>
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
      myFollows: [],
      followPageOffset: 8
    }
  },
  async mounted() {
    const self = this
    await self.$axios
      .get('/fans/getFollowList', {
        params: {
          userid: self.userinfo._id,
          offset: 0,
          limit: 8
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.myFollows = resp.data.data.results
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
  },
  methods: {
    getMoreFollows: async function() {
      const self = this
      await self.$axios
        .get('/fans/getFollowList', {
          params: {
            userid: self.userinfo._id,
            offset: self.followPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.count === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myFollows = self.myFollows.concat(resp.data.data.results)
                self.followsPageOffset = self.followsPageOffset + 8
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
