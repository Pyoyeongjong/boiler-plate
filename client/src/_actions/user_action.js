import axios from 'axios';
import {
    AUTH_USER,
    LOGIN_USER, REGISTER_USER
} from './types';

export function loginUser(dataTosubmit) {
    
    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response => response.data)

    //reducer로 넘겨주기
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    
    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response => response.data)

    //reducer로 넘겨주기
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth(dataToSubmit) {

    const request = axios.get('/api/users/auth') //, dataToSubmit) 부분은 post의 body 부분. get에서는 필요 없다.
        .then(response => response.data)

    //reducer로 넘겨주기
    return {
        type: AUTH_USER,
        payload: request
    }
}