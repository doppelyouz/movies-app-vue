<template>
    <div>
        <Topbar />
        <div class="add">
            <form class="add__form" @submit.prevent="createMovie">
                <h1 class="add__title">Add movie</h1>
                <div class="add__input-group">
                    <div class="input-group__title">Name:</div>
                    <my-input v-model="name"/>
                </div>
                <div class="add__input-group">
                    <div class="input-group__title">Description:</div>
                    <textarea v-model="description" class="input-group__textarea"/>
                </div>
                <div class="add__input-group">
                    <div class="input-group__title">Image:</div>
                    <my-input v-model="image"/>
                </div>
                <div class="add__input-group">
                    <div class="input-group__title">Price:</div>
                    <my-input v-model="price"/>
                </div>
                <my-button>Добавить</my-button>
            </form>
        </div>
    </div>
</template>
<script>
    import Topbar from '@/components/Topbar';
    import { mapState } from "vuex";

    export default {
        name: 'AppAddMovie',
        components: {
            Topbar
        },
        data() {
            return {
                name: '',
                description: '',
                image: '',
                price: 0
            }
        },  
        computed: {
            ...mapState({
                currentUser: (state) => state.auth.currentUser
            }),
        },
        methods: {
            createMovie() {
                    const movie = {
                        image: this.image,
                        name: this.name,
                        description: this.description,
                        rating: [], 
                        comments: [],
                        userId: this.currentUser.id,
                        price: Number(this.price)
                    };

                    this.$store.dispatch('createMovie', movie)

                    this.description = '';
                    this.name = '';
                    this.image = '';
                    this.price = 0;

                    this.$router.push({name: 'profile'})
        },
        mounted() {
        }
    }
}
</script>
<style lang="scss" scoped>
.add {
    margin: 0 auto;
    max-width: 600px;
    width: 100%;
    background: rgb(82, 63, 63);
    border-radius: 25px;
    padding: 40px;
    box-sizing: border-box;
    .add__form {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 20px;
        .add__title {
            font-size: 40px;
            margin-bottom: 35px;
            color:white;
        }
        .add__input-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            .input-group__title {
                font-size: 20px;
                color: rgb(255, 255, 255);
            }
            .input-group__textarea {
                height: 100px;
                background: inherit;
                border: 1px solid rgb(173, 172, 172);
                border-radius: 15px;
                padding: 15px;
                color: white;
            }
        }
    }
}
</style>