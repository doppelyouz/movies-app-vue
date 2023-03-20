<template>
    <div class="settingsPage">
      <Topbar />
      <form class="settings" @submit.prevent="onSubmit">
        <div class="settings__group">
          <div class="settings__title">Email:</div>
          <my-input v-model="email"></my-input>
        </div>
        <div class="settings__group">
          <div class="settings__title">Username:</div>
          <my-input v-model="username"></my-input>
        </div>
        <div class="settings__group">
          <div class="settings__title">Avatar:</div>
          <my-input v-model="avatar"></my-input>
        </div>
        <div class="setting">
            <my-button class="save" @click="onSubmit">Save changes</my-button>
        </div>
        <div class="setting">
          <router-link :to="{ name: 'profile' }">
            <my-button class="back">Back</my-button>
          </router-link>
        </div>
        <div class="setting">
            <my-button @click="logOut">Log out</my-button>
        </div>
      </form>
    </div>
  </template>
  <script>
  import { mapState } from "vuex";
  import Topbar from "@/components/Topbar.vue";
  
  export default {
    name: "AppSettings",
    components: {
      Topbar,
    },
    data() {
      return {
        email: '',
        username: '',
        avatar: ''
      };
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.auth.currentUser,
      }),
    },
    mounted() {
      this.email = this.currentUser.email;
      this.username = this.currentUser.username;
      this.avatar = this.currentUser.avatar;
    },
    methods: {
      onSubmit() {
          this.$store.dispatch("changeUser", {
              ...this.currentUser,
              email: this.email,
              username: this.username,
              avatar: this.avatar,
          });
        },
      logOut() {
        
        this.$store.dispatch("logOut");
        this.$router.push({name:'home'});
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .settings {
    margin: 0 auto;
    max-width: 600px;
    background: rgb(104, 86, 86);
    padding: 35px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .settings__group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .settings__title {
        font-size: 20px;
        color: white;
      }
    }
    .setting {
      display: flex;
      justify-content: end;
    }
  }
  </style>