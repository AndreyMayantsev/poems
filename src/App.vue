<template>
  <div>
    <MainWindow/>
  </div>
</template>

<script>

// import core libraries
import { User } from './Core-prod/Poems/User/user'
// import components
import MainWindow from './components/MainWindow.vue';
import { HttpRequestFactory } from './Core/api/requests/HttpRequestFactory.ts'
import { requestType } from './Core/api/dataTypes.ts'



let UserInstance = new User();
console.log("Создан пользователь, авторизуйтесь!\n " + JSON.stringify(UserInstance.getPublicInfo()));
console.log("[APP] Initialize main window: ");

export default {
  name: 'App',
  components: {
    MainWindow
  },
  
  methods: {
      Initialize() {
        console.log("=== Загрузка данных ===");
        this.$store.commit( 'SET_USER_ID', localStorage.getItem('userID') );
        console.log("-> USER_ID: " + this.$store.getters.USER_ID);
        console.log("-> USER_AUTH_CHECKING: ");
        if (localStorage.getItem('auth')) {
            let getroom = { limit:10, offset:0 }
            let answer = HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            if(answer.success) {
                console.log("--> AUTH ACCEPTED");
            } else {
                console.log("--> AUTH NOT ACCEPTED");
                localStorage.removeItem("auth");
            }
        }
      }
  },

  data() {
    return {
      mainWindow: 1,
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
