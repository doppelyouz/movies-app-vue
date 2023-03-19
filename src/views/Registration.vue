<template>
    <div class="registerPage">
        <Topbar />
        <div class="register">
            <form class="registerForm" @submit.prevent="onSubmit">
                <h1 class="registerForm__title">Register</h1>
                <div class="registerForm__inputBlock">
                    <my-input v-model="username">Username: </my-input>
                </div>
                <div class="registerForm__inputBlock">
                    <my-input v-model="email">Email: </my-input>
                </div>
                <div class="registerForm__inputBlock">
                    <my-input :type="'password'" v-model="password">Password: </my-input>
                </div>
                <div class="registerForm__inputBlock">
                    <my-input :type="'password'" v-model="confirm">Confirm Password: </my-input>
                </div>
                <my-button :disabled="isSubmitting">Зарегистрироваться</my-button>
                <div class="haveAcc"><router-link :to="{name: 'login'}">Do you have an account?</router-link></div>
            </form>
        </div>
    </div>
</template>
<script>
import Topbar from '@/components/Topbar';

export default {
    name: 'AppRegistration',
    components: {
        Topbar
    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirm: ''
        }
    },
    computed: {
        isSubmitting() {
            return this.$store.state.auth.isSubmitting
        }
    },
    methods: {
        onSubmit() {
            console.log('start');
            if(this.confirm == this.password) {
                const user = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    avatar: "https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png"
                };

                this.$store.dispatch('register', user)

                this.username = '';
                this.password = '';
                this.confirm = '';
                this.email = '';

                this.$router.push({name: 'login'})
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.registerPage {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .register {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        padding: 30px 100px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        border-radius: 30px;

        .registerForm {
            display: flex;
            flex-direction: column;
            gap: 30px;
            justify-content: start;

            .registerForm__title {
                font-size: 38px;
                font-weight: 500;
                margin-bottom: 25px;
                color: whitesmoke;
            }
            .haveAcc {
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
            }
            .registerForm__inputBlock {
                display: flex;
                flex-direction: column;
                gap: 10px;

                .registerForm__inputBlock-title {
                    font-weight: 500;
                    font-size: 18px;
                    color: rgb(80, 22, 22);
                }

                .registerForm__input {
                    border-radius: 10px;
                    padding: 1rem;
                    border: 1px solid rgb(139, 56, 56);
                }
            }
        }
    }
}
</style>