<template>
    <div class="InsideRoomPage">
        <h1> Внутри комнаты {{ this.room.data.id }}</h1>
        <h6> Игра создана: {{ this.room.data.created_at }}</h6>
        <h4> Играют пользователи ({{ this.room.data.players.length }} из {{ this.room.data.places }}): </h4>
        <div v-for="user in this.room.data.players" >
            {{ user }}
        </div>
        <h4> Ход игрока: {{ this.room.data.current_user_id }} </h4>
        <h4 v-if="this.room.data.finish_type=='moves'">
            Сделано {{ this.room.data.messages_count }} ходов из {{ this.room.data.finish_moves_cond }}
        </h4>
        <h4 v-if="this.room.data.finish_type=='time'">
            Игра закончится {{ this.room.data.finish_time_cond }}
        </h4>  
        <input class="startbutton" type="button" value="Присоедениться" v-on:click="EnterRoom()"/><br>
        <textarea v-model="message" rows="2" cols="38"></textarea><br>
            <input class="startbutton" type="button" value="Отправить" v-on:click="SendMessage()"/>
            <input class="startbutton" type="button" value="Завершить" v-on:click="EndPoem()"/>
            <input class="startbutton" type="button" value="Покинуть" v-on:click="LeaveRoom()"/>     
        </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
//import { openWebSocket } from '../../Core-prod/api/notifications/webSocketIO'

export default {
    name: "InsideRoomPage",
    data() {
        return {
            message: "",
            room: {
                data: {
                    
                }
            }
        }
    },
    async created() {
        try {
            let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
            this.room = Room.data;
            console.log("INSIDE: " + JSON.stringify(this.room));
        } catch(error) {
            console.log("[InsideRoom] Room not loaded. Server returns an error: " + error);
        }
    },
    activated() {
        
    },
    methods: {
        async RefreshRoom() {
            try {
                let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
                this.room = Room.data;
                console.log("INSIDE: " + JSON.stringify(this.room));
            } catch(error) {
                console.log("[InsideRoom] Room not loaded. Server returns an error: " + error);
            }
        },
        async SendMessage() {
            let messageBody = { message: this.message };
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.SendMessage, messageBody, this.room.data.id);
                this.message = "";
                console.log("[SendMessage]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                console.log("[SendMessage] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EndPoem() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EndPoem, this.room.data.id);
                console.log("[EndPoem]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                console.log("[EndPoem] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async LeaveRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.LeaveRoom, this.room.data.id);
                console.log("[LeaveRoom]: " + JSON.stringify(answer));
                if (answer.data.success == true) {
                    this.$router.push({ name: "roomslist" });
                }
            } catch(error) {
                console.log("[LeaveRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EnterRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EnterRoom, this.room.data.id);
                console.log("[EnterRoom]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                console.log("[EnterRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
    }
}

</script>

<style scoped>
</style>