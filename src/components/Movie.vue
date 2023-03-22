<template>
  <div class="movie">
    <router-link :to="{name: 'movie', params: {id: movie?.id}}">
      <div class="movie__image">
        <img :src="movie?.image" />
      </div>
    </router-link>
    <div class="movie__name">
      {{ movie?.name }}
    </div>
    <div class="movie__rating">
      <star-rating
          v-bind:max-rating="10"
          inactive-color="white"
          active-color="yellow"
          v-bind:star-size="15"
          :read-only="true"
          :rating="movie?.rating"
          class="rating"
          :increment="0.1"
        />
    </div>
    <template v-if="currentUser">
    <form class="movie__buyOrSellTicket" @submit.prevent="onBuy" v-if="buy">
      <my-button :disabled="isSubmitting" v-if="buy">Buy ticket</my-button>
    </form>
    <form class="movie__buyOrSellTicket" @submit.prevent="onSell" v-else>
      <my-button :disabled="isSubmitting">Sell ticket</my-button>
    </form>
    </template>
  </div>
</template>
<script>
  import {
    mapState
  } from "vuex";
import StarRating from "vue-star-rating";
  export default {
    name: "AppMovie",
    props: {
      movie: {
        type: Object,
        required: true,
      },
      buy: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    components: {
      StarRating
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.auth.currentUser,
      }),
      isSubmitting() {
        return this.$store.state.auth.isSubmitting;
      },
    },
    methods: {
      onBuy() {
        this.$store.dispatch("changeUser", {
          ...this.currentUser,
          tickets: [...this.currentUser?.tickets, this.movie.id],
        });
      },
      onSell() {
        const tickets = this.currentUser.tickets.filter(ticket => ticket !== this.movie?.id)
        this.$store.dispatch("changeUser", {
          ...this.currentUser,
          tickets
        });
        this.$router.push({
          name: "home"
        })
      },
    },
  };
</script>
<style lang="scss" scoped>
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
      top: 60%;
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
      top: 70%;
      opacity: 0;
      transition: 0.5s all;
      color: white;
    }

    .movie__buyOrSellTicket {
      font-weight: 500;
      font-size: 20px;
      line-height: 125%;
      position: absolute;
      top: 85%;
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
          background: linear-gradient(to bottom,
              rgba(221, 220, 219, 1) 0%,
              rgba(209, 208, 206, 1) 100%);
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
          -webkit-clip-path: polygon(50% 0%,
              66% 27%,
              98% 35%,
              76% 57%,
              79% 91%,
              50% 78%,
              21% 91%,
              24% 57%,
              2% 35%,
              32% 27%);
          clip-path: polygon(50% 0%,
              66% 27%,
              98% 35%,
              76% 57%,
              79% 91%,
              50% 78%,
              21% 91%,
              24% 57%,
              2% 35%,
              32% 27%);
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

      .movie__buyOrSellTicket {
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
</style>