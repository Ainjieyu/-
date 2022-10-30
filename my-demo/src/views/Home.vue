<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user.png" alt="">
          <div class="user-info">
            <p class="name">admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-01-01</span></p>
          <p>上次登录地点: <span>上海</span></p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.user{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
.user-info{
  
  .name{
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access{
    color:#999;
  }
}
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span{
      margin-left: 60px;
      color: #666;
    }
  }
}
</style>