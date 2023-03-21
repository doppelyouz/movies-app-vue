import authApi from "@/api/auth";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: JSON.parse(localStorage.getItem("user" ) || 'null'),
    users: null,
    user: null
  };
  
const mutations = {
    registerStart(state) {
      state.isSubmitting = true;
    },
    registerSuccess(state) {
      state.isSubmitting = false;
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

    getUserStart(state) {
      state.isLoading = true;
    },
    getUserSuccess(state, payload) {
      state.isLoading = false;
      state.user = payload;
    },
    getUserFailure(state) {
      state.isLoading = false;
      state.user = null;
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

    changeUserStart(state) {
      state.isLoading = true;
    },
    changeUserSuccess(state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
    },
    changeUserFailure(state) {
      state.user = null;
      state.isLoading = false;
    },

    logOut(state) {
      state.currentUser = null;
    }
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
    getUser(context, id) {
        context.commit("getUserStart");
        authApi
          .getUser(id)
          .then((response) => {
            context.commit("getUserSuccess", response.data);
          })
          .catch(() => {
            context.commit("getUserFailure");
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
    changeUser(context, newUser) {
      context.commit("changeUserStart");
      authApi
          .changeUser(newUser)
          .then(() => {
            context.commit("changeUserSuccess", newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
          })
          .catch(() => {
            context.commit("changeUserFailure");
          });
    },
    logOut(context) {
        context.commit("logOut");
        localStorage.removeItem('user');
    }
  };
  
  export default {
    state,
    mutations,
    actions,
  };