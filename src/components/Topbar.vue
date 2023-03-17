<template>
    <div class="topbar">
        <ul class="topbar__menu">
            <li class="topbar__logo"><img :src="logo" alt="logo"></li>
            <li>Movies</li>
            <li>Tickets</li>
            <li>News & Popular</li>
        </ul>
        <div class="topbar__profile">
            <div class="topbar__profile-logo">
                <img :src="logo" alt="">
            </div>
            <div class="topbar__profile-username">
                Username
            </div>
        </div>
    </div>
</template>
<script>
import logo from '../assets/netflix.png';
   export default {
       name: 'AppTopbar',
       data() {
        return {
            logo,
        }
       }
   };
</script>
<style lang="scss" scoped>
    .topbar {
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.616);
        margin-bottom: 45px;
        
        .topbar__menu {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            color: white;
            .topbar__logo {
                width: 200px;
                min-height: 50px;
                margin-right: 25px;
                img {
                    width: 100%;
                }
            }    
        }
        .topbar__profile {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            .topbar__profile-logo {
                min-height: 50px;
                width: 50px;
                border-radius: 50%;
                img {
                    object-fit: cover;
                    width: 100%;
                }
            }
            .topbar__profile-username {
                color: white;
                font-size: 20px;
            }
        }
    }
</style>