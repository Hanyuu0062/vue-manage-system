import request from '@/utils/request.js'

export function scGetService(params) {
    return request.get('/sc', { params: params })
}

export function del(sid, cid) {
    return request.delete('/sc?sid=' + sid + '&cid=' + cid)
}

export function scAdd(Form) {
    return request.post('/sc/add', Form)
}

export function scUp(Form) {
    return request.post('/sc/edit', Form)
}