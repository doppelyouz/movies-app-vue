<template>
    <div>
        <Topbar />
        <Loading v-if="isLoading"/>
        <ErrorMessage v-if="error"/>
        <User :id="user?.id" v-if="user"/>
    </div>
</template>
<script>
    import Topbar from '@/components/Topbar';
    import User from '../components/User';
    import { mapState } from "vuex";
    import Loading from '../components/Loading.vue';
    import ErrorMessage from '../components/ErrorMessage.vue';

    export default {
        name: 'AppUserPage',
        components: {
            Topbar,
            User,
            Loading,
            ErrorMessage,
        },
        computed: {
            ...mapState({
                isLoading: (state) => state.auth.isLoading,
                error: (state) => state.auth.error,
                user: (state) => state.auth.user,
            }),
        },
        methods: {
            fetchUser() {
                this.$store.dispatch("getUser", this.$route.params.id);
            }
        },
        mounted() {
            this.fetchUser();
        }
    };
</script>
<style lang="scss" scoped>
</style>