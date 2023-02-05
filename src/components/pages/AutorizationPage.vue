<template>
    <div class="AutorizationPage">
        <h1> Авторизация </h1>
        <p>Пожалуйста авторизуйтесь в системе:</p>
        <input type="text" size="12" placeholder="Логин" v-model="login"> | 
        <input type="password" size="12" placeholder="Пароль" v-model="password"> |
        <input type="button" value="Войти" v-on:click="Autorize">
        <p>Я не <a href="#" v-on:click="$router.push({ name:'register'})" >зарегистрирован</a> в игре</p>
    </div>
</template>

<script>

import { User } from '../../Core-prod/Poems/User/user';

export default {
    name: "AutorizationPage",
    data() {
        return {
            login: "",
            password: "",
        }
    },

    methods: {
        async Autorize() {
            let UserInstance = new User();
            let authInfo = {
                login : this.login,
                password : this.password
            };

            let _authResult = await UserInstance.userLogin(authInfo);

            if ( _authResult.success ) {
                this.$store.commit('SET_USER_ID', _authResult.message.id);
                this.$store.commit('SET_USER_INSTANCE', UserInstance);
                console.log("[AUTH_FORM_LOGIN_RESULT]: " + JSON.stringify(this.$store.getters.USER_INSTANCE.getPublicInfo()))
                this.$router.push({ name:'roomslist'});
            } else {
                console.log("ОШИБКА АВТОРИЗАЦИИ: " + JSON.stringify(_authResult.message) );
            }
        }
    }
}

</script>

<style scoped>
</style>