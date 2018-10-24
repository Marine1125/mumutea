<template>
  <div>
    <el-header class="header">
      <div class="logolink">
        <a href="/">
          <img
            src="~/static/logo2.png"
            alt="">
          <div class="logotext">木木茶</div>
        </a>
      </div>
      <a
        href="/signin"
        class="floatright"><el-button>登录</el-button></a>
      <a
        href="/signup"
        class="floatright"><el-button>注册</el-button></a>
      <div class="line"/>
    </el-header>
  </div>
</template>
<style scoped>
.header {
  padding: 0 15%;
  background-color: #f1f1f1;
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
  font-size: 15px;
  color: black;
  margin: 10px 0;
  float: right;
}
</style>
<script>
export default {}
</script>
