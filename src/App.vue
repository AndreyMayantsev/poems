<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <UserLogin/>
</template>

<script>

// import core libraries
import { Game } from './Core-prod/poems/game'
import { GameStates } from './Core-prod/poems/gameStates'
// import components
import UserLogin from './components/UserLogin.vue'

// Making new game;
var GameInstance = new Game();

// Check game state
if (GameInstance.state == GameStates.NonAuthorizeState) {
  console.log("[GAME STATE]: Non-Authorized!");
}

export default {
  name: 'App',
  components: {
    UserLogin
  },
  methods: {

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
