<template>
  <div class="content">
    <el-form
      :inline="true"
      :model="queryForm"
      class="demo-form-inline">
      <el-form-item label="标题">
        <el-input v-model="queryForm.title"/>
      </el-form-item>
      <el-form-item label="分类">
        <el-select
          v-model="queryForm.category"
          placeholder="请选择">
          <el-option
            label="美食"
            value="美食"/>
          <el-option
            label="饮品"
            value="饮品"/>
          <el-option
            label="烘焙"
            value="烘焙"/>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="queryForm.creator"/>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select
          v-model="queryForm.status"
          placeholder="请选择">
          <el-option
            label="全部"
            value="1,0,-1"/>
          <el-option
            label="通过"
            value="1"/>
          <el-option
            label="审核中"
            value="0"/>
          <el-option
            label="不通过"
            value="-1"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="queryItem">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData.results"
      stripe
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        align="center">
        <template slot-scope="scope">
          <a
            :href="'/items/itemDetail?id='+scope.row._id"
            target="_blank">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
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
        :filters="[{ text: '通过', value: '1' }, { text: '不通过', value: '-1' }, { text: '审核中', value: '0' }]"
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
            @click="reviewItem(scope.$index, scope.row, '1')">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="showDialog(scope.$index, scope.row, '-1')">不通过</el-button>
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
      :visible.sync="addReviewDialog"
      title="提示"
      width="30%"
      center>
      <el-form
        ref="addReviewForm"
        :model="addReviewForm"
        :rules="reviewRules"
        label-width="80px">
        <el-form-item
          label="原因"
          prop="reason">
          <el-input v-model="addReviewForm.reason"/>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button @click="addReview()">提 交</el-button>
        <el-button
          type="primary"
          @click="addReviewDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      tableData: [],
      queryForm: {
        title: '',
        status: '1,0,-1',
        limit: 10,
        status: '',
        offset: 0
      },
      currentRow: '',
      addReviewDialog: false,
      addReviewForm: {},
      reviewRules: {
        reason: [
          {
            type: 'string',
            required: true,
            message: '请输入标题',
            tigger: 'change'
          }
        ]
      }
    }
  },
  mounted: async function() {
    const self = this
    self.getItemList().then(data => {
      self.tableData = data
    })
  },
  methods: {
    handleSizeChange(val) {
      this.queryForm.limit = val
      const self = this
      this.getItemList().then(data => {
        self.tableData = data
      })
    },
    handleCurrentChange(val) {
      this.queryForm.offset =
        (parseInt(val) - 1) * parseInt(this.queryForm.limit)
      const self = this
      this.getItemList().then(data => {
        self.tableData = data
      })
    },
    getItemList: async function() {
      const self = this

      let result = await this.$axios
        .get('/items/getItemList', { params: self.queryForm })
        .then(resp => resp.data)
      return result.code === 0 ? result.data : { count: 0, results: [] }
    },
    queryItem: function() {
      const self = this
      self.queryForm.offset = 0
      this.getItemList().then(data => {
        self.tableData = data
      })
    },
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
      let rowData = row
      rowData.status = status
      await self.$axios.post('/items/reviewItem', rowData).then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            if (resp.data.data.length) {
              //self.tableData = resp.data.data
            }
          }
        }
      })
    },
    showDialog: function(index, row, status) {
      this.addReviewDialog = true
      this.currentRow = row
      this.currentRow.status = status
    },
    addReview: async function() {
      const self = this
      await self.$axios
        .post('/reviews/addReview', {
          itemid: self.currentRow._id,
          result: self.currentRow.status,
          reason: self.addReviewForm.reason
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length) {
                //self.tableData = resp.data.data
              }
            }
          }
        })
      await self.$axios
        .post('/items/reviewItem', this.currentRow)
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              if (resp.data.data.length) {
                //self.tableData = resp.data.data
              }
            }
          }
        })
      this.addReviewDialog = false
    }
  }
}
</script>
