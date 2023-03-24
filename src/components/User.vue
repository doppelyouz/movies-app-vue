<template>
  <div class="profile">
    <Loading v-if="isLoadingAuth" />
    <ErrorMessage v-if="errorAuth" />
    <Loading v-if="isLoadingMovies" />
    <ErrorMessage v-if="errorMovies" />
    <div class="profile__data" v-if="user">
      <div class="profile__bio">
        <div class="profile__avatar">
          <img :src="user?.avatar" />
        </div>
        <div class="profile__personalData">
          <div class="profile__name">
            <div>Username:</div>
            <h2>{{ user?.username }}</h2>
          </div>
          <div class="profile__email">
            <div>Email:</div>
            <h2 class="profile__email">{{ user?.email }}</h2>
          </div>
        </div>
        <div class="profile__settings" v-if="currentUser?.id === user?.id">
          <router-link :to="{ name: 'settings' }"
            ><my-button>Settings</my-button></router-link
          >
          <my-button @click="logOut">Log out</my-button>
        </div>
      </div>
    </div>
    <div class="tickets" v-if="yourTickets.length > 0 ">
      <Movie v-for="ticket in yourTickets" :key="ticket.id" :movie="ticket" :buy="false" :userPage="true" />
    </div>
  </div>
</template>
  <script>
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Movie from "@/components/Movie.vue";

export default {
  name: "AppUser",
  props: {
    id: {
      type: Number,
      required: true,
    }
  },
  components: {
    Loading,
    ErrorMessage,
    Movie
  },
  computed: {
    ...mapState({
      isLoadingAuth: (state) => state.auth.isLoading,
      errorAuth: (state) => state.auth.error,
      isLoadingMovies: (state) => state.movies.isLoading,
      errorMovies: (state) => state.movies.error,
      user: (state) => state.auth.user,
      currentUser: (state) => state.auth.currentUser,
      movies: (state) => state.movies.data,
    }),
    yourTickets() {
      let tickets = [];
      this.movies?.forEach((movie) => {
        this.user?.tickets?.forEach((userTicket) => {
          if (userTicket === movie.id) {
            tickets.push(movie);
          }
        });
      });
      return tickets;
    },
  },
  mounted() {
    this.fetchUser();
    this.fetchMovies();
  },
  methods: {
    fetchUser() {
      this.$store.dispatch("getUser", this.id);
    },
    fetchMovies() {
      this.$store.dispatch("getMovies");
    },
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push({ name: "home" });
    },
  },
};
</script>
  <style lang="scss" scoped>
.profile {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  background: rgb(104, 86, 86);
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  padding: 40px;
  .profile__data {
    .profile__bio {
      display: flex;
      align-items: start;
      gap: 20px;
      margin-bottom: 55px;
      .profile__avatar {
        height: 300px;
        width: 300px;
        img {
          border-radius: 20px;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      .profile__personalData {
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 40%;
        gap: 20px;
        align-self: start;
        color: rgb(202, 201, 201);
        font-size: 25px;
        font-weight: 600;
        .profile__name {
          display: flex;
          gap: 20px;
        }
        .profile__email {
          display: flex;
          gap: 20px;
        }
      }
      .profile__settings {
        display: flex;
        gap: 20px;
      }
    }
  }
  .tickets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 40px;
    border-radius: 25px;
    padding: 35px;
    background: rgb(70, 50, 50);
  }
}
</style>