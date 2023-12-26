<template>
  <div class="login-box" style="overflow: hidden">
    <div
      @click="isImg"
      style="position: absolute; right: 0%; top: 0%; cursor: pointer"
    >
      <img src="../../assets/login-icon.png" style="width: 70px" />
    </div>
    <a-tabs v-if="isPass" v-model="activeName" @change="handleClick">
      <a-tab-pane tab="忘记密码" key="first">
        <a-form :model="ruleForm" layout="horizontal">
          <a-form-item>
            <a-input
              class="form-item"
              placeholder="请输入手机号"
              v-model="ruleForm.pass"
            ></a-input>
          </a-form-item>
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
                :disabled="countdown > 0"
              >
                <span style="color: #409eff">
                  {{ countdown > 0 ? `${countdown}秒` : "获取短信验证码" }}
                </span>
              </a-button>
            </div>
          </a-form-model-item>
          <a-form-item>
            <a-input
              class="form-item"
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              class="form-item"
              type="password"
              placeholder="请在此输入密码"
              v-model="ruleForm.pass"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-button style="height: 40px !important;" type="primary" @click="onSubmit" block>登录</a-button>
          </a-form-item>
        </a-form>
        <div style="font-size: 12px; text-align: center;">
          <a-checkbox v-model="agreed"></a-checkbox>
          <span>我已阅读同意</span>
          <a @click="open1">用户注册协议</a>、
          <a @click="open2">用户隐私政策</a>
        </div>
      </a-tab-pane>
    </a-tabs>

    <a-tabs v-else v-model="activeName" @change="handleClick">
      <a-tab-pane tab="会员注册" key="first">
        <a-form :model="ruleForm" layout="horizontal">
          <a-form-item>
          <a-select
            class="form-item custom-select"
            placeholder="请选择会员类型"
            v-model="selectedMemberType"
          >
            <a-select-option value="0">企业托运人</a-select-option>
            <a-select-option value="2">个人托运人</a-select-option>
            <a-select-option value="1">企业车辆承运人</a-select-option>
            <a-select-option value="3">个人车辆承运人</a-select-option>
          </a-select>
        </a-form-item>
          <a-form-item>
            <a-input
              class="form-item"
              placeholder="请输入手机号"
              v-model="ruleForm.pass"
            ></a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              class="form-item"
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
            ></a-input>
          </a-form-item>
          <a-form-item style="position: relative">
            <a-input
              class="form-item"
              placeholder="请输入验证码"
              v-model="ruleForm.pass"
            ></a-input>
            <loginCode style="position: absolute; top: -10px; right: 1px"></loginCode>
          </a-form-item>
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
                :disabled="countdown > 0"
              >
                <span style="color: #409eff">
                  {{ countdown > 0 ? `${countdown}秒` : "获取短信验证码" }}
                </span>
              </a-button>
            </div>
          </a-form-model-item>
          <a-form-item>
            <a-button  style="height: 40px !important;" type="primary" @click="onSubmit" block>登录</a-button>
          </a-form-item>
        </a-form>
        <div style="font-size: 12px; text-align: center;">
          <a-checkbox  v-model="agreed"></a-checkbox>
          <span>我已阅读同意</span>
          <a>用户注册协议</a>、
          <a>用户隐私政策</a>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import loginCode from "./loginCode";
import { getAgreement } from "../../api/login/login";
export default {
  components: {
    loginCode,
  },
  props: {
    isPass: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      interfaceTabsName: "",
      interfaceTabsName2: "",
      interfaceTabsValue: "",
      interfaceTabsValue2: "",
      activeName: "first",
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      isForgetPassword: true,
    };
  },
  methods: {
    isImg() {
      this.$emit("onChange", true);
    },
    async open1() {
      this.dialogVisible = true;
      let parmars = {
        _t: 1702894029,
        agreementCode: "userRegister",
      };
      const res = await getAgreement(parmars);
      this.interfaceTabsName = res.data.result.interfaceTabsName;
      this.interfaceTabsValue = res.data.result.interfaceTabsValue;
    },
  },
};
</script>
<style scoped>
.login-box {
  padding: 30px 60px;
}

.checkbox-container {
  display: flex;
  font-size: 12px;
  align-items: center;
  margin-top: 15px;
}
.form-item {
  height: 40px;
}

.checkbox-container span {
  margin-left: 5px;
  color: #0075ff;
  cursor: pointer;
}
::v-deep .custom-select .ant-select-selection--single {
  height: 40px !important;
  line-height: 40px;
}
.input-with-button {
  display: flex;
  align-items: center;
}
::v-deep .custom-select .ant-select-dropdown .ant-select-dropdown-menu-item {
  padding-top: 10px; /* reduce top padding */
  padding-bottom: 10px; /* reduce bottom padding */
  /* Adjust these padding values as needed */
}

</style>
