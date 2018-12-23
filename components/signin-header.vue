<template>
  <div>
    <el-header class="header">
      <div class="logo-content">
        <a href="/">
          <img
            class="logolink"
            src="~/static/logo2.png"
            alt="">
          <div class="logotext">木木家</div>
        </a>
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
</style>
