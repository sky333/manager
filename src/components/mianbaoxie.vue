<template>
   <div>
   <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
    </el-breadcrumb>
   </div>
</template>
<script>
   export default {
       props:['second','third']
   }
</script>
<style>
.el-breadcrumb.my_breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
</style>