import request from '@/utils/request.js'

export function courseGetService(params) {
    return request.get('/course', { params: params })
}

export function del(id) {
    return request.delete('/course?id=' + id)
}

export function courseAdd(Form) {
    return request.post('/course/add', Form)
}

export function courseUp(Form) {
    return request.post('/course/edit', Form)
}