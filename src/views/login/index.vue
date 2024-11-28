<template>
  <el-row class="login-container " justify="center" :align="'middle'">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link"><el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
      </div>

      <el-form ref="loginFormRef" :model="loginForm" style="max-width: 600px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="loginId">
          <el-input v-model="loginForm.loginId" placeholder="手机号" :prefix-icon="Cellphone"></el-input>
        </el-form-item>
        <el-form-item v-if="formType" prop="userName">
          <el-input v-model="loginForm.userName" placeholder="用户名称" :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.identifyValue" type="password" placeholder="密码" :prefix-icon="Lock"></el-input>
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
            <template #append>
              <span @click="countDownChange"> {{ countDown.validText }} </span>
            </template>
          </el-input>

        </el-form-item>
        <el-form-item prop="validCode">
          <el-button type="primary" :style="{ width: '100%' }" @click="submitForm(loginFormRef)">

            {{ formType ? '注册账号' : '登录' }}
          </el-button>

        </el-form-item>

      </el-form>
    </el-card>

  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getCode, userRegister, userLogin } from '../../api'
//需要引入字体图标库，否则不展示
import { UserFilled, Lock, Cellphone } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href


const loginForm = reactive({
  loginId: '',
  loginType: '1',
  userName: '',
  identifyType: '1',
  identifyValue: '',
  validCode: ''
})


//切换表单(0-登录  1-注册)
const formType = ref(0)
//点击切换登录和注册
const handleChange = () => {
  formType.value = formType.value ? 0 : 1
}

const validateLoginId = (rule, value, callback) => {
  //不能为空
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    const phoneReg = /^1[34578]\d{9}$/
    phoneReg.test(value) ? callback() : callback(new Error('手机号格式校验失败'))
  }
}
const validateUserName = (rule, value, callback) => {
  //不能为空
  if (value === '') {
    callback(new Error('请输入用户名称'))
  } else {
    value.length > 5 ? callback(new Error('用户名称长度不超过5，请重新输入')) : callback()
  }
}

const validatePassword = (rule, value, callback) => {
  //不能为空
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    reg.test(value) ? callback() : callback(new Error('密码格式不正确，需要4-16位字符，不包含特殊字符'))
  }
}
//表单校验
const rules = reactive({
  loginId: [{ validator: validateLoginId, trigger: 'blur' }],
  userName: [{ validator: validateUserName, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

//发送短信，倒计时
const countDown = ref({
  validText: '获取验证码',
  time: 60
})

let flag = false
const countDownChange = () => {
  //如果已发送，不处理
  if (flag) return

  //判断手机号是否正确
  const phoneReg = /^1[34578]\d{9}$/
  if (!loginForm.loginId || !phoneReg.test(loginForm.loginId)) {
    return ElMessage({
      message: '请检查手机号是否正确',
      type: 'warning'
    })
  }

  //倒计时
  const time = setInterval(() => {
    if (countDown.value.time <= 0) {
      countDown.value.time = 60
      countDown.value.validText = '获取验证码'
      flag = false
      //定时器清除，否则会一直在循环
      clearInterval(time)
    } else {
      countDown.value.time -= 1
      countDown.value.validText = `剩余${countDown.value.time}s`
    }

  }, 1000)
  flag = true
  getCode({ mobileNo: loginForm.loginId }).then(({ data }) => {
    if (data.success === true) {
      ElMessage.success('发送成功')
    }
  })
}


const router = useRouter()
const loginFormRef = ref()
//表单提交
const submitForm = async (formEl) => {
  if (!formEl) return
  //手动触发表单校验
  await formEl.validate((valid, fields) => {
    if (valid) {

      if (formType.value) {
        //注册页面
        userRegister(loginForm).then(({ data }) => {
          if (data.success === true) {
            ElMessage.success('注册成功，请登录')
            formType.value = 0
          }
        })
      } else {
        //登录页面
        userLogin(loginForm).then(({ data }) => {
          if (data.success === true) {
            ElMessage.success('登录成功')
            //保存token和用户信息
            localStorage.setItem('odk-token', data.data.token)
            //这里需要序列化，转成字符串
            localStorage.setItem('userInfo', JSON.stringify(data.data))
            router.push('/')
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0;
}

.login-container {
  height: 100%;

  .card-header {
    background-color: #899fe1;

    img {
      width: 480px;
      height: 200px;
    }
  }

  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>