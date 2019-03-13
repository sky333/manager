<template>
  <div>
    <!-- 面包屑 -->
    <mianbaoxie second="订单管理" third="订单列表"></mianbaoxie>

    <!-- 表单 -->
    <el-table style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope>
          <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope>
          <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :page-sizes="[2, 5, 6, 8]" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    <!-- 添加的弹框 -->
    <el-dialog title="添加用户" status-icon>
      <el-form label-width="80px" class="my-form" status-icon ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input autocomplete="off"></el-input>
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
export default {};
</script>
<style>
</style>