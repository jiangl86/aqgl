import axios from 'axios';
import { urls } from './url'

export function get(url, [params]) {

    const instance1 = axios.create({
        baseURL: urls.baseUrl,
        timeout: 5000,
        method: 'get',
    })

    //拦截器，发送之前
    instance1.interceptors.request.use(url => {
        return url;
    }, err => {
        console.log(err);
    })

    //响应拦截
    instance1.interceptors.response.use(res => {
        return res.data;
    }, err => {
        console.log(err);
    })

    return instance1.get(url);
}

export function post(url, data) {
    const instance1 = axios.create({
        baseURL: urls.baseUrl,
        timeout: 5000,
        method: 'post',
    })

    return instance1.post(url, data);
}

export function put(url, data) {
    const instance1 = axios.create({
        baseURL: urls.baseUrl,
        timeout: 5000,
        method: 'put',
        headers: { 'authorization': 'b412485f-d794-4fa2-89f5-c1d9b25d5994' }
    })

    return instance1.put(url, data);
}