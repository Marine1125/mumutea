<template>
  <div>
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
      myCollections: [],
      collectionPageOffset: 8
    }
  },
  async mounted() {
    const self = this
    await self.$axios
      .get('/collections/getCollectionList', {
        params: {
          userid: self.userinfo._id,
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
      })
  },
  methods: {
    getMoreCollections: async function() {
      const self = this
      await self.$axios
        .get('/collections/getCollectionList', {
          params: {
            userid: self.userinfo._id,
            offset: self.collectionPageOffset,
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
    }
  }
}
</script>
