<template>
  <div style="min-width: 1200px; ">
    <div class="login-header">
      <div style="width:200px;line-height: 96px;position: relative;">
        <img
          style="position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);max-width: 95%;max-height: 95%;"
          :src="sysLogo">
      </div>
      <div class="login-header-right">服务热线：{{ hotLine }}</div>
    </div>
    <div class="login-content">
      <img src="../../assets/login-bg.jpg" style="height: 100%;width: 100%;">
      <div class="login-content-form-box" >
        <login1 v-if="isShow" @onChange="changeView" @handleClick="handleClick" />
        <login2  v-else @onChange="changeView" :isPass="isPass"  />
      </div>
    </div>
    <div class="login-footer">Copyright © 2019-{{ year1 }} {{ companyName }} 版权所有 备案号：{{ record }}</div>
  </div>
</template>
<script>
import login1 from "./login1";
import login2 from "./login2";
import { getInfo } from "@/api/login/login.js";
export default {
  name: "UserLayout",
  components: {
    login1,
    login2
  },
  data() {
    return {
      isShow: true, //控制login1页面是否显示
      year1: '',
      isPass: true,//控制login2页面是否显示
      hotLine: '',
      companyName: '',
      record: '',//备案信息
      sysLogo: '',//网站logo信息
    }
  },
  created() {
    this.loginInfo()
  },
  methods: {
    // 点击注册会触发
    handleClick(e){
      this.isShow = e;
      this.isPass=e
    },
    // 点击忘记密码
    changeView(e) {
      this.isShow = e;
      this.isPass=!e
    },
    // 网站信息
    async loginInfo() {
      const res = await getInfo()
      if (res.data.code == 200) {
        this.sysLogo= res.data.result.logo
        this.year1= res.data.result.year
        this.hotLine = res.data.result.phone
        this.record = res.data.result.record
        this.companyName= res.data.result.companyName
      } else {
        this.$message({
          message: res.msg,
          type: 'error',
          duration: 2000
        });
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.login-header {
  height: 6rem;
  display: flex;
  justify-content: space-between;
  padding: 0 60px 0 60px;
  line-height: 104px;

  .login-header-right {
    font-size: 26px;
    line-height: 6rem;
    font-weight: bold;
    background: url("../../assets/login-phone.png") left no-repeat;
    background-size: 40px 40px;
    padding-left: 60px;
  }
}

.login-footer {
  min-width: 1200px;
  text-align: center;
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0;
  line-height: 1rem;
  font-size: 12px;
}

ul,
li,
p,
dl,
dd,
body,
html,
a {
  padding: 0;
  margin: 0;
  list-style: none;
  text-decoration: none;
}

.login-content {
  height: 82vh;
  width: 100%;
  position: relative;
  min-width: 1200px
}

.login-content-form-box {
  width: 400px;
  height: 505px;
  background-color: white;
  position: absolute;
  right: 15%;
  top: 50%;
  transform: translateY(-50%);
  // padding: 30px 60px;
}
</style>