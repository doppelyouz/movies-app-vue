<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading" />
    <ErrorMessage v-if="error" />
    <div v-if="movie" class="movie">
      <div class="movie__image">
        <img :src="movie?.image" />
      </div>
      <div class="movie__info">
        <h1 class="movie__name">
          {{ movie?.name }}
        </h1>
        <p class="movie__desc">
          {{ movie?.description }}
        </p>
        <form @submit.prevent="onRating" class="onRating">
            <star-rating @update:rating="setRating" v-bind:max-rating="10" inactive-color="white" active-color="yellow" v-bind:star-size="50" :rating="movie?.rating" class="rating" :increment="0.1" />
            <my-button v-if="currentUser">Сохранить</my-button>
          </form>
        <div class="movie__comments">
          <div class="comments" v-if="movie?.comments">
            <div v-for="comment in movie?.comments" class="comment" :key="comment">
              <router-link :to="{name: 'user', params: {id: comment?.user?.id }}">
                <div class="comment__author">
                  <div class="comment__author-avatar">
                    <img :src="comment?.user.avatar" />
                  </div>
                  <div class="comment__author-username">
                    <h2>
                      {{ comment?.user?.username }}
                    </h2>
                  </div>
                </div>
              </router-link>
              <div class="comment__desc">
                {{ comment?.description }}
              </div>
            </div>
          </div>
          <template v-if="currentUser">
            <form @submit.prevent="onComment" class="writeComment">
              <h1 class="comment__title">Оставить комментарий</h1>
              <my-input v-model="comment"></my-input>
              <my-button>Отправить</my-button>
            </form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Topbar from "@/components/Topbar.vue";
  import ErrorMessage from "@/components/ErrorMessage.vue";
  import Loading from "@/components/Loading.vue";
  import {
    mapState
  } from "vuex";
  import StarRating from "vue-star-rating";

  export default {
    name: "AppOneMovie",
    components: {
      Topbar,
      ErrorMessage,
      Loading,
      StarRating,
    },
    data() {
      return {
        comment: "",
        rating: 0
      };
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.movies.isLoading,
        error: (state) => state.movies.error,
        movie: (state) => state.movies.movie,
        currentUser: (state) => state.auth.currentUser,
      }),
    },
    methods: {
      fetchMovie() {
        this.$store.dispatch("getMovieById", this.$route.params.id);
      },
      onComment() {
        if (this.comment.length > 0) {
          this.$store.dispatch("changeMovie", {
            ...this.movie,
            comments: [
              ...this.movie?.comments,
              {
                user: {
                  id: this.currentUser?.id,
                  username: this.currentUser?.username,
                  avatar: this.currentUser?.avatar,
                },
                description: this.comment,
              },
            ],
          });
          this.comment = "";
        }
      },
      setRating(rating){
        this.rating = rating;
      },
      onRating() {
        if(this.rating > 0) {
          this.$store.dispatch("changeMovie", {
            ...this.movie,
            rating: this.movie?.rating === 0 ? Number(this.rating) : Number(((this.movie?.rating + this.rating) / 2).toFixed(1))
          });
          this.rating = 0;
        }
      }
    },
    mounted() {
      this.fetchMovie();
    },
  };
</script>
<style lang="scss" scoped>
  .movie {
    display: flex;
    gap: 100px;
    padding: 25px 100px;
    width: 100%;

    .movie__image {
      max-width: 500px;
      height: 700px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 25px;
      }
    }

    .movie__info {
      display: flex;
      flex-direction: column;
      gap: 30px;

      .movie__name {
        font-size: 50px;
        color: white;
        font-weight: 800;
      }

      .movie__desc {
        max-width: 600px;
        width: 100%;
        font-size: 20px;
        color: grey;
      }

      .rating {
        font-size: 45px;
        color: white;
      }
      .onRating {
        display: flex;
        gap: 20px;
      }
    .movie__comments {
      .comment__title {
        font-size: 24px;
        color: rgb(255, 255, 255);
      }

      .comments {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 25px;

        .comment {
            display: flex;
            gap: 40px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            padding: 20px;

          .comment__desc {
            max-width: 400px;
            width: 100%;
            color: grey;
            word-break: break-all;
          }

          .comment__author {
            display: flex;
            gap: 20px;

            .comment__author-avatar {
              height: 50px;
              max-width: 50px;

              img {
                border-radius: 50%;
                width: 100%;
                height: 100%;
              }
            }

            .comment__author-username {
              color: white;
              font-size: 20px;
            }
          }
        }
      }
    }
    }
  }
</style>