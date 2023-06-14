<template>
    <div class="AutorizationPage">
        <div class="q-gutter-md center-box">
            Для входа в игру введите учетные данные и нажмите "Войти"
            <q-input outlined v-model="login" label="Логин" />
            <q-input type="password" outlined v-model="password" label="Пароль" />
            <span>Я не <a href="#" v-on:click="$router.push({ name:'register'})">зарегистрирован</a> в игре</span>
            <q-btn push color="primary" label="Войти" v-on:click="Autorize"/>
        </div>
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
                this.$store.commit('SET_USER_ID', _authResult.data.user_id);
                this.$store.commit('SET_USER_INSTANCE', UserInstance);
                console.log("[AUTH_FORM_LOGIN_RESULT]: " + JSON.stringify(this.$store.getters.USER_INSTANCE.getPublicInfo()))
                this.$router.push({ name:'roomslist'});
                location.reload()
            } else {
                console.log("ОШИБКА АВТОРИЗАЦИИ: " + JSON.stringify(_authResult.message) );
            }
        }
    }
}

</script>

<style scoped>
    .center-box {
        margin: 100px auto;
        text-align: center;
        border-radius: 4px;
        padding: 10px;
        max-width: 330px;
    }
</style>