<template>
    <div class = "MainWindow">
        <p>Стихи вслепую</p> 
        <input type="button" value="Тесты" v-on:click="$router.push({ name: 'testpage'})">
        <input type="button" value="Авторизация" v-on:click="$router.push({ name: 'auth'})"> |
        <input type="button" value="Комнаты" v-on:click="$router.push({ name: 'roomslist'})">    
        <router-view>
        </router-view>    
    </div>
</template>

<script>
//import router from '../router/router'

export default {
    name: 'MainWindow',
    components: {  }
}

</script>

<style scoped>

</style>