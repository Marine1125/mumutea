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
        label="上传图片"
        prop="filename">
        <el-upload
          :on-success="filenameUploadSuccess"
          :limit="1"
          :file-list="fileList"
          class="upload-demo"
          action="/items/upload"
          multiple>
          <el-button
            size="small"
            type="primary">点击上传</el-button>
          <div
            slot="tip"
            class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item
        label="分类"
        prop="category">
        <el-select
          v-model="itemForm.category"
          placeholder="请选择">
          <el-option
            label="菜品"
            value="dish"/>
          <el-option
            label="饮品"
            value="drink"/>
          <el-option
            label="烘焙"
            value="bake"/>
          <el-option
            label="手工"
            value="handwork"/>
        </el-select>
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
              action="/items/upload">
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
          @click="createItem('itemForm')">提交</el-button>
        <el-button @click="resetForm('itemForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.content {
  margin-top: 30px;
  padding: 0 40% 0 15%;
}
.avatar-uploader {
  float: left;
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
.avatar {
  width: 178px;
  height: 178px;
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
    }
  }
}
</script>
