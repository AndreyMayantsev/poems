<template>
    <div class="RegistrationPage">
        <h1> Зарегистрироваться </h1>
        <p>Пожалуйста зарегистрируйтесь в системе:</p>
        <input type="text" size="12" placeholder="Логин"> | 
        <input type="password" size="12" placeholder="Пароль"> |
        <input type="password" size="12" placeholder="Повторите пароль"> |
        <input type="button" value="Войти">
    </div>
</template>

<script>

// import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
// import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "RegistrationPage",
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