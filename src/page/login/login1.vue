<template>
  <div class="login-box" style="overflow: hidden">
    <a-tabs default-active-key="0" @change="callback">
      <a-tab-pane key="0" tab="账号登录">
        <a-form-model
          label-width="0"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <!-- 用户名输入 -->
          <a-form-model-item prop="username">
            <a-input
              class="form-item"
              placeholder="用户名输入"
              v-model="ruleForm.username"
              autocomplete="off"
            ></a-input>
          </a-form-model-item>
          <!-- 密码输入 -->
          <a-form-model-item prop="password">
            <a-input
              class="form-item"
              placeholder="请输入密码"
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item prop="captcha">
            <a-input
              class="form-item"
              style="position: relative"
              placeholder="请输入验证码"
              v-model="ruleForm.captcha"
              autocomplete="off"
            >
            </a-input>
          </a-form-model-item>
          <lofinCode
            @isCode="handleisCode"
            :isgetCode="isgetCode"
            style="position: absolute; top: 212px; right: 4px"
          >
          </lofinCode>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane key="2" tab="验证码登录" force-render>
        <a-form-model
          label-width="0"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <!-- 手机号输入 -->
          <a-form-model-item prop="mobile">
            <a-input
              class="form-item"
              placeholder="请输入手机号"
              v-model="ruleForm.mobile"
              autocomplete="off"
            ></a-input>
          </a-form-model-item>
          <a-form-model-item prop="captcha">
    <div class="input-with-button">
      <a-input
        class="form-item"
        placeholder="请输入短信验证码"
        v-model="ruleForm.captcha"
        autocomplete="off"
      ></a-input>
      <a-button 
        class="form-item" 
        @click="startCountdown" 
        :disabled="countdown > 0">
        <span style="color: #409eff">
          {{ countdown > 0 ? `${countdown}秒` : "获取短信验证码" }}
        </span>
      </a-button>
    </div>
  </a-form-model-item>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
    <div>
      <p class="login-forgot">
        <span @click="isPass">忘记密码?</span>
      </p>
    </div>
    <div class="btn-box">
      <a-button @click="onSubmit" class="login-btn" type="primary"
        >登录</a-button
      >
      <div @click="handleLogin" class="login-text">
        还没有账号，去<span class="login-register">注册</span>
      </div>
    </div>
  </div>
</template>
<script>
import lofinCode from "./loginCode";
import { getLogin, getCodes, getPhoneLogin } from "../../api/login/login";
export default {
  components: {
    lofinCode,
  },
  data() {
    return {
      key: 0,
      countdown: 0, //验证码
      isCode: "",
      token: "",
      ruleForm: {
        username: "",
        password: "",
        captcha: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: this.validateMobile, trigger: "blur" },
        ],

        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  created() {
    this.isgetCode = !this.isgetCode;
  },
  methods: {
    isValidMobile(phone) {
      return /^1[0-9]{10}$/.test(phone);
    },
    async startCountdown() {
      if (this.isValidMobile(this.ruleForm.mobile)) {
        let params = {
          messageSource: "2",
          phone: this.ruleForm.mobile,
          smsmode: "0",
        };
        const res =await getCodes(params);
        if (this.countdown > 0) {
          return;
        }
        this.countdown = 60;
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(interval);
          }
        }, 1000);
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确的手机号",
          type: "error",
        });
      }
    },
    handleLogin1() {
      if (
        !this.ruleForm.username ||
        !this.ruleForm.password ||
        !this.ruleForm.captcha
      ) {
        this.$message.error("用户名、密码、验证码请填写完整");
        return false;
      }
      return true;
    },
    handleLogin2() {
      if (!this.ruleForm.mobile || !this.ruleForm.captcha) {
        this.$message.error("手机号、验证码请填写完整");
        return false;
      }
      return true;
    },
    async onSubmit() {
      // 验证码登录
      if (this.key == 0) {
        if (!this.handleLogin1()) return;
        if (this.isCode.toLowerCase() == this.ruleForm.captcha.toLowerCase()) {
          let data = {
            username: this.ruleForm.username,
            password: this.ruleForm.password,
            captcha: this.ruleForm.captcha,
            remember_me: " ",
          };
          const res = await getLogin(data);
          if (res.data.code == 200) {
            let token = res.data.result.token;
            let userInfo = res.data.result.userInfo;
            this.$store.dispatch("user/getToken", token);
            this.$store.dispatch("user/getInfo", userInfo);
            this.$message.success("登录成功");
            setTimeout(() => {
              this.$router.push("/dashboard");
            }, 1000);
          } else {
            this.isgetCode = !this.isgetCode;
            this.$message.error("用户名或者密码错");
            this.resetForm();
          }
        } else {
          this.isgetCode = !this.isgetCode;
          this.resetForm();
          this.$message.error("验证码错误");
        }
      } else if (this.key == 2) {
        if (!this.handleLogin2()) return;
        //  短信验证码登录
        let data = {
          mobile: this.ruleForm.mobile,
          captcha: this.ruleForm.captcha,
        };
        const res = await getPhoneLogin(data);
        if (res.data.code == 200) {
          this.$message.success("登录成功");
          setTimeout(() => {
              this.$router.push("/dashboard");
            }, 1000);
        } else {
          this.$message.error(res.data.message);
      
          this.resetForm();
        }
        this.$store.dispatch("user/login", data);
      }
    },
    // 重置表单
    resetForm() {
      this.ruleForm = {
        username: "",
        password: "",
        captcha: "",
        code: "",
      };
      this.isCode = "";
      this.$refs.ruleForm.resetFields();
    },
    callback(key) {
      console.log(key, "key");
      this.key = key;
      this.resetForm();
    },
    validateMobile(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else if (!this.isValidMobile(value)) {
        return callback(new Error("请输入有效的手机号"));
      }
      callback();
    },
    // 点击注册
    handleLogin() {
      this.$emit("handleClick", false);
    },
    isPass() {
      this.$emit("onChange", false);
    },
    handleisCode(code) {
      this.isCode = code;
    },
  },
};
</script>
<style scoped lang="scss" src="./login.scss"></style>
<style scoped lang="scss">
.login-box {
  padding: 30px 60px;
}

.blank-ruleForm {
  border-bottom: 1px solid black;
  border-left-width: 0;
  border-top-width: 0;
  border-right-width: 0;
}

.form-item {
  height: 50px;
}

.login-btn {
  width: 280px;
  margin-top: 80px;
}

.login-forgot {
  line-height: 10px;
}

.login-text {
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  color: #b9b6b5;
  cursor: pointer;
}

.login-register {
  font-weight: 700;
  color: #409eff;
}
.input-with-button {
  display: flex;
  align-items: center;
}
::v-deep .ant-input-group .ant-input {
  height: 50px;
}
</style>
