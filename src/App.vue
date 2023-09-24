<template>
  <div>
    <MainWindow/>
  </div>
</template>

<script>

import MainWindow from './components/MainWindow.vue';
import { Configure } from './Core-prod/Сonfigure'
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

    ConsoleLogger.writeLogInfo("=== Start Application ===");
    
    if(CheckDeviceType.isMobileDevice()) { 
        localStorage.setItem('mobileDevice', true);
    } else {
        localStorage.setItem('mobileDevice', false);
    } 

    this.$store.commit('SET_DEBUG_MODE', Configure.DEBUG_MODE); 
    let testAuth = await HttpRequestFactory.makeRequest(requestType.RoomsGet, { limit:1, offset:0 })
    
    if(testAuth.success) {
        ConsoleLogger.writeLogInfo("Проверка авторизации прошла успешно!");
        this.$store.commit( 'ON_LOAD_USER_AUTORIZED_BY_COOKIES', localStorage.getItem('userID'));
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
