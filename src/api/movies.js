import axios from "./axios";

const getMovies = () => {
    return axios.get('/movies');
}

const getMovieById = (id) => {
    return axios.get(`/movies/${id}`);
}

const leaveСomment = (movie) => {
    return axios.put(`/movies/${movie.id}`, movie);
}

export default {
    getMovies,
    getMovieById,
    leaveСomment
};