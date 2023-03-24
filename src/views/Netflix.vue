<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading" />
    <ErrorMessage v-else-if="error" />
    <div v-else class="movies">
      <Movie v-for="movie in items" :key="movie.id" :movie="movie" />
    </div>
      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
      />
  </div>
</template>
<script>
import Topbar from "../components/Topbar.vue";
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";
import Movie from "../components/Movie.vue";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "AppNetflix",
  components: {
    Topbar,
    Loading,
    ErrorMessage,
    Movie,
    Paginate,
  },
  mixins: [paginationMixin],
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
      movies: (state) => state.movies.data,
      error: (state) => state.movies.error,
    }),
  },
  mounted() {
    this.$store.dispatch("getMovies").then(data => {
      this.setupPagination(data)
    })    
  }
}
</script>
<style lang="scss" scoped>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding: 35px;
}
  .pagination {
    display: flex;
    gap: 30px;
    padding: 15px;
    align-items: center;
    justify-content: center;
  }
</style>