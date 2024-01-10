import request from '@/utils/request.js'

export function loginService(formData){
    return request.post('/login',formData)
}