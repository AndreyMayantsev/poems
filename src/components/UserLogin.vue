<template>
    <div class="UserLogin">
        <popup-msg v-if="ifPopupMsgVisible" @closePopup="closePopup">

            <p> {{ PopupMsgInfo }} </p>
        </popup-msg>
        <div class="box">
            <h2>Войти в игру:</h2>
            <input type="text" size="12" v-model="login_verify" class="defaultinput" v-bind:class="{ verifyedinput: LoginValid }" placeholder="Логин">
            <input type="password" size="12" v-model="password_verify" class="defaultinput" v-bind:class="{ verifyedinput: PasswordValid }" placeholder="Пароль">
            <input class="startbutton" v-bind:disabled="isLoginButtonDisabled" type="button" value="Войти" v-on:click="letsGo">
            <input class="roomsbutton" type="button" value="Комнаты" v-on:click="Rooms">
            <p>Верификация: {{ VerifyPassed }}</p>
        </div>
    </div>    
</template>

<script>
import { HttpRequestFactory } from '../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../Core-prod/api/dataTypes';
import { PopupMsg } from './popup/PopupMsg.vue'

export default {
    name: 'UserLogin',

    components: {
        PopupMsg
    },

    //Свойства компонента
    data() {
        return {
            ifPopupMsgVisible: false,
            isLoginButtonDisabled: true,
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

        // Проверка логина и пароля на условия
        verifyPass() {
            // Сюда можно результаты проверок логина и пароля
            if (this.LoginValid && this.PasswordValid) {
                this.VerifyPassed = true;
                this.isLoginButtonDisabled = false;
            } else {
                this.VerifyPassed = false;
                this.isLoginButtonDisabled = true;
            }
        },

        // Показать попап окно
        showPopup(msg) {
            this.PopupMsgTitle = "Посмотри сюда!";
            this.PopupMsgInfo = msg;
            this.ifPopupMsgVisible = true;
        },

        // Закрыть попап окно
        closePopup() {
            this.ifPopupMsgVisible = false;
        },

        // Функция отправвки данных авторизации
        async letsGo() {
            let ReqFabric; 

            // Тестовая реализация
            let authInfo = {
                login : this.login_verify,
                password : this.password_verify
            };
            console.log("Authentification data created.")
            this.showPopup("ОТПРАВЛЯЕМ НА СЕРВЕР => " + JSON.stringify(authInfo))

            try {
                
                // Запрос на сервер
                ReqFabric = new HttpRequestFactory();
                console.log("Пытаюсь отправить: " + requestType.RoomsGet);
                let answer = await ReqFabric.makeRequest( requestType.UserAuth, authInfo );
                console.log("Получе объект: " + JSON.stringify(answer) + " типа " + typeof(answer));
                console.log("Результат: " + answer.data.success);

                if(answer.data.success) {
                    this.showPopup("ДОБРО ПОЖАЛОВАТЬ ПОЛЬЗОВАТЕЛЬ №" + answer.data.data.user_id);
                } else {
                    this.showPopup("ОШИБКА АВТОРИЗАЦИИ: " + answer.data.message.login);
                }

            } catch(error) {
                this.showPopup("ОШИБКА ЗАПРОСА: " + error);
            }        
        },
        
        async Rooms() {
            let ReqFabric;

            let getroom = { limit:10, offset:0 }
            ReqFabric = new HttpRequestFactory();
            console.log("Пытаюсь отправить: " + requestType.RoomsGet);
            let answer = await ReqFabric.makeRequest( requestType.RoomsGet,  getroom );
            console.log("Получе объект: " + JSON.stringify(answer) + " типа " + typeof(answer));
            console.log("Результат: " + answer.data.success);

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