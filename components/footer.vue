<template>
  <div style="background-color:#f1f1f1;">
    <footer class="footer">
      <div class="container">
        <div class="float-left">
          <h4>链接</h4>
          <a
            href="https://github.com/ElemeFE/element"
            target="_blank"
            class="footer-main-link">代码仓库</a>
          <a
            href="https://github.com/ElemeFE/element/releases"
            target="_blank"
            class="footer-main-link">更新日志</a>
          <a
            href="https://github.com/ElemeFE/element/blob/dev/FAQ.md"
            target="_blank"
            class="footer-main-link">常见问题</a>
          <a
            href="https://github.com/ElementUI/element-starter"
            target="_blank"
            class="footer-main-link">脚手架</a>
          <a
            href="https://github.com/ElementUI/element-theme"
            target="_blank"
            class="footer-main-link">自定义主题工具</a>
        </div>
        <div class="footer-social"><p class="footer-social-title">mumutea Fullerene</p><span/>
          <a
            href="https://weibo.com/u/3225095052"
            target="_blank"><i class="mumuteaiconfont mumuteaicon-weibo"/>
          </a>
          <a
            href="https://github.com/Marine1125/mumutea"
            target="_blank"><i class="mumuteaiconfont mumuteaicon-github"/>
          </a>
          <span>
            <el-popover
              placement="bottom"
              width="265"
              trigger="hover"
            >
              <div style="color:red;">
                <img
                  src="~/assets/images/hamburger.png"
                  alt="">
              </div>
              <div style="text-align:center">扫一扫</div>
              <a slot="reference"><i class="mumuteaiconfont mumuteaicon-weixin"/></a>
            </el-popover>
          </span>
        </div>
      </div>
      <div style="clear:both"/>
      <div style="text-align:center">copyright:www.mumufamily.cn</div>
    </footer>
  </div>
</template>
<style scoped>
.footer {
  width: 1400px;
  height: 220px;
  min-width: 500px;
  margin: 10px auto 10px;
  background-color: #f1f1f1;
}
.footer .footer-social {
  margin-top: 100px;
  float: right;
  text-align: center;
}
.footer .footer-social .mumuteaiconfont {
  transition: 0.3s;
  display: inline-block;
  line-height: 32px;
  text-align: center;
  color: #c8d6e8;
  background-color: transparent;
  width: 32px;
  height: 32px;
  font-size: 32px;
  vertical-align: middle;
  margin-right: 20px;
}
.footer .footer-main h4 {
  font-size: 18px;
  color: #333;
  line-height: 1;
  margin: 0 0 15px;
}
.footer .footer-main-link {
  display: block;
  margin: 0;
  line-height: 2;
  font-size: 14px;
  color: #666;
}
</style>
