<template>
  <div>
    <UserLogin/>
    <RegisterForm/>
    <RoomsList/>
    <RoomCreate/>
  </div>
</template>

<script>

// import core libraries
import { mainWindow } from './Core-prod/Poems/mainWindow'
import { User } from './Core-prod/Poems/User/user'
// import components
import UserLogin from './components/tests/UserLogin.vue';
import RegisterForm from './components/tests/Register.vue';
import RoomsList from './components/tests/RoomsList.vue';
import RoomCreate from './components/tests/RoomCreate.vue'

let UserInstance = new User();
console.log("Создан пользователь, авторизуйтесь!\n " + JSON.stringify(UserInstance.getPublicInfo()));

console.log("[APP] Initialize main window: ");

export default {
  name: 'App',
  components: {
    UserLogin, 
    RoomsList,
    RegisterForm,
    RoomCreate
  },
  
  methods: {

  },

  data() {
    return {
      mainWindow ,
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
