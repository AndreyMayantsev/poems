<template>
    <div class = "MainWindow">
        <!---
        <p>Стихи вслепую (Пользователь № {{ this.$store.getters.USER_ID }})</p> 
        <input type="button" value="Тесты" v-on:click="toTheTestImage()">
        <input type="button" value="Авторизация" v-on:click="toTheAuthPage()"> |
        <input type="button" value="Комнаты" v-on:click="toTheRooms()">    
        -->    
        <div class="q-pa-md">
            <div class="q-gutter-y-md">
            <q-tabs
                v-model="tab"
                :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
            >
                    <q-avatar size="24px" color="orange">{{ this.getUserInitials() ? this.getUserInitials() : "NA" }}</q-avatar><q-tab name="Auth" label="Войти" v-on:click="toTheAuthPage()"/>
                <q-tab name="Rooms" label="Комнаты" v-on:click="toTheRooms()"/>
                <q-tab name="Test" label="Тесты" v-on:click="toTheTestImage()"/>
                
            </q-tabs>

            <router-view>
            </router-view>    
            </div>
        </div>
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
        toTheRooms() {
            if(localStorage.getItem('network')) {
                this.$router.push({ name: 'roomslist'});
            } else {
                this.$router.push({ name: 'nointernetconnection'});
            }
        },
        toTheTestImage() {
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

<style scoped>

</style>