import moviesApi from "@/api/movies";

const state = {
    data: null,
    isLoading: false,
    errors: null,
    movie: null
}

const mutations = {
    getMoviesStart(state) {
        state.isLoading = true;
        state.data = null;
    },
    getMoviesSuccess(state, payload) {
        state.isLoading = false;
        state.data = payload;
    },
    getMoviesFailure(state) {
        state.isLoading = false;
    },

    
    getMovieByIdStart(state) {
        state.isLoading = true;
        state.movie = null;
    },
    getMovieByIdSuccess(state, payload) {
        state.isLoading = false;
        state.movie = payload;
    },
    getMovieByIdFailure(state) {
        state.isLoading = false;
    },

    
    changeMovieStart(state) {
        state.isLoading = true;
    },
    changeMovieSuccess(state, payload) {
        state.isLoading = false;
        state.movie = payload;
    },
    changeMovieFailure(state) {
        state.isLoading = false;
    },

    createMovieStart(state) {
        state.isLoading = true;
    },
    createMovieSuccess(state) {
        state.isLoading = false;
    },
    createMovieFailure(state) {
        state.isLoading = false;
    }
};

const actions = {
    getMovies(context) {
        context.commit('getMoviesStart');
        moviesApi.getMovies()
            .then((response) => {
                context.commit('getMoviesSuccess', response.data);
            })
            .catch(() => {
                context.commit('getMoviesFailure');
            });
    },
    getMovieById(context, id) {
        context.commit('getMovieByIdStart');
        moviesApi.getMovieById(Number(id))
            .then((response) => {
                context.commit('getMovieByIdSuccess', response.data);
            })
            .catch(() => {
                context.commit('getMovieByIdFailure');
            });
    },
    changeMovie(context, movie) {
        context.commit('changeMovieStart');
        moviesApi.changeMovie(movie)
            .then(() => {
                context.commit('changeMovieSuccess', movie);
            })
            .catch(() => {
                context.commit('changeMovieFailure');
            });
    },
    createMovie(context, movie) {
        context.commit('createMovieStart');
        moviesApi.createMovie(movie)
            .then(() => {
                context.commit('createMovieSuccess');
            })
            .catch(() => {
                context.commit('createMovieFailure');
            });
    },
};
export default {
    state,
    mutations,
    actions
};