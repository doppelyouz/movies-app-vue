import authApi from "@/api/auth";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: JSON.parse(localStorage.getItem("user" ) || 'null'),
    users: null
  };
  
const mutations = {
    registerStart(state) {
      state.isSubmitting = true;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
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
    },
    getCurrentUserFailure(state) {
      state.isLoading = false;
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
      state.currentUser = null;
      state.users = null;
    },
  };
  
  const actions = {
    register(context, credentials) {
        context.commit("registerStart");
        authApi
          .register(credentials)
          .then((response) => {
            context.commit("registerSuccess", response.data);
          })
          .catch(() => {
            context.commit("registerFailure");
          });
    },
    login(context, credentials) {
        context.commit("loginStart");
        const user = state.users.find(user => ((user.email == credentials.email) && (user.password == credentials.password)))
        if(user) {
            context.commit("loginSuccess", user);
            localStorage.setItem("user",JSON.stringify(user));
        } else {
          context.commit("loginFailure");
        }
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
        .getUsers()
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
  };