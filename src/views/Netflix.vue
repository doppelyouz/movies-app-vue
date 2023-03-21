<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading" />
    <ErrorMessage v-if="error" />
    <div v-if="movies" class="movies">
      <Movie v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </div>
  </div>
</template>
<script>
import Topbar from "../components/Topbar.vue";
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Movie from '../components/Movie.vue';

export default {
  name: "AppNetflix",
  components: {
    Topbar,
    Loading,
    ErrorMessage,
    Movie
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
      movies: (state) => state.movies.data,
      error: (state) => state.movies.error,
    })
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      this.$store.dispatch("getMovies");
    }
  },
};
</script>
<style lang="scss" scoped>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding: 35px;
}
</style>