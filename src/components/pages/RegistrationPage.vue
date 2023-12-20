<template>
    <div class="RegistrationPage">
        <div class="q-gutter-md center-box">
            Для регистрации введите учетные данные и нажмите "Регистрация"
            <q-input outlined v-model="login" label="Логин" />
            <q-input type="email" outlined v-model="email" label="Электронная почта" />
            <q-input type="password" outlined v-model="password" label="Пароль" />
            <q-input type="password" outlined v-model="password_verify" label="Повторите пароль" />
            <span class="text-caption">Нажимая "Регистрация" Вы соглашаетесь с соглашением, ну тут как всегда =)</span>
            <q-btn push color="primary" label="Регистрация" v-on:click="Registration"/>
        </div>
    </div>    
</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory'
import { requestType } from '../../Core-prod/api/dataTypes'
import { showNotifyToast, NotifyTypes } from '../../Core-prod/UI/Notifyer'; 


export default {
    name: "RegistrationPage",
    data() {
        return {
            email: "",
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

                let _authResult = await HttpRequestFactory.makeRequest(requestType.UserRegister, authInfo);

                if ( _authResult.success ) {
                    showNotifyToast(NotifyTypes.INFO, "Авторизация успешна!");
                    console.log("Correct Auth request recieved!");
                    this.$store.commit('LOGIN', _authResult);
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
    .center-box {
        margin: auto;
        text-align: center;
        border-radius: 4px;
        max-width: 330px;
    }
</style>