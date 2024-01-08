// npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'

// 拦截器 避免重复操作

const instance = axios.create({ 
    baseURL: '/api' 
})

instance.interceptors.response.use(
    result => {
        //加个成功的判断
        if (result.data.code == 1) {
            return result.data
        }
        // 失败的结果
        ElMessage.error(result.data.message ? result.data.message : '服务异常')
        return Promise.reject(result.data)
    },
    err => {
        ElMessage.error('服务异常')
        return Promise.reject(err)
    }
)

export default instance;