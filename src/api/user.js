import axios from './axios';

const getUsers = () => {
    return axios.get('/users');
}

const getUser = (id) => {
    return axios.get(`/users/${id}`);
}

export default {
    getUsers,
    getUser
};