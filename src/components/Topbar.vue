<template>
  <div class="topbar">
    <ul class="topbar__menu">
      <li class="topbar__logo"><img :src="logo" alt="logo" /></li>
      <li><router-link :to="{ name: 'home' }">Movies</router-link></li>
      <li v-if="currentUser">
        <router-link :to="{ name: 'add' }">
          Add Movie
        </router-link> 
      </li>
    </ul>
    <template v-if="currentUser">
      <router-link :to="{ name: 'profile' }" class="topbar__profile">
        <div class="topbar__profile-logo">
          <img :src="currentUser.avatar" alt="" />
        </div>
        <div class="topbar__profile-username">
          {{ currentUser.username }}
        </div>
      </router-link>
    </template>
    <template v-else>
      <div class="register__button">
        <router-link :to="{ name: 'login' }">
          <my-button>Sign In</my-button>
        </router-link>
      </div>
    </template>
  </div>
</template>
<script>
import logo from "../assets/netflix.png";
import { mapState } from "vuex";

export default {
  name: "AppTopbar",
  data() {
    return {
      logo,
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      isLoggedIn: (state) => state.auth.isLoggedIn,
      isAnonymous: (state) => state.auth.isAnonymous,
    }),
  },
};
</script>
<style lang="scss" scoped>
.topbar {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.616);
  margin-bottom: 45px;

  .topbar__menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: white;
    .topbar__logo {
      width: 200px;
      min-height: 50px;
      margin-right: 25px;
      img {
        width: 100%;
      }
    }
  }
  .topbar__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    .topbar__profile-logo {
      height: 50px;
      width: 50px;
      img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .topbar__profile-username {
      color: white;
      font-size: 20px;
    }
  }
  .register__button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
}
</style>