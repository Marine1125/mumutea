<template>
  <div class="content">
    <el-form
      :inline="true"
      :model="queryForm"
      class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="queryForm.categoryname"/>
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="queryForm.active"
          placeholder="请选择">
          <el-option
            label="激活"
            value="1"/>
          <el-option
            label="去激活"
            value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="queryCategory">查询</el-button>
        <el-button @click="addCategoryDialog = true">新增</el-button>
        <el-button @click="refresh()">刷新</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.results"
      stripe
      style="width: 100%">
      <el-table-column
        prop="categoryname"
        label="标题"
        align="center"/>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
        width="150"/>
      <el-table-column
        prop="create"
        width="300"
        align="center"
        label="创建日期"/>
      <el-table-column
        prop="update"
        width="300"
        align="center"
        label="最后更新"/>
      <el-table-column
        prop="active"
        label="状态"
        align="center"
        width="180"/>
      <el-table-column
        width="180"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.active == '1'"
            size="mini"
            type="danger"
            @click="updateCategory(scope.$index, scope.row,'0')">去激活</el-button>
          <el-button
            v-if="scope.row.active == '0'"
            size="mini"
            type="danger"
            @click="updateCategory(scope.$index, scope.row,'1')">激活</el-button>
          <el-button
            v-if="scope.row.active == '0'"
            size="mini"
            type="danger"
            @click="deleteCategory(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog
      :visible.sync="addCategoryDialog"
      title="提示"
      width="30%"
      center>
      <el-form
        ref="addCategoryForm"
        :model="addCategoryForm"
        :rules="categoryRules"
        label-width="80px">
        <el-form-item
          label="分类名称"
          prop="categoryname">
          <el-input v-model="addCategoryForm.categoryname"/>
        </el-form-item>
        <el-form-item
          label="排序"
          prop="sort">
          <el-input
            v-model.number="addCategoryForm.sort"/>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="addCategory()">添 加</el-button>
        <el-button
          type="primary"
          @click="addCategoryDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
.content {
  margin-top: 30px;
}
.pagination {
  margin-top: 20px;
}
</style>
<script>
export default {
  data() {
    return {
      search: '',
      tableData: {},
      queryForm: {
        categoryname: '',
        active: '',
        limit: 10,
        offset: 0
      },
      addCategoryDialog: false,
      addCategoryForm: {},
      categoryRules: {
        categoryname: [
          {
            type: 'string',
            required: true,
            message: '请输入标题',
            tigger: 'change'
          }
        ],
        sort: [
          {
            required: true,
            message: '请输入排序序号'
          },
          {
            type: 'number',
            message: '只能输入数字',
            tigger: 'change'
          }
        ]
      }
    }
  },
  mounted: async function() {
    const self = this
    self.getCategoryList().then(data => {
      self.tableData = data
    })
  },
  methods: {
    handleSizeChange(val) {
      this.queryForm.limit = val
      const self = this
      this.getCategoryList().then(data => {
        self.tableData = data
      })
    },
    handleCurrentChange(val) {
      this.queryForm.offset =
        (parseInt(val) - 1) * parseInt(this.queryForm.limit)
      const self = this
      this.getCategoryList().then(data => {
        self.tableData = data
      })
    },
    getCategoryList: async function() {
      const self = this
      let result = await self.$axios
        .get('/categorys/getCategoryList', { params: self.queryForm })
        .then(resp => resp.data)
      return result.code === 0 ? result.data : { count: 0, results: [] }
    },
    queryCategory: function() {
      const self = this
      self.queryForm.offset = 0
      this.getCategoryList().then(data => {
        self.tableData = data
      })
    },
    deleteCategory: async function(index, row) {
      const self = this
      await self.$axios.post('/categorys/deleteCategory', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.refresh()
          }
        }
      })
    },
    updateCategory: async function(index, row, active) {
      const self = this
      row.active = active
      await self.$axios.post('/categorys/updateCategory', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.refresh()
          }
        }
      })
    },
    refresh: async function() {
      const self = this
      await self.$axios.get('/categorys/getCategoryList').then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            if (resp.data.data.length) {
              self.tableData = resp.data.data
            }
          }
        }
      })
    },
    addCategory: function() {
      let self = this
      self.$refs['addCategoryForm'].validate(valid => {
        if (valid) {
          self.$axios
            .post('/categorys/addCategory', self.addCategoryForm)
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data && resp.data.code === 0) {
                  self.$message({
                    message: '创建成功',
                    type: 'success'
                  })
                  self.addCategoryDialog = false
                  self.refresh()
                } else {
                  this.$message.error(resp.data.msg)
                }
              } else {
                this.$message.error('服务器内部错误，错误码：' + resp.status)
              }
            })
        }
      })
    }
  }
}
</script>
