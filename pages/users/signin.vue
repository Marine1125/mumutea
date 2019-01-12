<template>
  <div class="content">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      status-icon
      label-width="100px"
      class="demo-loginForm">
      <el-form-item
        label="用户名"
        prop="username">
        <el-input v-model="loginForm.username"/>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"/>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="login('loginForm')">登录</el-button>
        <el-button @click="toSignin">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.demo-loginForm {
  width: 60%;
  margin-top: 30px;
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
      loginForm: {},
      loginRules: {
        username: [
          {
            type: 'string',
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    login: function() {
      let self = this
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$axios
            .post('/users/signin', {
              username: self.loginForm.username,
              password: CryptoJS.MD5(self.loginForm.password).toString()
            })
            .then(resp => {
              console.log(resp)
              if (resp.status == 200) {
                if (resp.data && resp.data.code === 0) {
                  self.$router.push('/')
                } else {
                  self.error = data.msg
                }
              } else {
                self.error = `服务器错误，错误码${status}`
              }
            })
        }
      })
    },
    toSignin: function() {
      this.$router.push({
        path: '/users/signup'
      })
    }
  }
}
</script>
