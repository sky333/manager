
<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 栅格+搜索栏 -->
    <el-row class="my_search">
      <el-col :span="6">
        <!-- 搜索栏 -->
        <div class="grid-content bg-purple">
          <!-- 需要给搜索栏绑定数据 -->
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            @keyup.enter.native="seach"
            v-model="sendData.query"
          >
            <el-button slot="append" icon="el-icon-search" @click="seach"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <!-- 按钮 -->
          <el-button type="success" plain @click="addFormVisiable=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 表单 -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch @change="statusChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="current">
          <el-button
            @click="handleEdit(current.$index, current.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delOne(current.row)"
            size="mini"
            plain
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
    <!-- 添加的弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisiable" status-icon>
      <el-form
        :model="addForm"
        label-width="80px"
        class="my-form"
        :rules="rules"
        status-icon
        ref="addForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model.trim="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisiable = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    //邮箱的验证
    var checkEmail = (rule, value, callback) => {
      if (value) {
        //延时验证
        setTimeout(() => {
          //定义正则表达式
          let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
          //验证是否匹配
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的邮箱或不填"));
          }
        }, 1000);
      } else {
        callback();
      }
    };
    //电话验证
    var checkMobile = (rule, value, callback) => {
      if (value) {
        //延时验证
        setTimeout(() => {
          //定义正则表达式
          let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
          //验证是否匹配
          if (reg.test(value)) {
            callback();
          } else {
            callback(new Error("请输入正确的电话号码或不填"));
          }
        }, 1000);
      } else {
        callback();
      }
    };

    return {
      //提交的数据
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: "10"
      },
      tableData: [],
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 标记新增框是否显示
      addFormVisiable: false,
      //新增的表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      //console.log(index);
      //console.log(row);
    },
    //查询数据
    async seach() {
      let res = await this.$http.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      this.tableData = res.data.data.users;
    },

    //表单验证
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //数据正确
          //提交数据
          let res = await this.$http.post("users", this.addForm, {
            // headers: {
            //   Authorization: window.sessionStorage.getItem("token")
            // },
          });
          if (res.data.dasta.meta.status == "201") {
            //重新获取
            this.seach();
            //关闭弹窗

            this.addFormVisiable = false;
          }
        } else {
          this.$message.warning("请正确输入");
          return false;
        }
      });
    },
    //删除数据
    delOne(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"

          // });
          let res = await this.$http.delete(`users/${item.id}`);
          if (res.data.meta.status == 200) {
            this.seach();
            // this.$message.success('删除成功')
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //状态改变
    async statusChange(item){
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`)
    }
  },

  //数据获取
  created() {
    this.seach();
  }
};
</script>
<style>
.el-breadcrumb.my_breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}
.my_search {
  margin-top: 5px;
  margin-bottom: 5px;
}
.my-form {
  height: auto;
  padding: 0;
}
</style>