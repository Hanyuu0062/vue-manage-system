import { createRouter, createWebHistory } from 'vue-router'

// 导入组件
import LayoutVue from '@/views/Layout.vue'
import CourseVue from '@/views/component/CManage.vue'
import StudentVue from '@/views/component/StuManage.vue'
import ScVue from '@/views/component/Sc.vue'
import WelcomeVue from '@/views/component/welcome.vue'
import LoginVue from '@/views/Login.vue'

// 配置路由
const routes = [
    {
        path: '/login', component: LoginVue
    },
    {
        //   redirect:'' 设置重定向 即为默认子路由
        path: '/', component: LayoutVue, redirect: '/', children: [
            { path: '/', component: WelcomeVue },
            { path: '/student', component: StudentVue },
            { path: '/course', component: CourseVue },
            { path: '/Sc', component: ScVue }
        ]
    },

]

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

// 导出路由
export default router;