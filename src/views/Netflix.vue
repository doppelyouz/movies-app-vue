<template>
  <div>
    <Topbar />
    <div class="wrapper">
    <div class="search">
      <h1 class="search__title">Search: </h1>
      <my-input type="search" v-model="search"/>
    </div>
    <Loading v-if="isLoading" />
    <div v-else class="movies">
      <Movie v-for="movie in items" :key="movie.id" :movie="movie" />
    </div>
      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'pagination-item'"
        v-if="items"
      />
    </div>
  </div>
</template>
<script>
import Topbar from "../components/Topbar.vue";
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";
import Movie from "../components/Movie.vue";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixins/pagination.mixin";

export default {
  name: "AppNetflix",
  components: {
    Topbar,
    Loading,
    Movie,
    Paginate,
  },
  mixins: [paginationMixin],
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
      movies: (state) => state.movies.data,
    }),
    searchHandler() {
      return this.movies?.filter(movie => {
        return movie?.name?.includes(this.search)
      })
    }
  },
  watch: {
    searchHandler() {
      this.setupPagination(this.searchHandler)
    }
  },
  mounted() {
    this.$store.dispatch("getMovies").then(data => {
      this.setupPagination(data)
    })    
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 25px;
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 50px;
}
  .pagination {
    display: flex;
    gap: 30px;
    padding: 15px;
    align-items: center;
    justify-content: center;
    .pagination-item {
      padding: 15px;
    }
  }
  .search {
    display: flex;
    align-items: start;
    justify-content: end;
    gap: 20px;
    .search__title {
      color: rgb(173, 123, 123);
      font-size: 25px;
      font-weight: 400;
    }
  }
}
</style>