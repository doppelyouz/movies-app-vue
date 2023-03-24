import axios from "./axios";

const getMovies = () => {
    return axios.get('/movies');
}

const getMovieById = (id) => {
    return axios.get(`/movies/${id}`);
}

const changeMovie = (movie) => {
    return axios.put(`/movies/${movie.id}`, movie);
}

const createMovie = (movie) => {
    return axios.post(`/movies`, movie);
}

const deleteMovie = (id) => {
    return axios.delete(`/movies/${id}`);
}

export default {
    getMovies,
    getMovieById,
    changeMovie,
    createMovie,
    deleteMovie
};