<template >
  <div id="login">
    <!-- 要给标签绑定数据 :formData   绑定验证规则 :rulss   -->
    <el-form 
      :model="formData"
      status-icon
      ref="formData"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
      :rules="rules"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="formData.password" autocomplete="off" @keyup.enter.native="submitForm('formData')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="submitForm('formData')">提交</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>
<script>
export default {
  data() {
    return {
      //表单数据
      formData: {
        username: "",
        password: ""
      },
      //表单的验证规则
      rules: {
        username: [
          // required是否必填(会提示*),message提示文本,提示触发条件  blur:失去焦点  change:输入状态
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        //alert("submit!");
        this.$http.post("login",this.formData).then(res=>{
            if(res.data.meta.status === 400){
                console.log(res);
                this.$message.error(res.data.meta.msg);
            }else{
                //登录成功
                console.log(res);
                this.$message.success(res.data.meta.msg);;
                window.sessionStorage.setItem('token',res.data.data.token)
                this.$router.push('/')
            }
        })
        } else {
          //console.log("error submit!!");
          this.$message.error('请输入正确的用户名和密码');
          return false;
        }
      });
    },
    
  }
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
body >div:first-of-type{
  width: 100%;
  height: 100%;
  background-color: #324152;
}
body >div:first-of-type {
  width: 100%;
  height: 100%;
  /* 设置模块居中 */
  display: flex;
  /* 主轴居中 */
  justify-content: center;
  /* 副轴居中 */
  align-items: center;
}
.el-form {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 40px;
}
.btn {
  width: 100%;
}
</style>
