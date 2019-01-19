<template>
  <div>
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
      myFans: [],
      fansPageOffset: 8
    }
  },
  async mounted() {
    const self = this
    await self.$axios
      .get('/fans/getFansList', {
        params: {
          userid: self.userinfo._id,
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
      })
  },
  methods: {
    getMoreFans: async function() {
      const self = this
      await self.$axios
        .get('/fans/getFansList', {
          params: {
            userid: self.userinfo._id,
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
    }
  }
}
</script>
