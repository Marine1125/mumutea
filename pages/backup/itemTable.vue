<template>
  <div class="content">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180"/>
      <el-table-column
        prop="category"
        label="分类"
        width="180"/>
      <el-table-column
        prop="creator"
        label="作者"
        width="180"/>
      <el-table-column
        prop="create"
        label="创建日期"/>
      <el-table-column
        align="right">
        <template
          slot="header"
          slot-scope="slot">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.ishot == '0'"
            size="mini"
            type="success"
            @click="addHot(scope.$index, scope.row)">添加热门</el-button>
          <el-button
            v-if="scope.row.ishot == '1'"
            size="mini"
            type="danger"
            @click="deleteHot(scope.$index, scope.row)">删除热门</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
.content {
  margin-top: 30px;
  padding: 0 20% 0 20%;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted: async function() {
    const self = this
    await self.$axios.get('/items/getItems').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          if (resp.data.data.length) {
            self.tableData = resp.data.data
          }
        }
      }
    })
  },
  methods: {
    addHot: async function(index, row) {
      const self = this
      await self.$axios.post('/hots/addHot', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            if (resp.data.data.length) {
              self.tableData = resp.data.data
            }
          }
        }
      })
    },
    deleteHot: async function(index, row) {
      const self = this
      await self.$axios.post('/hots/deleteHot', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            if (resp.data.data.length) {
              self.tableData = resp.data.data
            }
          }
        }
      })
    }
  }
}
</script>
