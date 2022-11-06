<template>
    <div class="UserLogin">
        <popup-msg v-if="ifPopupMsgVisible" @closePopup="closePopup">

            <p> {{ PopupMsgInfo }} </p>
        </popup-msg>
        <div class="box">
            <h2>Войти в игру:</h2>
            <input type="text" size="12" v-model="login_verify" class="defaultinput" v-bind:class="{ verifyedinput: LoginValid }" placeholder="Логин">
            <input type="password" size="12" v-model="password_verify" class="defaultinput" v-bind:class="{ verifyedinput: PasswordValid }" placeholder="Пароль">
            <input class="startbutton" type="button" value="Войти" v-on:click="letsGo"> 
            <p>Верификация: {{ VerifyPassed }}</p>
        </div>
    </div>    
</template>

<script>
// import { HttpRequestFactory, requestType } from '../Core-prod/api/HttpRequestFactory'
import PopupMsg from './popup/PopupMsg.vue'

export default {
    name: 'UserLogin',

    components: {
        PopupMsg
    },

    //Свойства компонента
    data() {
        return {
            ifPopupMsgVisible: false,
            login_verify: "",
            password_verify: "",
            VerifyPassed: false,
            LoginValid: false,
            PasswordValid: false,
            PopupMsgInfo: "Info about error or warning",
            PopupMsgTitle: "Error or warning"
        }
    },

    //Наблюдатель отвечающий за верификацию
    watch: {
        login_verify() {
            if (this.login_verify.length > 3) {
                this.LoginValid = true
            } else {
                this.LoginValid = false
            }
            this.verifyPass();
        },
        password_verify() {
            if (this.password_verify.length > 7) {
                this.PasswordValid = true
            } else {
                this.PasswordValid = false
            }
            this.verifyPass();
        }
    },

    //Внутренние методы компонента
    methods: {

        verifyPass() {
            // Сюда можно результаты проверок логина и пароля
            if (this.LoginValid && this.PasswordValid) {
                this.VerifyPassed = true;
            } else {
                this.VerifyPassed = false;
            }
        },

        showPopup(msg) {
            this.PopupMsgTitle = "Посмотри сюда!";
            this.PopupMsgInfo = msg;
            this.ifPopupMsgVisible = true;
        },

        closePopup() {
            this.ifPopupMsgVisible = false;
        },

        async letsGo() {
            // Тестовая реализация
            let authInfo = {
                login : this.login_verify,
                password : this.password_verify
            };
            console.log("LETS-GO")
            this.showPopup("OK" + authInfo)
        }
    }

}

</script>

<style scoped>
    .box {
        opacity: 0.9;
        margin: 100px auto;
        text-align: center;
        background-color: #b3c9db;
        border-radius: 4px;
        width: 350px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,1,0,0.5);
    }
    .verifyedinput {
        border-bottom: 2px solid #13b953;
    }
    .defaultinput {
        padding: 6px;
        margin: 10px;
        background-color: #B0C4DE;
        color: #191970;
        outline: 0;
        border: 0;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
    }
    .startbutton {
        padding: 6px;
        margin: 6px;
        background-color: #5F9EA0;
        color: #fff;
        outline: 0;
        border: 0;
        border-bottom: 2px solid #00CED1;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
        width: 150px;
    }
    .startbutton:hover {
        color: #fff;
        background-color: #CE7A05;
    }
</style>