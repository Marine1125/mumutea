<template>
  <div class="content">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        align="center"/>
      <el-table-column
        prop="category"
        label="分类"
        align="center"
        width="150"/>
      <el-table-column
        prop="creator"
        label="作者"
        align="center"
        width="200"/>
      <el-table-column
        prop="create"
        label="创建日期"
        align="center"
        width="300"/>
      <el-table-column
        :filters="[{ text: '审核通过', value: '1' }, { text: '审核不通过', value: '-1' }, { text: '审核中', value: '0' }]"
        :filter-method="filterStatus"
        :formatter="formatStatus"
        prop="status"
        label="状态"
        align="center"
        width="150"/>
      <el-table-column
        label="审核"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == '0' || scope.row.status == '-1'"
            size="mini"
            type="success"
            @click="reviewItem(scope.$index, scope.row, '1')">审核通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="reviewItem(scope.$index, scope.row, '-1')">审核不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped>
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
    await self.$axios.get('/items/getAllItems').then(resp => {
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
    formatStatus: function(row, column) {
      if (row.status == '-1') {
        return '审核失败'
      } else if (row.status == '1') {
        return '审核通过'
      } else {
        return '审核中'
      }
    },
    filterStatus: function(value, row) {
      return row.status === value
    },
    reviewItem: async function(index, row, status) {
      const self = this
      row.status = status
      await self.$axios.post('/items/reviewItem', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            if (resp.data.data.length) {
              //self.tableData = resp.data.data
            }
          }
        }
      })
    }
  }
}
</script>
