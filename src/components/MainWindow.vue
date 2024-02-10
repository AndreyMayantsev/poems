<template>
<div>
  <q-layout
      view="lHh lpR lFf"
      class="shadow-2 rounded-borders"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >

    <q-header v-if="!this.$store.getters.GET_IS_MOBILE_VIEW" reveal bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar v-if="this.$store.getters.IS_USER_AUTORIZED" size="38px" color="orange">{{ this.$store.getters.GET_ID }}</q-avatar>
          <q-btn v-if="!this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Войти" v-on:click="toTheAuthPage()"/>
          <q-btn v-if="this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Комнаты" v-on:click="toTheRooms()"/>
          <q-btn v-if="this.$store.getters.GET_DEBUG_MODE" flat rounded class="menu-font" label="Тесты" v-on:click="toTheTestPage()"/>
          <q-btn v-if="this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Выход" v-on:click="LogOut()"/>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
        <router-view />
    </q-page-container>

    <q-footer v-if="this.$store.getters.GET_IS_MOBILE_VIEW" reveal bordered class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar v-if="this.$store.getters.IS_USER_AUTORIZED" size="38px" color="orange">{{ this.$store.getters.GET_ID }}</q-avatar>
          <q-btn v-if="!this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Войти" v-on:click="toTheAuthPage()"/>
          <q-btn v-if="this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Комнаты" v-on:click="toTheRooms()"/>
          <q-btn v-if="this.$store.getters.GET_DEBUG_MODE" flat rounded class="menu-font" label="Тесты" v-on:click="toTheTestPage()"/>
          <q-btn v-if="this.$store.getters.IS_USER_AUTORIZED" flat rounded class="menu-font" label="Выход" v-on:click="LogOut()"/>
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
    data() {
        return {
            isUserAutorized: this.$store.getters.IS_USER_AUTORIZED,
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
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
            this.$router.push({ name: 'auth'});
        },
        getUserInitials() {
            let _name = this.$store.getters.USER_PUBLIC_INFO;
            return JSON.stringify(_name.name[0]);
        },
        LogOut() {
            this.$store.commit('LOGOUT');
            this.$router.push({ name: 'auth'});
        }
    }

}

</script>

<style>
.window-geometry {
  min-width: 400px;
  min-height: 400px;
  max-width: 700px;
  max-height: 900px;
}
.header {
  height: 6vh;
}
.footer {
  height: 5%
}
.wrapper {
  height: 88%;
  min-height: 300px;
}

.height-wrapper-100 {
  height: 90vh;
}
.auto-margin {
  margin: auto;
}
.blurtoolbar {
  background-color: #0000001a;
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}
</style>