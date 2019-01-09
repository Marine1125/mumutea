<template>
  <div style="background-color:#f1f1f1">
    <el-header class="header">
      <div class="logo-content">
        <a href="/">
          <img
            class="logolink"
            src="~/static/logo2.png"
            alt="">
          <div class="logotext">木木<span class="color-red">家</span></div>
        </a>
      </div>
      <div
        v-if="userInfo"
        class="header-right">
        <a
          href="/exit"
          class="floatright">登出</a>
        <el-dropdown
          trigger="click"
          class="floatright">
          <span class="el-dropdown-link color-red">
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
            <span>你好！{{ userInfo.username }}</span>
            <i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a :href="'/users/userCenter?_id='+userInfo._id">用户中心</a></el-dropdown-item>
            <el-dropdown-item divided><a href="/backup/categoryList">分类管理</a></el-dropdown-item>
            <el-dropdown-item><a href="/backup/LabelList">标签管理</a></el-dropdown-item>
            <el-dropdown-item><a href="/backup/itemTable">热门管理</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
      <div
        v-else
        class="header-right">
        <a
          href="/users/signup"
          class="floatright">注册</a>
        <a
          href="/users/signin"
          class="floatright">立即登录</a>

      </div>
      <div class="line"/>
    </el-header>
  </div>
</template>
<style scoped>
.header {
  width: 1400px;
  min-width: 500px;
  margin: 0 auto;
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
.logo-content {
  float: left;
}
.logolink {
  margin: 10px;
  width: 40px;
  height: 40px;
}
.logotext {
  margin: 10px 0;
  font-size: 30px;
  color: black;
  float: right;
}
.el-dropdown {
  float: right;
  margin: 10px;
  color: #409eff;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  align-content: center;
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
