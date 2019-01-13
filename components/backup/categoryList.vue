<template>
  <div class="content">
    <div style="margin-top: 20px">
      <el-button @click="addCategoryDialog = true">新增</el-button>
      <el-button @click="refresh()">刷新</el-button>
    </div>
    <el-table
      :data="tableData"
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
        align="center">
        <template
          slot="header"
          slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"/>
        </template>
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.active == '1'"
            size="mini"
            type="danger"
            @click="deactiveCategory(scope.$index, scope.row)">去激活</el-button>
          <el-button
            v-if="scope.row.active == '0'"
            size="mini"
            type="danger"
            @click="activeCategory(scope.$index, scope.row)">激活</el-button>
          <el-button
            v-if="scope.row.active == '0'"
            size="mini"
            type="danger"
            @click="deleteCategory(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
</style>
<script>
export default {
  data() {
    return {
      search: '',
      tableData: [],
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
  methods: {
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
    deactiveCategory: async function(index, row) {
      const self = this
      await self.$axios.post('/categorys/deactiveCategory', row).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.refresh()
          }
        }
      })
    },
    activeCategory: async function(index, row) {
      const self = this
      await self.$axios.post('/categorys/activeCategory', row).then(resp => {
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
