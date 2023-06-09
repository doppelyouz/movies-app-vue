<template>
  <div class="movie">
    <router-link :to="{ name: 'movie', params: { id: movie?.id } }">
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
        :rating="ratingCount"
        class="rating"
        :increment="0.1"
      />
    </div>
    <div class="movie__price">
      {{ movie?.price }}
    </div>
    <template v-if="currentUser">
      <template v-if="!userPage || currentUser?.id === user?.id">
        <form class="movie__buyOrSellTicket" @submit.prevent="onBuy" v-if="buy">
          <my-button :disabled="isSubmitting" v-if="buy">Buy ticket</my-button>
        </form>
        <form class="movie__buyOrSellTicket" @submit.prevent="onSell" v-else>
          <my-button :disabled="isSubmitting">Sell ticket</my-button>
        </form>
      </template>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
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
      default: true,
    },
    userPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    StarRating,
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.auth.currentUser,
      user: (state) => state.users.user,
    }),
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    ratingCount() {
      if (this.movie?.rating?.length <= 0) {
        return 0;
      }
      const avg = Array.from(this.movie?.rating).reduce(
        (accumulator, currentValue) => Number(accumulator + currentValue),
        0
      );
      return Number((avg / this.movie?.rating?.length).toFixed(1));
    },
  },
  methods: {
    onBuy() {
      if (this.currentUser?.cash >= this.movie?.price) {
        this.$store.dispatch("changeUser", {
          ...this.currentUser,
          tickets: [...this.currentUser?.tickets, this.movie?.id],
          cash: this.currentUser?.cash - this.movie?.price,
        });
      }
    },
    onSell() {
      let tickets = [...this.currentUser?.tickets];
      const id = tickets.findIndex((ticket) => ticket === this.movie?.id);
      tickets.splice(id, 1);

      this.$store.dispatch("changeUser", {
        ...this.currentUser,
        tickets,
        cash: this.currentUser?.cash + this.movie?.price,
      });
      this.$router.push({
        name: "home",
      });
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
  .movie__price {
    position: absolute;
    top: 30%;
    opacity: 0;
    font-weight: 600;
    font-size: 40px;
    line-height: 125%;
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

    .movie__price {
      opacity: 1;
    }

    .movie__buyOrSellTicket {
      opacity: 1;
    }
  }

  .movie__image {
    max-width: 100%;
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