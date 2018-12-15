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
        <el-dropdown
          trigger="click"
          class="floatright">
          <span class="el-dropdown-link">
            你好！{{ username }}<i class="el-icon-arrow-down el-icon--right"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><a href="/items/uploadItems">添加Item</a></el-dropdown-item>
            <el-dropdown-item><a href="/users/usercenter">用户中心</a></el-dropdown-item>
            <el-dropdown-item divided><a href="/backup/categoryList">分类管理</a></el-dropdown-item>
            <el-dropdown-item><a href="/backup/LabelList">标签管理</a></el-dropdown-item>
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
.el-dropdown {
  float: right;
  margin: 20px;
  color: #409eff;
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
  }
}
</script>
