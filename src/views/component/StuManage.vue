<script setup>
import { ref } from 'vue';
import {
  Plus,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const stuData = ref([])
const stuID = ref()
const stuName = ref('')
const depName = ref([])
const ide = ref(false)

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const stuForm = ref({
  'id': '',
  'name': '',
  'sex': '',
  'age': '',
  'dep': ''
})

const visible = ref(false)
const msg = ref('') //弹出的提示msg

// newNum是改变后的页数 会自动传入
const handleCurrentChange = (newNum) => {
  pageNum.value = newNum
  StuGet()
}


// 拉取部门信息,并处理显示
import { DepGet } from '@/api/dep.js'
const depDeal = async () => {
  let res = await DepGet();
  depName.value = res.data
  for (let i = 0; i < stuData.value.length; ++i) {
    // 转换性别
    if (stuData.value[i].sex == '1') {
      stuData.value[i].sexName = '男'
    } else {
      stuData.value[i].sexName = '女'
    }
    for (let j = 0; j < depName.value.length; ++j) {
      if (depName.value[j].id == stuData.value[i].dep) {
        stuData.value[i].depName = depName.value[j].name
      }
    }
  }
}

// 拉取学生信息
import { StuGetService, del } from '@/api/stu.js'

const StuGet = async () => {
  // 查询数据
  let params = {
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    id: stuID.value ? stuID.value : null,
    name: stuName.value ? stuName.value : null
  }
  let res = await StuGetService(params)
  stuData.value = res.data.list
  total.value = res.data.total
  depDeal()
}

// 删除
const hindleDelete = async (row) => {
  let res = await del(row.id)
  ElMessage.success(res.message)
  StuGet()
}

// 开启编辑
const toEdit = (info) => {
  ide.value = true
  stuForm.value = info
  msg.value = '学生信息编辑'
  visible.value = true
}

const toAdd = () => {
  ide.value = false
  stuForm.value = {
    'id': '',
    'name': '',
    'sex': '',
    'age': '',
    'dep': ''
  }
  msg.value = '新增学生'
  visible.value = true
}


// 新增修改学生
import { StuAdd, StuUp } from '@/api/stu.js'
const stuSet = async () => {
  if (msg.value == '新增学生') {
    // 新增
    let res = await StuAdd(stuForm.value)
    ElMessage.success(res.message)
  } else {
    // 修改
    let res = await StuUp(stuForm.value)
    ElMessage.success(res.message)
  }
  StuGet()
}
// 开关对话框
const hindleClose = () => {
  visible.value = false
}

StuGet();
</script>

<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="stuID" placeholder="请输入学号" />
      </el-col>
      <el-col :span="6">
        <el-input v-model="stuName" placeholder="请输入姓名" />
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="StuGet()">查询</el-button>
      </el-col>
      <el-col :span="6" align="right">
        <el-button type="primary" :icon="Plus" @click="toAdd()">新增学生</el-button>
      </el-col>
    </el-row>

    <el-table :data="stuData" style="width: 100%">
      <el-table-column label="学号" prop="id" width="180"> </el-table-column>
      <el-table-column label="姓名" prop="name" width="180"> </el-table-column>
      <el-table-column label="性别" prop="sexName" width="180"> </el-table-column>
      <el-table-column label="年龄" prop="age" width="180"> </el-table-column>
      <el-table-column label="院系" prop="depName" width="180"> </el-table-column>
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
    <el-form :model="stuForm" label-width="120px">
      <el-form-item label="学号">
        <el-input v-model="stuForm.id" placeholder="请输入学号" :disabled="ide" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="stuForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="stuForm.sex" placeholder="请选择性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="stuForm.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item label="学院">
        <el-select v-model="stuForm.dep" placeholder="选择学院">
          <!-- 轮显示选择框 -->
          <el-option v-for="e in depName" :value="e.id" :label="e.name" :key="e.id"/>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hindleClose">取消</el-button>
        <el-button type="primary" @click="visible = false; stuSet()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.text {
  font-size: 16px;
}
</style>
