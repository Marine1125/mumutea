<template>
  <div class="content">
    <el-form
      ref="updateForm"
      :model="updateForm"
      :rules="updateFormRule"
      label-width="80px">
      <el-form-item label="邮箱">
        <el-input
          :disabled="true"
          v-model="updateForm.email"/>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input
          :disabled="true"
          v-model="updateForm.username"/>
      </el-form-item>
      <el-form-item
        label="头像"
        prop="photo">
        <el-upload
          :on-success="filenameUploadSuccess"
          :show-file-list="false"
          class="avatar-uploader"
          action="/utils/uploadFiles">
          <img
            v-if="updateForm.photo"
            :src="updateForm.photo"
            class="avatar">
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="所在地">
        <el-select
          v-model="updateForm.province"
          prop="province"
          placeholder="请选择省份">
          <el-option
            label="区域一"
            value="shanghai"/>
          <el-option
            label="区域二"
            value="beijing"/>
        </el-select>
        <el-select
          v-model="updateForm.city"
          prop="city"
          placeholder="请选择城市">
          <el-option
            label="区域一"
            value="shanghai"/>
          <el-option
            label="区域二"
            value="beijing"/>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="birthday"
        label="生日">
        <el-col :span="11">
          <el-date-picker
            v-model="updateForm.birthday"
            type="date"
            placeholder="选择日期"
            style="width: 100%;"/>
        </el-col>
      </el-form-item>
      <el-form-item
        label="星座"
        prop="constellation">
        <el-select
          v-model="updateForm.constellation"
          placeholder="请选择">
          <el-option
            label="金牛座"
            value="金牛座"/>
          <el-option
            label="天蝎座"
            value="天蝎座"/>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="sex"
        label="性别">
        <el-radio-group v-model="updateForm.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        prop="introduce"
        label="描述">
        <el-input
          v-model="updateForm.introduce"
          type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updateUser">更新</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
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
</style>

<script>
export default {
  data() {
    return {
      updateForm: {},
      updateFormRule: {
        photo: [{ required: true, message: '请上传头像' }],
        province: [{ required: true, message: '请输入省份' }],
        city: [{ required: true, message: '请上输入城市' }],
        birthday: [{ required: true, message: '请输入生日' }],
        constellation: [{ required: true, message: '请输入星座' }],
        sex: [{ required: true, message: '请输入性别' }],
        introduce: [{ required: true, message: '请输介绍' }]
      }
    }
  },
  async mounted() {
    const _id = this.$route.query._id
    const self = this
    await self.$axios
      .get('/users/getUserById', {
        params: {
          _id: _id
        }
      })
      .then(resp => {
        if (resp.status === 200) {
          if (resp.data && resp.data.code === 0) {
            self.updateForm = resp.data.data
          } else {
            self.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
          }
        } else {
          self.$message.error(`服务器内部错误，错误码：${resp.status}`)
        }
      })
  },
  methods: {
    updateUser: async function() {
      const self = this
      self.$refs['updateForm'].validate(async valid => {
        await self.$axios
          .post('/users/userUpdate', self.updateForm)
          .then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                self.updateForm = resp.data.data
                self.$router.push({
                  path: '/users/userCenter?_id=' + self.$route.query._id
                })
              } else {
                self.$message.error(`获取数据失败，错误码：${resp.data.msg}`)
              }
            } else {
              self.$message.error(`服务器内部错误，错误码：${resp.status}`)
            }
          })
      })
    },
    filenameUploadSuccess: function(res, file) {
      this.updateForm.photo = '/' + file.response.file
    },
    cancel: function() {
      this.$router.push({
        path: '/users/userCenter?_id=' + this.$route.query._id
      })
    }
  }
}
</script>
