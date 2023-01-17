<template>
    <div class="TestWindow">
      <UserLogin/>
      <RegisterForm/>
      <RoomsList/>
      <RoomCreate/>
    </div>
  </template>
  
  <script>

  import UserLogin from './UserLogin.vue';
  import RegisterForm from './Register.vue';
  import RoomsList from './RoomsList.vue';
  import RoomCreate from './RoomCreate.vue';
  //import openWS from '../../Core-prod/api/notifications/webSocketIO'
  
  export default {
    name: 'TestWindow',
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
  