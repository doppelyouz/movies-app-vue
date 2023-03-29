<template>
  <div>
    <Topbar />
    <Loading v-if="isLoading" />
    <div class="profile" v-if="currentUser">
      <Loading v-if="isLoading" />
      <div class="profile__data" v-if="currentUser">
        <div class="profile__bio">
          <div class="profile__avatar">
            <img :src="currentUser?.avatar" />
          </div>
          <div class="profile__personalData">
            <div class="profile__name">
              <div>Username:</div>
              <h2>{{ currentUser?.username }}</h2>
            </div>
            <div class="profile__email">
              <div>Email:</div>
              <h2>{{ currentUser?.email }}</h2>
            </div>
            <div class="profile__cash">
              <div>Cash:</div>
              <h2>{{ currentUser?.cash }}</h2>
            </div>
          </div>
          <div class="profile__settings">
            <div class="profile__settings-block">
              <router-link :to="{ name: 'settings' }"
                ><my-button>Settings</my-button></router-link
              >
              <my-button @click="logOut">Log out</my-button>
            </div>

            <router-link :to="{ name: 'payment' }"
              ><my-button>Top up balance</my-button></router-link
            >
          </div>
        </div>
      </div>
      <div class="tickets" v-if="items?.length > 0">
        <Movie
          v-for="ticket in items"
          :key="Date.now() + ticket"
          :movie="ticket"
          :buy="false"
        />
      </div>
      <Paginate
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        v-if="items?.length > 0"
      />
    </div>
  </div>
</template>
<script>
import Topbar from "@/components/Topbar";
import Paginate from "vuejs-paginate-next";
import paginationMixin from "@/mixins/pagination.mixin";
import _ from "lodash";
import { mapState } from "vuex";
import Movie from "@/components/Movie.vue";
import Loading from "../components/Loading.vue";

export default {
  name: "AppProfile",
  components: {
    Topbar,
    Paginate,
    Movie,
    Loading,
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
      isLoading: (state) => state.auth.isLoading,
      currentUser: (state) => state.auth.currentUser,
      movies: (state) => state.movies.data,
    }),
    tickets() {
      let tickets = [];
      this.movies?.forEach((movie) => {
        this.currentUser.tickets?.forEach((userTicket) => {
          if (userTicket === movie.id) {
            tickets.push(movie);
          }
        });
      });

      return tickets;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push({ name: "home" });
    },
    pageChangeHandler(page) {
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
  },
  mounted() {
    this.$store.dispatch("getMovies").then(() => {
      this.allItems = _.chunk(this.tickets, this.pageSize);
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    });
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
        min-width: 300px;
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
        .profile__cash {
          display: flex;
          gap: 20px;
          align-items: center;
        }
      }
      .profile__settings {
        display: flex;
        gap: 20px;
        flex-direction: column;
        align-items: center;
        .profile__settings-block {
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