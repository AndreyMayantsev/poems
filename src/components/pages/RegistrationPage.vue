<template>
<div class="RegistrationPage">
    <WindowDefaultFlex
            caption="Регистрация"
            text=""
        >

            <q-input outlined v-model="login" label="Логин" class="padding-el"/>
            <!--<q-input type="email" outlined v-model="email" label="Электронная почта" class="padding-el"/>-->
            <q-input type="password" outlined v-model="password" label="Пароль" class="padding-el"/>
            <q-input type="password" outlined v-model="password_verify" label="Повторите пароль" class="padding-el"/>
            <span class="text-caption">Нажимая "Регистрация" Вы соглашаетесь с соглашением, ну тут как всегда =)</span>
            <q-separator/>
            <SimpleButton class="padding-el" caption="Зарегистрироваться" v-on:click="Registration"></SimpleButton>
    </WindowDefaultFlex>
</div>
</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory'
import { requestType } from '../../Core-prod/api/dataTypes'
import { showNotifyToast, NotifyTypes } from '../../Core-prod/UI/Notifyer'; 
import WindowDefaultFlex from '../uiElements/window/WindowDefaultFlex.vue';
import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

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
    components: {
        WindowDefaultFlex,
        SimpleButton
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
.padding-el {
    padding: 5px;
}
</style>