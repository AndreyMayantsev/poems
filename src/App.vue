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
//import { requestType } from './Core-prod/api/dataTypes'

let UserInstance = new User();
console.log("Создан пользователь, авторизуйтесь!\n " + JSON.stringify(UserInstance.getPublicInfo()));
console.log("[APP] Initialize main window: ");

// Попробовать встроить сюда тест активности сессии

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
