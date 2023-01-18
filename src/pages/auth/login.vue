<template>
    <el-row class="acme-login">
        <el-col :md="14">
            <div class="login-content">
                <!-- 生成左侧背景动画 -->
                <div class="animation-block">
                    <div class="block" v-for="item in 10" :key="item"></div>
                </div>
                <!-- 文字介绍部分 -->
                <div class="content-description">
                    <div class="logo">
                        <img src="../../assets/logo-white.png" style="width: 90px;" alt="">
                    </div>
                    <div class="title">ACME ADMIN 欢迎您</div>
                    <div class="description">
                        感谢您的使用，项目使用到的技术栈 vite + ts + vue3,源码请点击
                        <a target="_blank" href="https://gitee.com/vertexer/acme-admin/star">下载</a>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :md="10" style="display: flex;">
            <div class="login-form">
                <div class="form-top">
                    <div class="title">ACME ADMIN通用管理系统</div>
                </div>
                <el-form ref="ruleFormRef" :model="form" :rules="rules" class="login-form" label-position="left"
                    @keyup.enter.native="submitForm(ruleFormRef)" style="width:100%;" size="large">
                    <el-form-item class="form-item" prop="username">
                        <el-input prefix-icon="Avatar" v-model.trim="form.username" placeholder="请输入用户名" type="text" />
                    </el-form-item>
                    <el-form-item class="form-item" prop="password">
                        <el-input prefix-icon="Lock" :type="isShowPassword ? 'text' : 'password'"
                            v-model.trim="form.password" placeholder="请输入密码">
                            <template #suffix>
                                <el-icon class="item-icon" @click="(isShowPassword = !isShowPassword)">
                                    <View v-if="isShowPassword" />
                                    <Hide v-else />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="isRemember" label="记住账号密码"></el-checkbox>
                    </el-form-item>
                    <el-button round :loading="loading" class="login-btn" type="primary"
                        @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from "~/store/modules/user";
import { FormInstance, FormRules, ElNotification, ElMessage } from 'element-plus'

const userStore = useUserStore();
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const form = reactive({
    username: '',
    password: '',
});
const rules = ref<FormRules>({
    username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
})
let loading = ref(false);
//是否明文显示密码
let isShowPassword = ref(false);
//是否记住密码
const isRemember = ref(true);

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: boolean) => {
        if (valid) {
            loading.value = true;
            //用户登录
            userStore.login(form).then(res => {
                ElNotification({
                    type: 'success',
                    duration: 500,
                    message: '登录成功。',
                });
                setTimeout(() => {
                    router.push('/')
                }, 600);
            }).catch(error => {
                ElMessage({
                    message: error,
                    type: 'error'
                });
            }).finally(()=>{
                loading.value = false;
            });

        } else {
            return false
        }
    })
}
</script>

<style lang="scss">
.acme-login {
    height: 100vh
}

.login-content {
    width: 100%;
    height: 100%;
    background-color: var(--acme-login-bg);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .content-description {
        width: 80%;

        .title {
            color: #fff;
            font-size: 30px;
            padding-bottom: 10px;
        }

        .description {
            font-size: 16px;
            color: #ebebeb;
            margin-top: 10px;
        }
    }
}

.login-form {
    width: 65%;
    min-width: 300px;
    margin: auto;

    .form-top {
        display: flex;
        padding: 30px 10px;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 20px;
            margin-left: 10px;
            font-weight: bold;
        }
    }

    .form-item {
        z-index: 1;
        position: relative;

        .item-icon {
            cursor: pointer;
        }
    }

    .login-btn {
        width: 100%;
        padding: 20px;
    }
}

/* 动画效果部分 */
.animation-block {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;


    .block {
        position: absolute;
        display: block;
        list-style: none;
        width: 20px;
        height: 20px;
        background: #FFF;
        animation: animate 25s linear infinite;
        bottom: -200px;

        @keyframes animate {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
                border-radius: 0;
            }

            100% {
                transform: translateY(-1000px) rotate(720deg);
                opacity: 0;
                border-radius: 50%;
            }
        }

        &:nth-child(1) {
            left: 15%;
            width: 80px;
            height: 80px;
            animation-delay: 0s;
        }

        &:nth-child(2) {
            left: 5%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 12s;
        }

        &:nth-child(3) {
            left: 70%;
            width: 20px;
            height: 20px;
            animation-delay: 4s;
        }

        &:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;
            animation-delay: 0s;
            animation-duration: 18s;
        }

        &:nth-child(5) {
            left: 65%;
            width: 20px;
            height: 20px;
            animation-delay: 0s;
        }

        &:nth-child(6) {
            left: 75%;
            width: 150px;
            height: 150px;
            animation-delay: 3s;
        }

        &:nth-child(7) {
            left: 35%;
            width: 200px;
            height: 200px;
            animation-delay: 7s;
        }

        &:nth-child(8) {
            left: 50%;
            width: 25px;
            height: 25px;
            animation-delay: 15s;
            animation-duration: 45s;
        }

        &:nth-child(9) {
            left: 20%;
            width: 15px;
            height: 15px;
            animation-delay: 2s;
            animation-duration: 35s;
        }

        &:nth-child(10) {
            left: 85%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 11s;
        }
    }
}
</style>