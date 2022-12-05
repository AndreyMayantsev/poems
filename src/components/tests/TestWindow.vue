<template>
    <div class="TestWindow">
      <UserLogin/>
      <RegisterForm/>
      <RoomsList/>
      <RoomCreate/>
    </div>
  </template>
  
  <script>
  
  // import core libraries
  //import { MainWindow } from '../../Core-prod/Poems/mainWindow'
  //import { User } from '../../Core-prod/Poems/User/user'
  // import components
  import UserLogin from './UserLogin.vue';
  import RegisterForm from './Register.vue';
  import RoomsList from './RoomsList.vue';
  import RoomCreate from './RoomCreate.vue'
  
 // let UserInstance = new User();
  
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
  