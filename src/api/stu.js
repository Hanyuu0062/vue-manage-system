import axios from 'axios';
import request from '@/utils/request.js'

export function StuGetService(params) {
    return request.get('/student', { params: params })
}

export function del(id) {
    return request.delete('/student?id=' + id)
}

export function StuAdd(Form) {
    return request.post('/student/add', Form)
}

export function StuUp(Form) {
    return request.post('/student/edit', Form)
}