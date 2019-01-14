<template>
  <div class="content">
    <el-form
      :inline="true"
      :model="queryForm"
      class="demo-form-inline">
      <el-form-item label="用户名">
        <el-input v-model="queryForm.username"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="queryForm.email"/>
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="queryForm.role"
          placeholder="请选择">
          <el-option
            label="管理员"
            value="1"/>
          <el-option
            label="普通用户"
            value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="queryUser">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.results"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        align="center"/>
      <el-table-column
        prop="email"
        label="邮箱"
        align="center"
        width="300"/>
      <el-table-column
        prop="create"
        label="创建时间"
        align="center"
        width="300"/>
      <el-table-column
        :filters="[{ text: '管理员', value: '1' }, { text: '普通用户', value: '0' }]"
        :filter-method="filterRole"
        :formatter="formatRole"
        prop="role"
        label="角色"
        align="center"
        width="200"/>
      <el-table-column
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.role == '0'"
            size="mini"
            type="success"
            @click="updateRole(scope.$index, scope.row, '1')">提升为管理员</el-button>
          <el-button
            v-else
            size="mini"
            type="danger"
            @click="updateRole(scope.$index, scope.row, '0')">删除管理员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="tableData.count"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="queryForm.limit"
      class="pagination float-right"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
  </div>
</template>
<style scoped>
.pagination {
  margin-top: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      tableData: {},
      queryForm: {
        username: '',
        email: '',
        role: '',
        limit: 10,
        offset: 0
      }
    }
  },
  mounted: async function() {
    const self = this
    this.getUserList().then(data => {
      self.tableData = data
    })
  },
  methods: {
    handleSizeChange(val) {
      this.queryForm.limit = val
      const self = this
      this.getUserList().then(data => {
        self.tableData = data
      })
    },
    handleCurrentChange(val) {
      this.queryForm.offset =
        (parseInt(val) - 1) * parseInt(this.queryForm.limit)
      const self = this
      this.getUserList().then(data => {
        self.tableData = data
      })
    },
    getUserList: async function() {
      const self = this
      let result = await this.$axios
        .get('/users/getUserList', { params: self.queryForm })
        .then(resp => resp.data)
      return result.code === 0 ? result.data : { count: 0, results: [] }
    },
    queryUser: function() {
      const self = this
      self.queryForm.offset = 0
      this.getUserList().then(data => {
        self.tableData = data
      })
    },
    formatRole: function(row, column) {
      if (row.role == '0') {
        return '普通用户'
      } else {
        return '管理员'
      }
    },
    filterRole: function(value, row) {
      return row.status === value
    },
    updateRole: async function(index, row, role) {
      const self = this
      this.$confirm('确定执行此操作吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          row.role = role
          await self.$axios.post('/users/updateRole', row).then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                if (resp.data.data.length) {
                  self.$message({
                    type: 'success',
                    message: '删除成功!'
                  })
                }
              }
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
