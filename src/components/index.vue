<template>
  <el-container id="index">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light header_center">电商后台管理系统</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple header_right">
            <el-button type="danger" @click="logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="index_aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users"><span class="el-icon-menu"></span> 用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  //判断用户是否登录
  // beforeCreate() {
  //   if (window.sessionStorage.getItem("token")) {
  //     //当session中token存在的时候,不用管,让网页继续加载
  //   } else {
  //     //当没有的token的时候,提醒用户未登录,并把用户踢到登录页
  //     this.$message.warning("请先登录");
  //     this.$router.push("/login");
  //   }
  // },
  methods: {
    logout() {
      this.$confirm("是否退出?, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //清除token值
        window.sessionStorage.removeItem("token");
        //返回登录页
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style>
#index {
  height: 100%;
  width: 100%;
}
.header {
  height: 60px;
  width: 100%;
  background-color: #b3c0d1;
}
.header_center {
  line-height: 60px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.header_right {
  line-height: 60px;
  text-align: right;
}
.el-main.index_main {

  height: 100%;
  height: 100%;
  background-color: #e9eef3;
  padding-top: 0;
}
</style>