/* eslint-disable vue/require-prop-types */
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(breadcrumb,index) in breadcrumbs"
        :key="'breadcrumb'+ index"
        :to="{ path: '/'+breadcrumb.path }">{{ breadcrumb.name }}</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['breadcrumbs']
}
</script>
