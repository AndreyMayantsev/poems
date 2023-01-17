<template>
    <div class="AutorizationPage">
        <h1> Авторизация </h1>
        <p>Пожалуйста авторизуйтесь в системе:</p>
        <input type="text" size="12" placeholder="Логин"> | 
        <input type="password" size="12" placeholder="Пароль"> |
        <input type="button" value="Войти">
        <p>Я не <a href="#" v-on:click="$router.push({ name:'register'})" >зарегистрирован</a> в игре</p>
    </div>
</template>

<script>

// import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
// import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "AutorizationPage",
    data() {
        return {

        }
    },

    methods: {

    }
}

</script>

<style scoped>
</style>