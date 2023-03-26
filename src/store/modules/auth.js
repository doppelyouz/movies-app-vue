import authApi from "@/api/auth";
import usersApi from "@/api/user";

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: JSON.parse(localStorage.getItem("user" ) || 'null')
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

    changeUserStart(state) {
      state.isLoading = true;
    },
    changeUserSuccess(state, payload) {
      state.isLoading = false;
      state.currentUser = payload;
      localStorage.setItem("user", JSON.stringify(payload));
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
    async login(context, credentials) {
        context.commit("loginStart");
        const {data} = await usersApi.getUsers();
        const user = data.find(user => ((user.email == credentials.email) && (user.password == credentials.password)))
        if(user) {
            context.commit("loginSuccess", user);
            localStorage.setItem("user",JSON.stringify(user));
        } else {
          context.commit("loginFailure");
        }
    },
    changeUser(context, newUser) {
      context.commit("changeUserStart");
      authApi
          .changeUser(newUser)
          .then(() => {
            context.commit("changeUserSuccess", newUser);
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