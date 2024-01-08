<script setup>
import { ref } from 'vue';
import {
    Plus,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const courseData = ref([])
const courseID = ref()
const courseName = ref('')

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const courseForm = ref({
    id: '',
    name: '',
    teacher: '',
    credit: ''
})

const visible = ref(false)
const msg = ref('') //弹出的提示msg

// newNum是改变后的页数 会自动传入
const handleCurrentChange = (newNum) => {
    pageNum.value = newNum
    courseGet()
}


// 拉取信息
import { courseGetService, del } from '@/api/course.js'
const courseGet = async () => {
    // 查询数据
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        id: courseID.value ? courseID.value : null,
        name: courseName.value ? courseName.value : null
    }
    let res = await courseGetService(params)
    courseData.value = res.data.list
    total.value = res.data.total
}

// 删除
const hindleDelete = async (row) => {
    let res = await del(row.id)
    ElMessage.success(res.message)
    courseGet()
}

// 开启编辑
const toEdit = (info) => {
    courseForm.value = info
    msg.value = '课程信息编辑'
    visible.value = true
}

const toAdd = () => {
    courseForm.value = {
        id: '',
        name: '',
        teacher: '',
        credit: ''
    }
    msg.value = '新增课程'
    visible.value = true
}


// 新增修改
import { courseAdd, courseUp } from '@/api/course.js'
const courseSet = async () => {
    if (msg.value == '新增课程') {
        // 新增
        let res = await courseAdd(courseForm.value)
        ElMessage.success(res.message)
    } else {
        // 修改
        let res = await courseUp(courseForm.value)
        ElMessage.success(res.message)
    }
    courseGet()
}
// 开关对话框
const hindleClose = () => {
    visible.value = false
    courseForm.value = {
        'id': '',
        'name': '',
        'sex': '',
        'age': '',
        'dep': ''
    }
}

courseGet();
</script>

<template>
    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="courseID" placeholder="请输入课程号" />
            </el-col>
            <el-col :span="6">
                <el-input v-model="courseName" placeholder="请输入课程名" />
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="courseGet()">查询</el-button>
            </el-col>
            <el-col :span="6" align="right">
                <el-button type="primary" :icon="Plus" @click="toAdd()">新增课程</el-button>
            </el-col>
        </el-row>

        <el-table :data="courseData" style="width: 100%">
            <el-table-column label="课程号" prop="id" width="180"> </el-table-column>
            <el-table-column label="课程名" prop="name" width="180"> </el-table-column>
            <el-table-column label="教师" prop="teacher" width="180"> </el-table-column>
            <el-table-column label="学分" prop="credit" width="180"> </el-table-column>
            <el-table-column label="编辑">
                <template #default="{ row }">
                    <el-button size="small" @click="toEdit(row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="hindleDelete(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum"
            @current-change="handleCurrentChange" />
    </el-card>

    <!-- 编辑窗口 -->
    <el-dialog v-model="visible" :title="msg" width="30%">
        <el-form :model="courseForm" label-width="120px">
            <el-form-item label="课程号">
                <el-input v-model="courseForm.id" placeholder="课程号会自动生成" :disabled="true" />
            </el-form-item>
            <el-form-item label="课程名">
                <el-input v-model="courseForm.name" placeholder="请输入课程名" />
            </el-form-item>
            <el-form-item label="教师名">
                <el-input v-model="courseForm.teacher" placeholder="请输入教师名" />
            </el-form-item>
            <el-form-item label="学分">
                <el-input v-model="courseForm.credit" placeholder="请输入学分" />
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="hindleClose">取消</el-button>
                <el-button type="primary" @click="visible = false; courseSet()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.text {
    font-size: 16px;
}
</style>
