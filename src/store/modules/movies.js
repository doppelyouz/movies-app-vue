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
    getMovies(context, apiUrl) {
        context.commit(mutations.getMoviesStart);
        moviesApi.getMovies(apiUrl)
            .then((response) => {
                context.commit(mutations.getMoviesSuccess, response.data);
            })
            .catch(() => {
                context.commit(mutations.getMoviesFailure);
            });
    }
};
export default {
    state,
    mutations,
    actions
};