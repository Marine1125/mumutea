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
          type="primary"
          @click="login('loginForm')">登录</el-button>
        <el-button><router-link to="/users/signup">注册</router-link></el-button>
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
              username: window.encodeURIComponent(self.loginForm.username),
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
    }
  }
}
</script>
