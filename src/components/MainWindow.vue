<template>
    <div class = "MainWindow">
        <!---
        <p>Стихи вслепую (Пользователь № {{ this.$store.getters.USER_ID }})</p> 
        <input type="button" value="Тесты" v-on:click="toTheTestImage()">
        <input type="button" value="Авторизация" v-on:click="toTheAuthPage()"> |
        <input type="button" value="Комнаты" v-on:click="toTheRooms()">    
        -->    

        <q-layout view="hHh lpR fFf">

<q-header reveal bordered class="bg-primary text-white">
  <q-toolbar>
    <q-toolbar-title>
      <q-avatar v-if="this.UserAuthorized()" size="36px" color="orange">{{ this.$store.getters.USER_ID }}</q-avatar>
   
      <q-btn  v-if="this.UserAuthorized() == false" flat rounded class="menu-font" label="Войти" v-on:click="toTheAuthPage()"/>

      <q-btn flat rounded class="menu-font" label="Комнаты" v-on:click="toTheRooms()"/>
      <q-btn flat rounded class="menu-font" label="Тесты" v-on:click="toTheTestPage()"/>
    </q-toolbar-title>
  </q-toolbar>
</q-header>

<q-page-container>
  <router-view />
</q-page-container>

<q-footer reveal bordered class="bg-grey-8 text-white">
  <q-toolbar>
    <q-toolbar-title>
      <div>Made by BlindlyPoems country</div>
    </q-toolbar-title>
  </q-toolbar>
</q-footer>

</q-layout>

</div>

</template>

<script>


export default {

    name: 'MainWindow',
    components: {  },
    created() {

    },
    mounted() {

    },
    methods: {
        UserAuthorized() {
            if(localStorage.getItem("auth") != null) {
                return true
            } else {
              return false
            }
        },
        toTheRooms() {
            if(localStorage.getItem('network')) {
                this.$router.push({ name: 'roomslist'});
            } else {
                this.$router.push({ name: 'nointernetconnection'});
            }
        },
        toTheTestPage() {
            this.$router.push({ name: 'testpage'});
        },
        toTheAuthPage() {
            this.$router.push({ name: 'auth'})
        },
        getUserInitials() {
            let _name = this.$store.getters.USER_PUBLIC_INFO;
            return JSON.stringify(_name.name[0])
        }
    }

}

</script>

<style>
.max-width-form {
  max-width: 330px;
}
.menu-font {
  btn-text-color: white;
}
.center-box {
        margin: 3px auto;
        text-align: center;
        padding: 3px;
}
.flex-box {
  display: flex;
}
</style>