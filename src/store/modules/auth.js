import authApi from "@/api/auth";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    isLoggedIn: null,
    users: null
  };
  
const mutations = {
    registerStart(state) {
      state.isSubmitting = true;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state) {
      state.isSubmitting = false;
    },
    loginStart(state) {
      state.isSubmitting = true;
    },
    loginSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    loginFailure(state) {
      state.isSubmitting = false;
    },
    getCurrentUserStart(state) {
      state.isLoading = true;
    },
    getCurrentUserSuccess(state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    getCurrentUserFailure(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    getAllUsersStart(state) {
      state.users = null;
      state.isLoading = true;
    },
    getAllUsersSuccess(state, payload) {
      state.isLoading = false;
      state.users = payload;
    },
    getAllUsersFailure(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
      state.users = null;
    },
  };
  
  
  const getters = { 
    currentUser: state => state.currentUser,
    isLoggedIn: state => Boolean(state.isLoggedIn),
    isAnonymous: state => state.isLoggedIn === false
  }
  
  const actions = {
    register(context, credentials) {
      console.log(credentials);
        context.commit("registerStart");
        authApi
          .register(credentials)
          .then((response) => {
            context.commit("registerSuccess", response.data.user);
          })
          .catch(() => {
            context.commit("registerFailure");
          });
    },
    login(context, credentials) {
        context.commit("loginStart");
        authApi
          .login(credentials)
          .then((response) => {
            context.commit("loginSuccess", response.data.user);
          })
          .catch(() => {
            context.commit("loginFailure");
          });
    },
    getCurrentUser(context) {
        context.commit("getCurrentUserStart");
        authApi
          .getCurrentUser()
          .then((response) => {
            context.commit("getCurrentUserSuccess", response.data.user);
          })
          .catch(() => {
            context.commit("getCurrentUserFailure");
          });
    },
    getAllUsers(context) {
      context.commit("getAllUsersStart");
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit("getAllUsersSuccess", response.data);
        })
        .catch(() => {
          context.commit("getAllUsersFailure");
        });
  },
  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  };