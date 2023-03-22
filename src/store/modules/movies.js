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

    
    leaveСommentStart(state) {
        state.isLoading = true;
    },
    leaveСommentSuccess(state, payload) {
        state.isLoading = false;
        state.movie = payload;
    },
    leaveСommentFailure(state) {
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
        moviesApi.getMovieById(id)
            .then((response) => {
                context.commit('getMovieByIdSuccess', response.data);
            })
            .catch(() => {
                context.commit('getMovieByIdFailure');
            });
    },
    leaveСomment(context, movie) {
        context.commit('leaveСommentStart');
        moviesApi.leaveСomment(movie)
            .then(() => {
                context.commit('leaveСommentSuccess', movie);
            })
            .catch(() => {
                context.commit('leaveСommentFailure');
            });
    },
};
export default {
    state,
    mutations,
    actions
};