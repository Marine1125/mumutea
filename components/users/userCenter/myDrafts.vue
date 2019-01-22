<template>
  <div>
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
        @click="getMoreDrafts">获取更多内容<i class="el-icon-arrow-down"/></button>
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
      myDrafts: [],
      draftPageOffset: 8
    }
  },
  async mounted() {
    const self = this
    await self.$axios
      .get('/drafts/getDraftList', {
        params: {
          userid: self.userinfo._id,
          offset: 0,
          limit: 8
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.myDrafts = resp.data.data.results
          } else {
            ctx.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          ctx.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
  },
  methods: {
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
    },
    getMoreDrafts: async function() {
      const self = this
      await self.$axios
        .get('/drafts/getDraftList', {
          params: {
            userid: self.userinfo._id,
            offset: self.draftPageOffset,
            limit: 8
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.count === 0) {
                self.$message.error('没有更多内容啦！！！')
              } else {
                self.myDrafts = self.myDrafts.concat(resp.data.data.results)
                self.draftPageOffset = self.draftPageOffset + 8
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
