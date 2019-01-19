<template>
  <div class="content">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      status-icon
      label-position="right"
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
        <el-button
          class="button"
          @click="sendCode">发送验证码</el-button>
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
        prop="clause"/>
      <el-form-item>
        <el-button
          class="button"
          @click="submitForm('ruleForm')">同意用户协议并注册</el-button>
        <a
          target="_blank"
          class="terms"
          href="/terms">《木木家用户协议》</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.demo-ruleForm {
  width: 60%;
  margin-top: 30px;
}
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #ce4114;
  border-color: #ce4114;
}
.terms {
  margin-left: 20px;
  color: #ce4114;
  text-decoration: underline;
}
.el-button:focus,
.el-button:hover {
  color: white;
  background-color: #ce4114;
}
</style>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'signinlayout',
  data() {
    return {
      statusMsg: '',
      timerid: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          },
          {
            validator: async (rule, value, callback) => {
              let username = await this.$axios
                .get('/users/getUserByName', { params: { username: value } })
                .then(resp => {
                  if (resp.status === 200) {
                    if (resp.data && resp.data.code === 0) {
                      if (resp.data.data) {
                        callback(new Error('用户名已被注册'))
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
            },
            trigger: 'change'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'blur'
          },
          {
            validator: async (rule, value, callback) => {
              let username = await this.$axios
                .get('/users/getUserByEmail', { params: { email: value } })
                .then(resp => {
                  if (resp.status === 200) {
                    if (resp.data && resp.data.code === 0) {
                      if (resp.data.data) {
                        callback(new Error('邮箱已被注册'))
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
            },
            trigger: 'blur'
          }
        ],
        vcode: [
          {
            required: true,
            type: 'string',
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        cpassword: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
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
              username: self.ruleForm.name,
              password: CryptoJS.MD5(self.ruleForm.password).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.vcode
            })
            .then(resp => {
              if (resp.status === 200) {
                if (resp.data && resp.data.code === 0) {
                  self.$message({
                    message: '恭喜您，注册成功！',
                    type: 'success'
                  })
                  setTimeout(function() {
                    self.$router.push('/users/signin?from=/')
                  }, 3000)
                } else {
                  self.$message.error(resp.data.msg)
                }
              } else {
                self.$message.error(`服务器开小差啦！错误码${status}`)
              }
            })
        }
      })
    },
    sendCode: async function() {
      let self = this
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      await this.$refs['ruleForm'].validateField('name', valid1 => {
        if (valid1) {
          return false
        } else {
          this.$refs['ruleForm'].validateField('email', valid2 => {
            if (valid2) {
              return false
            } else {
              self.statusMsg = ''
              self.$axios
                .post('/users/verify', {
                  username: self.ruleForm.name,
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
                          self.timerid = ''
                          self.statusMsg = ''
                        }
                      }, 1000)
                    }
                  } else {
                    self.statusMsg = data.msg
                  }
                })
            }
          })
        }
      })
    }
  }
}
</script>
