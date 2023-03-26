import axios from './axios';

const register = credentials => {
    return axios.post('/users', credentials)
}

const changeUser = (data) => {
    return axios.put(`/users/${data.id}`, data);
}

export default {
    register,
    changeUser
};