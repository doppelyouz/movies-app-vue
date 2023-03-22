<template>
    <div>
        <Topbar />
        <div class="add">
            <form class="add__form" @submit.prevent="createMovie">
                <h1 class="add__title">Добавить фильм</h1>
                <div class="add__input-group">
                    <div class="input-group__title">Name:</div>
                    <my-input v-model="name"/>
                </div>
                <div class="add__input-group">
                    <div class="input-group__title">Description:</div>
                    <my-input v-model="description"/>
                </div>
                <div class="add__input-group">
                    <div class="input-group__title">Image:</div>
                    <my-input v-model="image"/>
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
                image: ''
            }
        },  
        computed: {
            ...mapState({

            }),
        },
        methods: {
            createMovie() {
                    const movie = {
                        image: this.image,
                        name: this.name,
                        description: this.name,
                        rating: 0, 
                        comments: []
                    };

                    this.$store.dispatch('createMovie', movie)

                    this.description = '';
                    this.name = '';
                    this.image = '';

                    this.$router.push({name: 'home'})
        },
        mounted() {
        }
    }
}
</script>
<style lang="scss" scoped>
.add {
    margin: 0 auto;
    max-width: 800px;
    width: 100%;
    background: rgb(82, 63, 63);
    border-radius: 25px;
    padding: 100px;
    .add__form {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 20px;
        .add__title {
            font-size: 40px;
            margin-bottom: 25px;
            color:white;
        }
        .add__input-group {
            display: flex;
            flex-direction: column;
            width: 100%;
            .input-group__title {
                font-size: 25px;
                color: rgb(255, 255, 255);
            }
        }
    }
}
</style>