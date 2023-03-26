import userApi from "@/api/user";

const state = {
    isLoading: false,
    users: null,
    user: null
  };
  
const mutations = {
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
      state.users = null;
    },
  };
  
  const actions = {
    getUser(context, id) {
        context.commit("getUserStart");
        userApi
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
      userApi
          .getUsers()
          .then((response) => {
            context.commit("getAllUsersSuccess", response.data);
          })
          .catch(() => {
            context.commit("getAllUsersFailure");
          });
    }
  };
  
  export default {
    state,
    mutations,
    actions,
  };