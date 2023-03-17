<template>
    <div class="loginPage">
        <Topbar />
        <div class="login"> 
            <form class="loginForm" @submit.prevent="onSubmit">
                <h1 class="loginForm__title">Вход</h1>
                <div class="loginForm__inputBlock">
                    <my-input type="text" v-model="email">Email: </my-input>
                </div>
                <div class="loginForm__inputBlock">
                    <my-input type="password" v-model="password">Password: </my-input>
                </div>
                <my-button :disabled="isSubmitting">Войти</my-button>
                <div class="forgot"><router-link :to="{name: 'registration'}">Did you forget your password?</router-link></div>
            </form>
        </div>
    </div>
</template>
<script>
  import Topbar from '@/components/Topbar.vue';
  export default {
    name: 'AppLogin',
    components: {
      Topbar
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting
        }
    },
    methods: {
        onSubmit() {
            this.$store
                .dispatch('login', {
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.password = '';
                    this.email = '';
                    this.$router.push({ name: 'home' });
                });
        },
    }
  };
</script>
<style lang="scss" scoped>
.loginPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        padding: 100px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        border-radius: 30px;
        .loginForm {
            display: flex;
            flex-direction: column;
            gap: 30px;
            justify-content: start;
            .forgot {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            .loginForm__title {
                font-size: 38px;
                font-weight: 500;
                margin-bottom: 25px;
                color:whitesmoke;
            }
            .loginForm__inputBlock {
                display: flex;
                flex-direction: column;
                gap: 10px;
                .loginForm__inputBlock-title {
                    font-weight: 500;
                    font-size: 18px;
                    color: rgb(80, 22, 22);
                }
                .loginForm__input {
                    border-radius: 10px;
                    padding: 1rem;
                    border: 1px solid rgb(139, 56, 56);
                }
            }
        } 
    }
}
</style>