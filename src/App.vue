<template>
  <div>
    <UserLogin/>
    <RegisterForm/>
  </div>
</template>

<script>

// import core libraries
import { Game } from './Core-prod/Poems/game'
import { GameStates } from './Core-prod/Poems/gameStates'
import { mainWindow } from './Core-prod/Poems/mainWindow'
// import components
import UserLogin from './components/UserLogin.vue';
import RegisterForm from './components/Register.vue';

// Making new game;
var GameInstance = new Game();

// Check game state
if (GameInstance.state == GameStates.NonAuthorizeState) {
  console.log("[GAME STATE]: Non-Authorized!");
}

console.log("[APP] Initialize main window: ");

export default {
  name: 'App',
  components: {
    UserLogin,
    RegisterForm
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
