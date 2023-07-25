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
import { requestType } from './Core-prod/api/dataTypes';
import { HttpRequestFactory } from './Core-prod/api/requests/HttpRequestFactory';
import { ConsoleLogger } from './Core-prod/Logger/ConsoleLogger';
import { CheckDeviceType } from './Core-prod/CheckDeviceType'


export default {
  name: 'App',
  components: {
    MainWindow
  },
  
  methods: {

  },

  data() {
    return {
      mainWindow: 1,
    }
  },
  async created() {

    // ----------------------
    // Initialize application
    // ----------------------

    let UserInstance = new User();
    
    ConsoleLogger.writeLogInfo("Создан пользователь, авторизуйтесь! <- " + JSON.stringify(UserInstance.getPublicInfo()));
    ConsoleLogger.writeLogInfo("=== Загрузка данных ===");
    
    // whatTheDevice - Computer PC or Mobile Device
    if(CheckDeviceType.isMobileDevice()) { 
        localStorage.setItem('mobileDevice', true);
    } else {
        localStorage.setItem('mobileDevice', false);
    } 

    let testAuth = await HttpRequestFactory.makeRequest(requestType.RoomsGet, { limit:1, offset:0 })
    
    if(testAuth.success) {
        //localStorage.setItem('userID', testAuth.user_id); // this is no auth request and NO CONTENTS user_id
        ConsoleLogger.writeLogInfo("Проверка авторизации прошла успешно! ");
        this.$store.commit( 'SET_USER_ID', localStorage.getItem('userID') );
        this.$store.commit( 'SET_USER_INSTANCE', UserInstance ); 
    } else {
        if(testAuth.code && testAuth.code === 401) {
            ConsoleLogger.writeLogWarning("Проверка авторизации ПРОВАЛЕНА! Код: " + testAuth.code);
            localStorage.removeItem('userID');
            localStorage.removeItem('auth');
            this.$router.push({ name:'auth' });
        } else {
          this.$router.push({ name: "nointernetconnection" });
        }

    }
    
    // Попробовать встроить сюда тест активности сессии

    // Pusher test 


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
