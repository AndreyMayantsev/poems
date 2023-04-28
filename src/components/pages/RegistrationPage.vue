<template>
        <div class="q-gutter-md center-box">
            Для регистрации введите учетные данные и нажмите "Регистрация"
            <q-input outlined v-model="login" label="Логин" />
            <q-input type="email" outlined v-model="email" label="Электронная почта" />
            <q-input type="password" outlined v-model="password" label="Пароль" />
            <q-input type="password" outlined v-model="password_verify" label="Повторите пароль" />
            <span class="text-caption">Нажимая "Регистрация" Вы соглашаетесь с соглашением, ну тут как всегда =)</span>
            <q-btn push color="primary" label="Регистрация" v-on:click="Registration"/>
        </div>
</template>

<script>
import { User } from '../../Core-prod/Poems/User/user';


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
                let UserInstance = new User();

                let _authResult = await UserInstance.userRegistration(authInfo);

                if ( _authResult.success ) {
                    this.$store.commit('SET_USER_ID', _authResult.data.user_id);
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
    .center-box {
        margin: 100px auto;
        text-align: center;
        border-radius: 4px;
        padding: 10px;
        max-width: 330px;
    }
</style>