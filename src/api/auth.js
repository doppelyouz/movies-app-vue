import axios from './axios';

const register = credentials => {
    return axios.post('/users', credentials)
}

const login = credentials => {
    return axios.post('/users/login', credentials)
}

const getUsers = () => {
    return axios.get('/users');
}

const getCurrentUser = () => {
    return axios.get('/user')
}

export default {
    register,
    login,
    getCurrentUser,
    getUsers
};