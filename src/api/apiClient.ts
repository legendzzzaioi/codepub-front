import axios from 'axios';
import {message} from "ant-design-vue";
import router from '../router'; // 假设路由实例在 router/index.ts 文件中

const apiClient = axios.create({
    baseURL: '/api/v1',
    withCredentials: true, // 允许跨域请求发送 Cookie
});

// 响应拦截器
apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        message.error('Unauthorized. Please login again.').then();
        localStorage.removeItem('session');
        router.push({name: 'Login'}).then();
    }
    return Promise.reject(error);
});

export default apiClient;