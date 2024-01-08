<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

const form = ref({ uid: 'admin', password: '123456', confirm: '' })
const buttonInfo = ref('登录')
const signFlag = ref(false)

const login = () => {
    router.push('/')
    console.log(uid.value)
};

</script>


<template>
    <div id="body-container">
        <div class="main-container">
            <el-container>
                <el-header>
                    <button class="switch-b" @click="signFlag = false; buttonInfo = '登录'">登录</button>
                    /
                    <button class="switch-b" @click="signFlag = true; buttonInfo = '注册'">注册</button>
                </el-header>
                <el-main>
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="用户名">
                            <el-input v-model="form.uid" placeholder="请输入用户名" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" v-model="form.password" />
                        </el-form-item>
                        <el-form-item label="确认密码" v-if="signFlag">
                            <el-input v-model="form.confirm" />
                        </el-form-item>
                        <div align='center'><el-button type="primary" @click="login"> {{ buttonInfo }}</el-button></div>
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

