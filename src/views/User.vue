<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading"/>
    <div class="profile" v-if="user">
      <Loading v-if="isLoading" />
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
        </div>
      </div>
      <div class="tickets" v-if="items?.length > 0">
        <Movie
          v-for="ticket in items"
          :key='Date.now()+ticket'
          :movie="ticket"
          :buy="false"
          :userPage="true"
        />
      </div>
      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        v-if="this.tickets?.length > 0"
      />
    </div>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar";
import { mapState } from "vuex";
import Movie from "@/components/Movie.vue";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixins/pagination.mixin";
import _ from "lodash";
import Loading from '../components/Loading.vue';

export default {
  name: "AppUser",
  components: {
    Topbar,
    Movie,
    Paginate,
    Loading
  },
  mixins: [paginationMixin],
  data() {
    return {
      page: 1,
      pageSize: 3,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.users.isLoading,
      user: (state) => state.users.user,
      movies: (state) => state.movies.data,
    }),
    tickets() {
      let tickets = [];
      this.movies?.forEach((movie) => {
        this.user?.tickets?.forEach((userTicket) => {
          if (userTicket === movie?.id) {
            tickets.push(movie);
          }
        });
      });

      return tickets;
    },
  },
  watch: {
    tickets() {
      this.allItems = _.chunk(this.tickets, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    }
  },
  methods: {
    fetchUser() {
      this.$store.dispatch("getUser", this.$route.params.id);
    },
    pageChangeHandler(page) {
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
  },
  mounted() {
    this.fetchUser();
    this.$store.dispatch("getMovies");
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
  .pagination {
    display: flex;
    gap: 30px;
    padding: 15px;
    align-items: center;
    justify-content: center;
  }
}
</style>