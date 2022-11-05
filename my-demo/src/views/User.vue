<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form
        :rules="rules"
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select placeholder="请选择性别" v-model="form.sex">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">+ 新增</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别" >
          <template slot-scope="scope">
            <span>{{scope.row.sex == 1 ? '男':'女'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"> </el-table-column>
        <el-table-column prop="birth" label="出生日期"> </el-table-column>
        <el-table-column prop="addr" label="地址"> </el-table-column>
        <el-table-column prop="addr" label="地址"> 
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button> 
          </template> 
        </el-table-column>
      </el-table>
    </div>
  </div>
</template> 
  <script>
  import {getUser,addUser,editUser,delUser} from '../api'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请输入性别" }],
        birth: [{ required: true, message: "请输入出生年月" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData:[],
      modalType:0//0是新增
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.modalType === 0){
            addUser(this.form).then(() => {
              this.getList()
            })
          }else{
            editUser(this.form).then(() => {
              this.getList()
            })
          }
          this.$refs.form.resetFields();
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    handleEdit(row){
      this.modalType = 1
      this.dialogVisible = true

      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDel(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({id : row.id}).then(() => {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleAdd(){
      this.modalType = 0
      this.dialogVisible = true
    },
    getList(){
      getUser().then(({data}) => {
      console.log(data)
      this.tableData = data.list
    })
    }
  },
  mounted(){
    this.getList()
  }
};
</script>