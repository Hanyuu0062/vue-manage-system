<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = ref({ uid: 'admin', password: '123456', confirm: '' })
const buttonInfo = ref('登录')
const signFlag = ref(false)

// 表单校验规则
const checkPassword = (rule, value, callback) => {
    if (value == '') {
        callback(new Error("请再次确认密码"))
    } else if (value != form.value.password) {
        callback(new Error("两次输入的密码不一致"))
    } else {
        callback()
    }
}

const rules = {
    // rules里的名字要跟输入的名字一致
    uid: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 16, message: '输入的长度有误', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 16, message: '输入的长度有误', trigger: 'blur' }
    ],
    confirm: [
        { validator: checkPassword, trigger: 'blur' }
    ]
}

// 按钮的切换
const button_login = ref('switch-a');
const button_sign = ref('switch-b');
const switchButton = (submit) => {
    if (signFlag.value && !submit) {
        // 处于注册 点击登录
        signFlag.value = false;
        buttonInfo.value = '登录';
        button_login.value = 'switch-a';
        button_sign.value = 'switch-b';
    } else if (!signFlag.value && submit) {
        // 处于登录 点击注册
        signFlag.value = true;
        buttonInfo.value = '注册';
        button_login.value = 'switch-b';
        button_sign.value = 'switch-a';
    }
}

// 登录和注册
import { loginService } from '@/api/login.js'
import { useTokenStore } from '@/stores/token.js'
const tokenStore = useTokenStore()
const login_sign = async () => {
    if (signFlag.value) {
        // 注册
        let res;
    } else {
        // 登录
        let loginForm = {
            uid: form.value.uid,
            password: form.value.password
        }
        let res = await loginService(loginForm)
        ElMessage.success(res.message)
        tokenStore.setToken(res.data)
        router.push('/')
    }
};

</script>


<template>
    <div id="body-container">
        <div class="main-container">
            <el-container>
                <el-header>
                    <button :class="button_login" @click="switchButton(false)">登录</button>
                    /
                    <button :class="button_sign" @click="switchButton(true)">注册</button>
                </el-header>
                <el-main>
                    <el-form :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="用户名" prop="uid">
                            <el-input v-model="form.uid" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="form.password" />
                        </el-form-item>
                        <el-form-item label="确认密码" v-if="signFlag" prop="confirm">
                            <el-input type="password" v-model="form.confirm" />
                        </el-form-item>
                        <div align='center'><el-button type="primary" @click="login_sign"> {{ buttonInfo }}</el-button>
                        </div>
                    </el-form>
                </el-main>
                <el-footer>期末作业 2023 Created by Hanyuu</el-footer>
            </el-container>
        </div>
    </div>
</template>


<style scoped>
#body-container {
    position: absolute;
    background-image: url("@/assets/bg1.png");
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
}

.main-container {
    position: absolute;
    margin-left: 5vw;
    width: 400px;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.801);
    font-size: 3rem;
    box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3);
    /* 
    实现毛玻璃效果
    border-radius: 30px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 30px 10px rgba(0, 0, 0, .3); 
    */

    .el-header {
        position: relative;
        height: 30vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-main {
        position: relative;
        height: 60vh;
    }

    .el-footer {
        position: relative;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}

/* 登录 注册按钮 */
.switch-a {
    color: #EEC0DA;
    font-size: 3rem;
    border: none;
    background-color: transparent;
}

.switch-b {
    color: #567CBE;
    font-size: 3rem;
    border: none;
    background-color: transparent;
}

.switch-b:hover {
    color: #EEC0DA;
    cursor: pointer;
}

.el-button {
    display: flex;
    width: 50%;
    margin: 30px;
    border-radius: 30px;
}
</style>

