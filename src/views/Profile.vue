<template>
    <div>
        <Topbar />
        <User :id="currentUser.id"/>
    </div>
</template>
<script>
    import Topbar from '@/components/Topbar';
    import User from '../components/User';
    import { mapState } from "vuex";

    export default {
        name: 'AppProfile',
        components: {
            Topbar,
            User
        },
        computed: {
            ...mapState({
                currentUser: (state) => state.auth.currentUser,
            }),
        }
    };
</script>
<style lang="scss" scoped>
</style>