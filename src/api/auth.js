import axios from './axios';

const register = credentials => {
    return axios.post('/users', credentials)
}

const getUsers = () => {
    return axios.get('/users');
}

export default {
    register,
    getUsers
};