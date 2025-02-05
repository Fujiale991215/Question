import axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import { refreshNewToken } from "./server/login/index";
import http from "./utils/http";
const request: any = axios.create({
    baseURL: "/my-app",
    timeout: 30000,
});
const handleNetworkError = (errStatus: any) => {
    let errMessage = '未知错误';
    if (errStatus) {
        switch (errStatus) {
            case 400:
                errMessage = '错误的请求';
                break;
            case 401:
                errMessage = '未授权，请重新登录';
                break;
            case 403:
                errMessage = '拒绝访问';
                break;
            case 404:
                errMessage = '请求错误,未找到该资源';
                break;
            case 405:
                errMessage = '请求方法未允许';
                break;
            case 408:
                errMessage = '请求超时';
                break;
            case 500:
                errMessage = '服务器端出错';
                break;
            case 501:
                errMessage = '网络未实现';
                break;
            case 502:
                errMessage = '网络错误';
                break;
            case 503:
                errMessage = '服务不可用';
                break;
            case 504:
                errMessage = '网络超时';
                break;
            case 505:
                errMessage = 'http版本不支持该请求';
                break;
            default:
                errMessage = `其他连接错误 --${errStatus}`;
        }
    } else {
        errMessage = `无法连接到服务器！`;
    }
    message.error(errMessage);
};
/** 添加状态标识   */
let isRefreshing = false;
/** 失败的请求队列 */
let failedQueue: any[] = [];
/** 获取刷新状态函数 */
function processQueue(error: any = null) {
    failedQueue.forEach(prom => {
        if (error) {
            prom.resolve(); // 成功则解决请求  
        } else {
            prom.reject(error); // 如果失败，拒绝所有请求  
        }
    });
    failedQueue = [];
}
/** 刷新令牌 */
async function refresh(): Promise<any> {
    const refreshToken = localStorage.getItem('question_refreshToken_token');
    try {
        const res: any = await http.get(`/refresh/${refreshToken}`);
        if (res.code == 200) {
            localStorage.setItem('question_access_token', res.data.accessToken);
            localStorage.setItem('question_refreshToken_token', res.data.refreshToken);
        }
        return res;
    } catch (error) { }
}
/** 移除token */
function removeToken() {
    localStorage.removeItem('question_access_token');
    localStorage.removeItem('question_refreshToken_token');
}
/** 请求拦截器 */
request.interceptors.request.use((config: any) => {
    if (localStorage.getItem('question_access_token')) {
        config.headers['Authorization'] = localStorage.getItem('question_access_token');
    }
    return config;
}, (err: any) => {
    return Promise.reject(err);
});

/** 响应拦截器 */
request.interceptors.response.use((res: any) => {
    return res.data;
}, async (err: any) => {
    const { data, config, status } = err.response;
    if (status == 401) {
        message.warning('未登录，请先登录');
        removeToken();
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    } else if (status == 402) {
        if (!isRefreshing) {
            isRefreshing = true;
            const res = await refresh();
            processQueue(res.code === 200);
            if (res.code === 402) {
                message.warning('登录已过期，请重新登录');
                removeToken();
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
                return;
            }
            isRefreshing = false; // 刷新结束  
        }
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject }); // 将后续请求加入队列  
            processQueue();
        });
    } else {
        handleNetworkError(status);
    }
    return Promise.reject(err);
});


export default request;