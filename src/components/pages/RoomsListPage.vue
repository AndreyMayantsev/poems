<template>
    <div class="RoomsListPage">
        <h1> Список комнат </h1>
        <input type="button" value="Создать новую комнату" v-on:click="this.$router.push({name: 'createroom'})">        
        <br>  
        <div v-for="room in rooms" :key="room.id" class="roombox">
            =============================================<br>
            <b>Комната №</b>{{ room.id }} <b>Играет </b>{{ room.users_rooms.length }} чел.<br>
            <input class="startbutton" type="button" value="Перейти" v-on:click="$router.push({ name: 'insideroom', params: { id:room.id }})"/><br>
            <h6>Свободно: {{ room.places - room.users_rooms.length }} мест, создано: {{ Date.parse( room.created_at ) }} </h6>           
        </div>
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "RoomsListPage",
    data() {
        return {
            rooms: {}
        }
    },

    methods: {
        async ShowRooms() {
            try {
            let getroom = { limit:10, offset:0 }
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            this.rooms = {
                ...answer.data.data
            }
            console.log("ROOMS: " + JSON.stringify(this.rooms));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error);
                this.$router.push({ name: "auth" });
            }
        },
    },
    async created() {
        try {
            let getroom = { limit:10, offset:0 }
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            this.rooms = {
                ...answer.data.data
            }
            console.log("ROOMS: " + JSON.stringify(this.rooms));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
        }       
    }
}

</script>

<style scoped>
</style>