<template>
    <div class="InsideRoomPage">
        <h1> Внутри комнаты {{ this.room.data.data.id }}</h1>
        <h6> Игра создана: {{ this.room.data.data.created_at }}</h6>
        <h4> Играют пользователи ({{ this.room.data.data.players.length }} из {{ this.room.data.data.places }}): </h4>
        <div v-for="user in this.room.data.data.players" >
            {{ user }}
        </div>
        <h4> Ход игрока: {{ this.room.data.data.current_user_id }} </h4>
        <h4 v-if="this.room.data.data.finish_type=='moves'">
            Сделано {{ this.room.data.data.messages_count }} ходов из {{ this.room.data.data.finish_moves_cond }}
        </h4>
        <h4 v-if="this.room.data.data.finish_type=='time'">
            Игра закончится {{ this.room.data.data.finish_time_cond }}
        </h4>       
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "InsideRoomPage",
    data() {
        return {
            room: {

            }
        }
    },
    async created() {
        try {
                this.room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
                console.log("INSIDE: " + JSON.stringify(this.room));
        } catch(error) {
                console.log("[InsideRoom] Room not loaded. Server returns an error: " + error);
        }
    },
    activated() {

    },
    methods: {

    }
}

</script>

<style scoped>
</style>