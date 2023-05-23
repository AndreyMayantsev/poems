<template>
    <div class = "MainWindow">
        <p>Стихи вслепую (Пользователь № {{ this.$store.getters.USER_ID }})</p> 
        <input type="button" value="Тесты" v-on:click="$router.push({ name: 'testpage'})">
        <input type="button" value="Авторизация" v-on:click="$router.push({ name: 'auth'})"> |
        <input type="button" value="Комнаты" v-on:click="$router.push({ name: 'roomslist'})">    
        <router-view>
        </router-view>    
    </div>
</template>

<script>


//import { requestType } from '../Core/api/dataTypes.ts'

export default {

    name: 'MainWindow',
    components: {  },
    created() {

    },
    mounted() {

    },
    methods: {

    }

}

</script>

<style scoped>

</style>