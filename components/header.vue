<template>
  <div>
    <el-header class="header">
      <div class="logolink">
        <a href="/">
          <img
            src="~/static/logo2.png"
            alt="">
          <div class="logotext">木木家</div>
        </a>
      </div>
      <div
        v-if="username"
        class="header-right">
        <a
          href="/exit"
          class="floatright">登出</a>
        <a
          href="/usercenter"
          class="floatright">你好：{{ username }}！</a>

      </div>
      <div
        v-else
        class="header-right">
        <a
          href="/signup"
          class="floatright">注册</a>
        <a
          href="/signin"
          class="floatright">立即登录</a>

      </div>
      <div class="line"/>
    </el-header>
  </div>
</template>
<style scoped>
.header {
  padding: 0 15%;
  background-color: #f1f1f1;
}
.header-right a {
  margin: 20px;
}
.floatright {
  float: right;
}
.el-button {
  margin: 10px;
}
img {
  width: 117px;
  height: 40px;
}
.logolink {
  margin: 10px;
  width: 170px;
  height: 40px;
  float: left;
}
.logotext {
  margin: 10px 0;
  font-size: 15px;
  color: black;
  float: right;
}
</style>
<script>
export default {
  data() {
    return {
      username: ''
    }
  },
  async mounted() {
    console.log('mounted')
    await this.$axios.get('/users/getLoginUser').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.user) {
          this.username = resp.data.user
        } else {
          this.username = ''
        }
      }
    })
  },
  updated() {
    console.group('updated 更新完成状态===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  }
}
</script>
