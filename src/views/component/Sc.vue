<script setup>
import { ref } from 'vue';
import {
    Plus,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const scData = ref([])
const sid = ref()
const cid = ref()

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const scForm = ref({
    'sid': '',
    'cid': '',
    'pts': ''
})

const visible = ref(false)
const msg = ref('') //弹出的提示msg

// newNum是改变后的页数 会自动传入
const handleCurrentChange = (newNum) => {
    pageNum.value = newNum
    scGet()
}

// 拉取选课信息
import { scGetService, del } from '@/api/sc.js'

const scGet = async () => {
    // 查询数据
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        sid: sid.value ? sid.value : null,
        cid: cid.value ? cid.value : null
    }
    let res = await scGetService(params)
    scData.value = res.data.list
    total.value = res.data.total
    // tableDeal()
}

// 删除
const hindleDelete = async (row) => {
    let res = await del(row.sid, row.cid)
    ElMessage.success(res.message)
    scGet()
}

// 开启编辑
const toEdit = (info) => {
    scForm.value = info
    msg.value = '学生选课信息编辑'
    visible.value = true
}

const toAdd = () => {
    scForm.value = {
        'id': '',
        'sid': '',
        'cid': '',
        'pts': ''
    }
    msg.value = '新增学生选课'
    visible.value = true
}


// 新增修改学生
import { scAdd, scUp } from '@/api/sc.js'
const scSet = async () => {
    if (msg.value == '新增学生选课') {
        // 新增
        let res = await scAdd(scForm.value)
        ElMessage.success(res.message)
    } else {
        // 修改
        let res = await scUp(scForm.value)
        ElMessage.success(res.message)
    }
    scGet()
}
// 开关对话框
const hindleClose = () => {
    visible.value = false
}

scGet();
</script>

<template>
    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input v-model="sid" placeholder="请输入学号" />
            </el-col>
            <el-col :span="6">
                <el-input v-model="cid" placeholder="请输入课程号" />
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="scGet()">查询</el-button>
            </el-col>
            <el-col :span="6" align="right">
                <el-button type="primary" :icon="Plus" @click="toAdd()">新增学生</el-button>
            </el-col>
        </el-row>

        <el-table :data="scData" style="width: 100%">

            <el-table-column label="课程名" prop="cname" width="180"> </el-table-column>
            <el-table-column label="课程号" prop="cid" width="180"> </el-table-column>
            <el-table-column label="学号" prop="sid" width="180"> </el-table-column>
            <el-table-column label="姓名" prop="name" width="180"> </el-table-column>
            <el-table-column label="得分" prop="pts" width="180"> </el-table-column>
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
        <el-form :model="scForm" label-width="120px">
            <el-form-item label="学号">
                <el-input v-model="scForm.sid" placeholder="请输入学号" />
            </el-form-item>

            <el-form-item label="课程号">
                <el-input v-model="scForm.cid" placeholder="请输入课程号" />
            </el-form-item>

            <el-form-item label="期末成绩">
                <el-input v-model="scForm.pts" placeholder="请输入该学生成绩" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="hindleClose">取消</el-button>
                <el-button type="primary" @click="visible = false; scSet()">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.text {
    font-size: 16px;
}
</style>
