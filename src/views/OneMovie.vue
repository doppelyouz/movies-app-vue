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
        <h1 class="movie__name" v-if="isEditing">
          New Name:
          <my-input v-model="newName"/>
        </h1>
        <h1 class="movie__name" v-else>
          {{ movie?.name }}
        </h1>
        <p class="movie__desc" v-if="isEditing">
          New Description:
          <my-input v-model="newDesc"/>
        </p>
        <p class="movie__desc" v-else>
          {{ movie?.description }}
        </p>
        <div class="movie__image-edit" v-if="isEditing">
            New Image:
            <my-input v-model="newImage"/>
        </div>
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
        <template v-if="currentUser">
          <template v-if="movie?.userId === currentUser?.id">
            <div class="movie__settings">
              <form @submit.prevent="onDelete">
                <my-button>Удалить</my-button>
              </form>
              <my-button @click="edit" v-if="!isEditing">Редактировать</my-button>
              <form @submit.prevent="onEdit" v-else>
                <my-button>Применить</my-button>
              </form>
            </div>
          </template>
        </template>
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
        rating: 0,
        isEditing: false,
        newName: '',
        newDesc: '',
        newImage: ''
      };
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.movies.isLoading,
        error: (state) => state.movies.error,
        movie: (state) => state.movies.movie,
        currentUser: (state) => state.auth.currentUser
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
      },
      onDelete() { 
        this.$store.dispatch("deleteMovie", this.movie?.id);
        this.$router.push({name: 'home'});
      },
      onEdit() {
          this.newName = this.newName === '' ? this.movie?.name : this.newName; 
          this.newDesc = this.newDesc === '' ? this.movie?.description : this.newDesc; 
          this.newImage = this.newImage === '' ? this.movie?.image : this.newImage; 
          this.$store.dispatch("changeMovie", {
              ...this.movie,
              name: this.newName,
              description: this.newDesc,
              image: this.newImage
          })

        this.isEditing = !this.isEditing;
      },
      edit() {
        this.isEditing = !this.isEditing;
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
    .movie__image-edit {
      color: white;
      font-size: 20px;
    }

    .movie__info {
      display: flex;
      flex-direction: column;
      gap: 30px;
      
      .movie__settings {
        display: flex;
        gap: 20px;
      }

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
        flex-direction: column;
        align-items: start;
        gap: 20px;
      }
    .movie__comments {
      .comment__title {
        font-size: 24px;
        color: rgb(255, 255, 255);
      }
      .writeComment {
        margin-bottom: 25px;
      }

      .comments {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 25px;

        .comment {
            display: flex;
            flex-direction: column;
            gap: 40px;
            box-shadow: 0 0 5px rgba(0,0,0,0.5);
            padding: 20px;

          .comment__desc {
            color: grey;
            word-break: break-all;
          }

          .comment__author {
            display: flex;
            gap: 20px;

            .comment__author-avatar {
              height: 50px;
              width: 50px;

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