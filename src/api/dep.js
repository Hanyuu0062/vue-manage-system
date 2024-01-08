import request from '@/utils/request.js'

export function DepGet() {
    return request.get('/dep')
}

