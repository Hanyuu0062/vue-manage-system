<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import {
    UserFilled,
    Reading,
    Document,
    ArrowDown
} from '@element-plus/icons-vue'

const head_msg = ref('云南大学-学生课程管理系统');

// 创建vue路由
const router_ = useRouter();
//  router.push(/)

const handleCommand = (command) => {
    if (command == 'logout') {
        router_.push("/login")
    }
}
</script>

<template>
    <!-- element-plus中的容器 -->
    <el-container class="layout-container">

        <!-- 左侧菜单 -->
        <el-aside width="225px">
            <div class="el-aside__logo" @click="router_.push('/')"></div>

            <el-menu text-color="#fff" background-color="#232323" router>

                <el-menu-item index="/student">
                    <el-icon>
                        <UserFilled />
                    </el-icon>
                    <span>学生管理</span>
                </el-menu-item>

                <el-menu-item index="/course">
                    <el-icon>
                        <Reading />
                    </el-icon>
                    <span>课程管理</span>
                </el-menu-item>

                <el-menu-item index="/sc">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>学生选课管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <!-- 右侧主区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                {{ head_msg }}
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        <el-avatar :size="50" :src="circleUrl" margin-right="30px"/>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="">修改资料</el-dropdown-item>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item>重置密码</el-dropdown-item>
                            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>

            <!-- 中间区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>

            <!-- 底部区域 -->
            <el-footer>期末作业 ©2023 Created by Hanyuu</el-footer>
        </el-container>

    </el-container>
</template>

<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.layout-container {
    height: 100vh;


    .el-aside {
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }
}
</style>