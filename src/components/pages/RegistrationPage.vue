<template>
    <div class="RegistrationPage">
        <h1> Зарегистрироваться </h1>
        <p>Пожалуйста зарегистрируйтесь в системе:</p>
        <input type="text" size="12" placeholder="Логин" v-model="login"> | 
        <input type="password" size="12" placeholder="Пароль" v-model="password"> |
        <input type="password" size="12" placeholder="Повторите пароль" v-model="password_verify"> |
        <input type="button" value="Войти" v-on:click="Registration">
    </div>
</template>

<script>

// import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
// import { requestType } from '../../Core-prod/api/dataTypes';
import { User } from '../../Core-prod/Poems/User/user';


export default {
    name: "RegistrationPage",
    data() {
        return {
            login: "",
            password: "",
            password_verify: ""
        }
    },

    methods: {
        async Registration() {
            let authInfo = {
                login : this.login,
                password : this.password
            };

            if (this.password === this.password_verify && this.password !=""){
                let UserInstance = new User();

                let _authResult = await UserInstance.userRegistration(authInfo);

                if ( _authResult.success ) {
                    this.$store.commit('SET_USER_ID', _authResult.message.id);
                    this.$store.commit('SET_USER_INSTANCE', UserInstance);
                    console.log("[REG_FORM_RESULT]: " + JSON.stringify(this.$store.getters.USER_INSTANCE.getPublicInfo()))
                    this.$router.push({ name:'roomslist'});
                } else {
                    console.log("ОШИБКА РЕГИСТРАЦИИ: " + JSON.stringify(_authResult.message) );
                }  
            } else {
                console.log("Пароли не совпадают!")
            } 
        }
    }
}

</script>

<style scoped>
</style>