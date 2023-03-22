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

export default {
    getMovies,
    getMovieById,
    changeMovie
};