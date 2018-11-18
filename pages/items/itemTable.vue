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
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
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
    handleDelete: function(index, row) {
      console.log(index)
      console.log(row)
    }
  }
}
</script>
