<template>
  <div>
    <footer class="footer">
      <div class="container">
        <div class="footer-main">
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
          <a
            href="https://github.com/ElementUI/theme-chalk-preview"
            target="_blank"
            class="footer-main-link">在线主题生成</a>
          <a
            href="https://github.com/elemefe/element-react"
            target="_blank"
            class="footer-main-link">Element-React</a>
          <a
            href="https://github.com/ElemeFE/element-angular"
            target="_blank"
            class="footer-main-link">Element-Angular</a>
        </div>
        <div class="footer-main">
          <h4>社区</h4><a
            href="https://gitter.im/ElemeFE/element"
            target="_blank"
            class="footer-main-link">在线讨论</a>
          <a
            href="https://github.com/ElemeFE/element/issues"
            target="_blank"
            class="footer-main-link">反馈建议</a>
          <a
            href="https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md"
            target="_blank"
            class="footer-main-link">贡献指南</a>
          <a
            href="https://segmentfault.com/t/element-ui"
            target="_blank"
            class="footer-main-link">SegmentFault</a>
          <a
            href="https://github.com/ElementUI/awesome-element"
            target="_blank"
            class="footer-main-link">Awesome Element</a>
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
    </footer>
  </div>
</template>
<style scoped>
.footer {
  background-color: #f7fbfd;
  width: 100%;
  padding: 40px 150px;
  box-sizing: border-box;
  height: 340px;
}
.footer .container {
  box-sizing: border-box;
  width: auto;
}
.footer .footer-main {
  display: inline-block;
  vertical-align: top;
  margin-right: 110px;
}
.footer .footer-social {
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
.footer .footer-main .footer-main-link {
  display: block;
  margin: 0;
  line-height: 2;
  font-size: 14px;
  color: #666;
}
</style>
