<template>
  <div style="background-color:#f1f1f1">
    <el-header class="header">
      <div class="logo-content">
        <a href="/">
          <img
            class="logolink"
            src="~/static/logo2.png"
            alt="">
          <img
            class="logo-img"
            src="~/assets/images/logo.png"
            alt="">
        </a>
      </div>
      <div
        v-if="userInfo"
        class="header-right">
        <a
          href="/exit"
          class="floatright content-center"
          style="height: 40px;">登出</a>
        <a
          href="/users/userCenter"
          trigger="click"
          class="floatright content-center">
          <img
            v-if="userInfo.photo"
            :src="userInfo.photo"
            class="user-photo"
            alt="">
          <img
            v-else
            src="~/assets/images/no-photo.jpg"
            class="user-photo"
            alt="">
          <span class="">你好！{{ userInfo.username }}</span>
        </a>

      </div>
      <div
        v-else
        class="header-right">
        <a
          href="/users/signup"
          class="floatright content-center"
          style="height: 40px;">注册</a>
        <a
          href="/users/signin"
          class="floatright content-center"
          style="height: 40px;">立即登录</a>

      </div>
      <div class="line"/>
    </el-header>
  </div>
</template>
<style scoped>
a {
  color: #ce4114;
}
a:focus,
a:hover {
  color: #f79a29;
}
.header {
  width: 1400px;
  min-width: 500px;
  margin: 0 auto;
  background-color: #f1f1f1;
}

.header-right a {
  margin: 10px;
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
.logo-content {
  float: left;
}
.logolink {
  margin: 10px;
  width: 40px;
  height: 40px;
}
.logo-img {
  margin: 10px;
  width: 120px;
  height: 40px;
}
.user-photo {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin: 0 5px;
}
</style>
<script>
export default {
  data() {
    return {
      userInfo: ''
    }
  },
  async mounted() {
    await this.$axios.get('/users/getLoginUser').then(resp => {
      if (resp.status === 200) {
        if (resp.data && resp.data.data) {
          this.userInfo = resp.data.data
        } else {
          this.userInfo = ''
        }
      }
    })
  }
}
</script>
