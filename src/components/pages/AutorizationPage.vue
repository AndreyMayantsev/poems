<template>

<div class="AutorizationPage">
        <WindowDefault
            caption="Войти"
            text="Для входа в игру введите учетные данные и нажмите 'Войти'. Если Вы небыли зарегистрированы ранее - пройдите регистрацию."
        >
            <q-separator/>
            <q-input class="padding-el" outlined v-model="login" label="Логин" />
            <q-input class="padding-el" type="password" outlined v-model="password" label="Пароль" />
            <q-separator/>
            <SimpleButton class="padding-el" caption="Войти" v-on:click="Autorize"></SimpleButton>

        <span>Я не <a href="#" v-on:click="$router.push({ name:'register'})">зарегистрирован</a> в игре</span>
        </WindowDefault>
</div>


</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory'
import { requestType } from '../../Core-prod/api/dataTypes'
import { showNotifyToast, NotifyTypes } from '../../Core-prod/UI/Notifyer';
import WindowDefault from '../uiElements/window/WindowDefault.vue';
import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

export default {
    name: "AutorizationPage",
    data() {
        return {
            login: "",
            password: "",
        }
    },
    components: {
        WindowDefault,
        SimpleButton
    },
    methods: {
        async Autorize() {

            let authInfo = {
                login : this.login,
                password : this.password
            };

            let response = await HttpRequestFactory.makeRequest( requestType.UserAuth, authInfo );

            if(response.data.success) {
                showNotifyToast(NotifyTypes.INFO, "Авторизация успешна!");
                console.log("Correct Auth request recieved!");
                this.$store.commit('LOGIN', response);
                console.log("[AUTH_FORM_LOGIN_RESULT]: " + JSON.stringify(this.$store.getters.GET_ID));
                this.$router.push({ name:'roomslist'});
            } else {
                console.log("ОШИБКА АВТОРИЗАЦИИ");
            }
            
            console.log("Added user with ID: " + this.$store.getters.GET_ID)
        }
    }
}

</script>

<style scoped>
.wlimit {
    width: 98%;
    padding: 10px;
}
.padding-el {
    padding: 5px;
}
</style>