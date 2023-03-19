import axios from "./axios";

const getMovies = () => {
    return axios.get('/movies');
}

export default {
    getMovies
};