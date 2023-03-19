<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading" />
    <ErrorMessage v-if="error" />
    <div v-if="movies" class="movies">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <div class="movie__image">
          <img :src="movie.image" />
        </div>
        <div class="movie__name">{{ movie.name }}</div>
        <div class="movie__rating">
          <div className="star-rating">
            <button v-for="button in Math.floor(movie.rating)" :key="button">
              <div className="star">&#9733;</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Topbar from "../components/Topbar.vue";
import { mapState } from "vuex";
import Loading from "../components/Loading.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

export default {
  name: "AppNetflix",
  components: {
    Topbar,
    Loading,
    ErrorMessage,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.movies.isLoading,
      movies: (state) => state.movies.data,
      error: (state) => state.movies.error,
    }),
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      this.$store.dispatch("getMovies");
    },
  },
};
</script>
<style lang="scss" scoped>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 40px;
  padding: 35px;
  .movie {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    user-select: none;
    transition: 0.5s;
    .movie__name {
      position: absolute;
      top: 70%;
      opacity: 0;
      font-weight: 500;
      font-size: 20px;
      line-height: 125%;
      transition: 0.5s all;
      color: white;
    }
    .movie__rating {
      font-weight: 500;
      font-size: 20px;
      line-height: 125%;
      position: absolute;
      top: 80%;
      opacity: 0;
      transition: 0.5s all;
      color: white;
    }
    .star-rating {
      button {
        color: yellow;
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        .star {
          display: inline-block;
          vertical-align: top;
          width: 20px;
          height: 20px;
          background: linear-gradient(
            to bottom,
            rgba(221, 220, 219, 1) 0%,
            rgba(209, 208, 206, 1) 100%
          );
          position: relative;
        }

        .star:before {
          content: "";
          position: absolute;
          top: 1px;
          left: 1px;
          bottom: 1px;
          right: 1px;
          background: yellow;
          z-index: 1;
        }

        .star,
        .star:before {
          -webkit-clip-path: polygon(
            50% 0%,
            66% 27%,
            98% 35%,
            76% 57%,
            79% 91%,
            50% 78%,
            21% 91%,
            24% 57%,
            2% 35%,
            32% 27%
          );
          clip-path: polygon(
            50% 0%,
            66% 27%,
            98% 35%,
            76% 57%,
            79% 91%,
            50% 78%,
            21% 91%,
            24% 57%,
            2% 35%,
            32% 27%
          );
        }
      }
    }
    &:hover {
      img {
        transition: 0.2s filter linear;
        filter: blur(10px);
      }
      .movie__name {
        opacity: 1;
      }
      .movie__rating {
        opacity: 1;
      }
    }
    .movie__image {
      max-width: 400px;
      height: 500px;
      img {
        pointer-events: none;
        border-radius: 15px;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>