import axios from './axios';

const register = credentials => {
    return axios.post('/users', credentials)
}

const getUsers = () => {
    return axios.get('/users');
}

const changeUser = (data) => {
    return axios.put(`/users/${data.id}`, data);
}

const getUser = (id) => {
    return axios.get(`/users/${id}`);
}

export default {
    register,
    getUsers,
    getUser,
    changeUser
};