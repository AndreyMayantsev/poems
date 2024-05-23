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
import { CheckDeviceType } from './Core-prod/CheckDeviceType';


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
    let logger = new ConsoleLogger("APP init");
    logger.writeLogInfo("=== Start Application ===");
    
    // Preparing device type and set it to store
    this.$store.commit('SET_IS_MOBILE_VIEW', CheckDeviceType.isMobileDevice());

    // Import DEBUG_MODE from config
    this.$store.commit('SET_DEBUG_MODE', Configure.DEBUG_MODE); 

   // Testing authorization, and load data from LS
    let testAuth = await HttpRequestFactory.makeRequest(requestType.RoomsGet, { limit:1, offset:0 })
    
    if(testAuth.success) {
        logger.writeLogInfo("Проверка авторизации прошла успешно!");
        this.$store.commit( 'ON_LOAD_USER_AUTORIZED_BY_COOKIES', localStorage.getItem('userID'));
        // let myActiveGame = ActiveGame.getActiveGame(this.$store.getters.GET_ID);
        // if (myActiveGame) {
        //     this.$router.push({ name: 'insideroom', params: { id: myActiveGame }});
        // }
    } else {
        if(testAuth.code && testAuth.code === 401) {
            logger.writeLogWarning("Проверка авторизации ПРОВАЛЕНА! Код: " + testAuth.code);
            this.$store.commit('LOGOUT');
            this.$router.push({ name:'auth' });
        } else {
          this.$router.push({ name: "nointernetconnection" });
        }
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
}
</style>
