<template>
<div>
  <q-layout
      view="hHh lpR fFf"
      class="shadow-2 rounded-borders"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >

    <q-header v-if="!this.$store.getters.GET_IS_MOBILE_VIEW" reveal bordered class="text-white" style="background-color: #d19621ce;">
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

      <q-page-container style="padding: 0px;">
        <router-view />
      </q-page-container>

    <q-footer v-if="this.$store.getters.GET_IS_MOBILE_VIEW" reveal bordered class="text-white" style="background-color: #471C1C;">
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
@font-face {
    font-family: 'Marck Script';
    src: local('Marck Script'), local('MarckScript-Regular'), 
    url('../assets/fonts/marckscript.woff2') format('woff2'), 
    url('../assets/fonts/marckscript.woff') format('woff'), 
    url('../assets/fonts/marckscript.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'LT Remark';
    src: local('LT Remark'), local('LT Remark-Regular'), 
    url('../assets/fonts/LTRemark.woff2') format('woff2'), 
    url('../assets/fonts/LTRemark.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
.menu-font {
  font-family: "LT Remark";
  font-size: 3.8rem;
  line-height: .9;
  letter-spacing: 1;
  text-decoration-style: solid;
  cursor: pointer;
}
.text-font {
  font-family: "LT Remark";
  font-size: 1.5rem;
  line-height: .9;
  letter-spacing: 1;
  text-decoration-style: solid;
  cursor: pointer;
}
.text-font-mini {
  font-family: "LT Remark";
  font-size: 1.0rem;
  line-height: .9;
  letter-spacing: 1;
  text-decoration-style: solid;
  cursor: pointer;
}
.header-font {
  font-family: "Marck Script";
  font-size: 3.8rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
  cursor: pointer;
}
.header-font-mini {
  font-family: "Marck Script";
  font-size: 1.8rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
  cursor: pointer;
}
.backgroung-color-default {
  background-color: #ddc19d;
}
.header {
  height: 6vh;
}
.footer {
  height: 5%
}
.height-wrapper-100 {
  height: 90vh;
}
.auto-margin {
  margin: auto;
}
.flb {
    display: flex;
    justify-content: center;
    align-items: center;
}
.flb-v {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.padding-default {
    padding: 8px;
} 
</style>