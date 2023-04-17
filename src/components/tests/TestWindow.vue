<template>
    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <UserLogin/><q-separator />
        <RegisterForm/><q-separator />
        <RoomsList/><q-separator />
        <RoomCreate/><q-separator />
        <div class="roomlist">
          <RoomBanner room_id=1 places=9 users_rooms=6 created_at="2017-09-21T21:00:00.000Z" finish_type="moves"></RoomBanner>
          <RoomBanner room_id=200 places=3 users_rooms=3 created_at="2017-09-21T21:00:00.000Z" finish_type="times"></RoomBanner>
        </div>
      </q-page-container>
    </q-layout>
  </template>
  
  <script>

  import UserLogin from './UserLogin.vue';
  import RegisterForm from './Register.vue';
  import RoomsList from './RoomsList.vue';
  import RoomCreate from './RoomCreate.vue';
  import RoomBanner from '../uiElements/RoomBanner.vue';
  
  export default {
    name: 'TestWindow',
    components: {
      UserLogin, 
      RoomsList,
      RegisterForm,
      RoomCreate,
      RoomBanner
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
  .roomlist {
    padding: 10px;
    margin: 10px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  