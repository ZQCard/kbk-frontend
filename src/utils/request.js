import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { get } from 'lodash'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // URL = 基础URL + 请求URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前可以进行一些处理，例如添加 token 等
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.log(error); // 调试用
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, status } = response;

    // 根据 HTTP 状态码进行处理
    if (status === 200) {
      // 处理正常的 200 状态码
      return data;
    } else {
      // 处理非 200 状态码
      Message({
        message: '请求错误，请重试',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error('请求错误'));
    }
  },
  (error) => {
    // 处理响应错误
    const response = get(error, 'response');
    if (response) {
      // 获取响应相关信息，并根据 HTTP 状态码进行处理
      const status = response.status;
      if (status === 401 || status === 403) {
        MessageBox.confirm('暂无权限', '退出登录', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }  else {
        // 处理其他类型的错误
        if (response.data.message != "") {
          Message({
            message: response.data.message,
            type: 'error',
            duration: 5 * 1000,
          });
        }else{
          Message({
            message: '请求失败，请重试',
            type: 'error',
            duration: 5 * 1000,
          });
        }
        
      }
    } else {
      // 处理其他类型的错误
      Message({
        message: '请求失败，请重试',
        type: 'error',
        duration: 5 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

export default service;