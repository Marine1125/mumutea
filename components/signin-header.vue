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
