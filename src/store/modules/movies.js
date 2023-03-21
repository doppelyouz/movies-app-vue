import moviesApi from "@/api/movies";

const state = {
    data: null,
    isLoading: false,
    errors: null
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
};
export default {
    state,
    mutations,
    actions
};