import axios from "./axios";

const getMovies = apiUrl => {
    return axios.get(apiUrl);
}

export default {
    getMovies
};