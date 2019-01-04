<template>
  <div class="content">
    <el-form
      ref="itemForm"
      :model="itemForm"
      :rules="itemFormRules"
      status-icon
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="标题"
        prop="title">
        <el-input v-model="itemForm.title"/>
      </el-form-item>
      <el-form-item
        label="封面"
        prop="filename">
        <el-upload
          :on-success="filenameUploadSuccess"
          :limit="1"
          :show-file-list="false"
          drag
          class="upload-demo"
          action="/utils/uploadFiles">
          <img
            v-if="itemForm.filename"
            :src="itemForm.filename"
            class="avatar-cover">
          <div
            v-else
            style="height:100%">
            <div>最佳尺寸是1280X1024</div>
          <div><a>点击上传</a></div></div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="简述"
        prop="summary">
        <el-input
          v-model="itemForm.summary"
          rows="5"
          type="textarea"/>
      </el-form-item>
      <el-form-item
        label="标签"
        prop="label">
        <el-select
          v-model="itemForm.label"
          multiple
          placeholder="请选择"
          style="width:100%">
          <el-option
            v-for="item in labels"
            :key="item._id"
            :label="item.labelname"
            :value="item.labelname"/>
        </el-select>
      </el-form-item>
      <el-form-item
        label="分类"
        prop="category">
        <el-select
          v-model="itemForm.category"
          style="width:100%"
          placeholder="请选择">
          <el-option
            v-for="item in categorys"
            :key="item._id"
            :label="item.categoryname"
            :value="item.categoryname"/>
        </el-select>
      </el-form-item>
      <div
        v-for="(ingredient,index) in itemForm.ingredients"
        :key="'ingredient'+index">
        <el-form-item
          label="配料">
          <el-form-item
            :prop="'ingredients.'+index+'.name'"
            :rules="ingredients.name"
            label="名称"
            class="float-left ingredient-text">
            <el-input v-model="ingredient.name"/>
          </el-form-item>
          <el-form-item
            :rules="ingredients.count"
            :prop="'ingredients.'+index+'.count'"
            label="用量"
            class="float-left ingredient-text">
            <el-input v-model="ingredient.count"/>
          </el-form-item>
          <el-button
            class="float-right"
            type="danger"
            @click="removeIngredients(index)">删除配料</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="addIngredients">添加配料</el-button>
      </el-form-item>
      <div
        v-for="(step,index) in itemForm.steps"
        :key="'step'+index">
        <el-form-item :label="'步骤' + (index+1)">
          <el-form-item
            :prop="'steps.'+ index + '.stepImg'"
            :rules="steps.stepImg"
            class="float-left">
            <el-upload
              v-model="step.stepImg"
              :file-list="fileList"
              :show-file-list="false"
              :on-success="(res,file)=>{return onFileSuccess(res,file,index)}"
              class="avatar-uploader"
              action="/utils/uploadFiles">
              <img
                v-if="step.stepImg"
                :src="step.stepImg"
                class="avatar">
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item
            :rules="steps.stepText"
            :prop="'steps.'+ index + '.stepText'"
            class="float-left step-text">
            <el-input
              v-model="step.stepText"
              :rows="8"
              type="textarea"/>
          </el-form-item>
          <el-button
            type="danger"
            class="float-right"
            @click="removeStep(index)">删除步骤</el-button>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          @click="addStep">添加步骤</el-button>
      </el-form-item>

      <el-form-item
        prop="tips"
        label="小贴士">
        <el-input
          v-model="itemForm.tips"
          rows="5"
          type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="createItem('itemForm')">发布</el-button>
        <el-button @click="createDraft($route.query._id)">保存草稿</el-button>
        <el-button
          v-if="$route.query._id"
          @click="deleteDraft($route.query._id)">删除草稿</el-button>
        <el-button @click="cancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.content {
  margin-top: 30px;
}
.avatar-uploader {
  float: left;
}
.avatar-uploader-cover {
  float: left;
  width: 10;
}
.upload-demo .el-upload {
  width: 100%;
}
.upload-demo .el-upload .el-upload-dragger {
  width: 100%;
  height: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon-cover {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 250px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-cover {
  width: 100%;
  height: 100%;
  display: block;
}
.step-text {
  width: 60%;
  float: left;
  margin: 0px 30px;
}
.ingredient-text {
  width: 40%;
}
</style>
<script>
export default {
  data() {
    return {
      labels: [],
      categorys: [],
      fileList: [],
      itemForm: {
        filename: '',
        steps: [{ stepImg: '', stepText: '' }],
        ingredients: [{ name: '', count: '' }]
      },
      itemFormRules: {
        title: [
          {
            type: 'string',
            required: true,
            message: '请输入标题',
            tigger: 'change'
          },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 200 个字符',
            trigger: 'change'
          }
        ],
        summary: [
          {
            type: 'string',
            required: true,
            message: '请输入简述',
            tigger: 'change'
          },
          {
            min: 1,
            max: 200,
            message: '长度在 1 到 200 个字符',
            trigger: 'change'
          }
        ],
        category: [
          {
            type: 'string',
            required: true,
            message: '请输入标题',
            tigger: 'change'
          }
        ],
        label: [
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请选择标签'))
              } else if (value.length >= 5) {
                callback(new Error('最多可以选择4个标签'))
              } else {
                callback()
              }
            }
          }
        ],
        tips: [
          {
            type: 'string',
            required: true,
            message: '请输入小贴士',
            tigger: 'change'
          },
          { max: 100, message: '最大长度为100个字符', trigger: 'change' }
        ],
        filename: [
          {
            required: true,
            message: '请上传图片'
          }
        ]
      },
      steps: {
        stepImg: [
          {
            required: true,
            message: '请上传步骤图片',
            tigger: 'change'
          }
        ],
        stepText: [
          {
            required: true,
            message: '请输入步骤描述',
            tigger: 'change'
          }
        ]
      },
      ingredients: {
        name: [
          {
            required: true,
            message: '请输入配料名称',
            tigger: 'change'
          }
        ],
        count: [
          {
            required: true,
            message: '请输入配料用量',
            tigger: 'change'
          }
        ]
      }
    }
  },
  async mounted() {
    const self = this
    this.$axios.get('/categorys/getCategoryList', self.itemForm).then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          self.categorys = resp.data.data
        } else {
        }
      } else {
        this.$message.error('服务器内部错误，错误码：' + resp.status)
      }
    })
    this.$axios.get('/labels/getlabelList', self.itemForm).then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.code === 0) {
          self.labels = resp.data.data
        } else {
        }
      } else {
        this.$message.error('服务器内部错误，错误码：' + resp.status)
      }
    })
    if (this.$route.query._id) {
      const _id = this.$route.query._id
      this.$axios
        .get('/drafts/getDraftById', {
          params: {
            _id
          }
        })
        .then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.itemForm = resp.data.data
            } else {
            }
          } else {
            this.$message.error('服务器内部错误，错误码：' + resp.status)
          }
        })
    }
  },
  methods: {
    onFileSuccess: function(res, file, index) {
      console.log(index)
      this.itemForm.steps[index].stepImg = '/' + file.response.file
    },
    filenameUploadSuccess: function(res, file) {
      this.itemForm.filename = '/' + file.response.file
    },
    createItem: function() {
      self = this
      let formPass
      let stepPass
      let ingredientPass
      self.$refs['itemForm'].validate(valid => {
        if (valid) {
          self.$axios.post('/items/addItem', self.itemForm).then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                self.$message({
                  message: '创建成功',
                  type: 'success'
                })
                self.$router.push('/itemList')
              } else {
                this.$message.error(resp.data.msg)
              }
            } else {
              this.$message.error('服务器内部错误，错误码：' + resp.status)
            }
          })
        }
      })
      console.log(this.itemForm)
    },
    addStep: function() {
      this.itemForm.steps.push({
        stepImg: '',
        stepText: ''
      })
    },
    removeStep: function(index) {
      if (this.itemForm.steps.length === 1) {
        this.$alert('请至少有一个步骤', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('确认删除此步骤吗？')
        .then(_ => {
          this.itemForm.steps.splice(index, 1)
        })
        .catch(_ => {})
    },
    addIngredients: function() {
      this.itemForm.ingredients.push({
        name: '',
        count: ''
      })
    },
    removeIngredients: function(index) {
      if (this.itemForm.ingredients.length === 1) {
        this.$alert('请至少有一个配料', '错误', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$confirm('确认删除此配料吗？')
        .then(_ => {
          this.itemForm.ingredients.splice(index, 1)
        })
        .catch(_ => {})
    },
    createDraft: function() {
      self = this
      if (self.itemForm._id) {
        self.$axios.post('/drafts/upDateDraft', self.itemForm).then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.$message({
                message: '创建成功',
                type: 'success'
              })
              self.$router.go(-1)
            } else {
              this.$message.error(resp.data.msg)
            }
          } else {
            this.$message.error('服务器内部错误，错误码：' + resp.status)
          }
        })
      } else {
        self.$axios.post('/drafts/addDraft', self.itemForm).then(resp => {
          if (resp.status === 200) {
            if (resp.data && resp.data.code === 0) {
              self.$message({
                message: '创建成功',
                type: 'success'
              })
              self.$router.go(-1)
            } else {
              this.$message.error(resp.data.msg)
            }
          } else {
            this.$message.error('服务器内部错误，错误码：' + resp.status)
          }
        })
      }

      console.log(this.itemForm)
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
            self.$router.go(-1)
          } else {
            self.$message.error(resp.data.msg)
          }
        } else {
          self.$message.error('服务器内部错误，错误码：' + resp.status)
        }
      })
    },
    cancel: function() {
      this.$router.go(-1)
    }
  }
}
</script>
