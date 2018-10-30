<template>
  <div class="content">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="昵称"
        prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email">
        <el-input v-model="ruleForm.email"/>
      </el-form-item>
      <el-form-item>
        <el-button @click="sendCode">发送验证码</el-button>
        <span class = "status">{{ statusMsg }}</span>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="vcode">
        <el-input v-model="ruleForm.vcode"/>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"/>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="cpassword">
        <el-input
          v-model="ruleForm.cpassword"
          type="password"/>
      </el-form-item>
      <el-form-item
        label=""
        prop="clause">
        <el-checkbox v-model="ruleForm.clause"/>
        <a href="/terms">我阅读并同意条款</a>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.content {
  margin-top: 30px;
  padding: 0 60% 0 15%;
}
</style>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      statusMsg: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'change'
          },
          {
            validator: async (rule, value, callback) => {
              let username = await this.$axios
                .get('/users/getUsers', { params: { username: value } })
                .then(resp => {
                  if (resp.status === 200) {
                    if (resp.data && resp.data.code === 0) {
                      if (value === resp.data.username) {
                        callback(new Error('用户名已存在'))
                      } else {
                        callback()
                      }
                    } else {
                      this.error = resp.data.msg
                    }
                  } else {
                    console.log('error')
                  }
                })
            }
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'change'
          }
        ],
        vcode: [
          {
            required: true,
            type: 'string',
            message: '请输入验证码',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        ],
        cpassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value == '') {
                callback(new Error('请输入确认密码'))
              } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入的密码不一致，请重新输入'))
              } else {
                callback()
              }
            }
          }
        ],
        clause: [
          {
            type: 'string',
            required: 'true',
            message: '请阅读并同意条款',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    submitForm: function() {
      let self = this
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          self.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(self.ruleForm.name),
              password: CryptoJS.MD5(self.ruleForm.password).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.vcode
            })
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data && resp.data.code === 0) {
                  self.$router.push('/signin')
                } else {
                  self.error = data.msg
                }
              } else {
                self.error = `服务器错误，错误码${status}`
              }
              setTimeout(function() {
                self.error = ''
              }, 1500)
            })
        }
      })
    },
    sendCode: function() {
      let self = this
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        self.$axios
          .post('/users/verify', {
            username: window.encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(resp => {
            if (resp.status === 200) {
              if (resp.data && resp.data.code === 0) {
                let count = 60
                self.statusMsg = `验证码已发送，剩余${count--}秒`
                self.timerid = setInterval(function() {
                  self.statusMsg = `验证码已发送，剩余${count--}秒`
                  if (count === 0) {
                    clearInterval(self.timerid)
                    self.statusMsg = ''
                  }
                }, 1000)
              }
            } else {
              self.statusMsg = data.msg
            }
          })
      }
    },
    resetForm: function() {
      this.ruleForm = {}
    }
  }
}
</script>
