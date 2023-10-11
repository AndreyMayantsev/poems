<template>
    <div class="fixed-center">
        <q-card class="max-width-form center-box">
            Приветсвуем в игре №{{ this.room.data.id }}            
            <q-separator/>
                <!-- USERS IN ROOM AVATARS -->
                <div class="flex-box q-pa-md q-gutter-sm">
                    <q-space/>
                    <div v-for="user in this.room.data.players">
                        <div v-if="user == this.room.data.current_user_id">
                            <q-avatar
                            size="30px"
                            class="overlapping"
                            style="border: 3px solid rgb(29, 180, 29);"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
                            {{ user }}
                            </q-avatar>
                        </div>
                        <div v-if="user != this.room.data.current_user_id">
                            <q-avatar
                            size="30px"
                            class="overlapping"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`">
                            {{ user }}
                            </q-avatar>
                        </div>
                     </div>
                     <div v-if="this.free_places > 0">
                        <div v-for="free_place in this.free_places">
                                <q-avatar
                                size="30px"
                                class="overlapping"
                                >
                                <img :src="`https://cdn.quasar.dev/img/avatar4.jpg`">
                                {{ free_place }}
                                </q-avatar>                           
                        </div>
                    </div>
                    <q-space/>
                    <!-- MENU IN HEAD OF FORM -->
                        <q-btn color="primary" label="" icon="home">
                            <q-menu auto-close>
                                <q-list style="min-width: 100px">
                                <q-item v-if="!this.userIsPlayer" clickable>
                                    <q-item-section v-on:click="EnterRoom()">Присоединиться</q-item-section>
                                </q-item>
                                <q-item v-if="this.userIsPlayer" clickable>
                                    <q-item-section v-on:click="LeaveRoom()">Покинуть комнату</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item v-if="this.userIsPlayer" clickable>
                                    <q-item-section v-on:click="EndPoem()">Завершение игры</q-item-section>
                                </q-item>
                                </q-list>
                            </q-menu>
                        </q-btn>
                </div>
            <q-separator/>
            <!-- poems messages as a chat -->    
            <div class="q-pa-md row justify-center">
                <q-chat-message
                    name="Предыдущий игрок: "
                    :text="['Привет привет!\n Стишок в ответ!']"
                />
            </div>


        </q-card>

        <!-- <h4> Играют пользователи ({{ this.room.data.players.length }} из {{ this.room.data.places }}): </h4> -->

        <h6> Свободно {{ this.free_places }}</h6>
        <h6> Ход игрока: {{ this.room.data.current_user_id }} </h6>
        <h6 v-if="this.room.data.finish_type=='moves'">
            Сделано {{ this.room.data.messages_count }} ходов из {{ this.room.data.finish_moves_cond }}
        </h6>
        <h6 v-if="this.room.data.finish_type=='time'">
            Игра закончится {{ this.getDate(this.room.data.finish_time_cond) }}
        </h6>  
        <input class="startbutton" type="button" value="Присоедениться" v-on:click="EnterRoom()"/><br>
        <textarea v-model="message" rows="2" cols="38"></textarea>
            <q-btn color="primary" label="Отправить" v-on:click="SendMessage()" />
            <q-btn color="primary" label="Завершить" v-on:click="EndPoem()" />
            <q-btn round color="secondary" icon="check" /><q-icon name="print" color="teal" size="4.4em" />
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
            userIsPlayer: false,
            message: "",
            free_places: 0,
            room: {
                data: {
                    players: []
                }
            }
        }
    },
    async created() {
        try {
            let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
            this.room = Room.data;
            console.log("CREATED HOOK: " + JSON.stringify(this.room));
            this.checkUserPlayingInRoom();
            this.returnFreePlaces();
        } catch(error) {
            console.log("[InsideRoom.Created] Room not loaded. Server returns an error: " + error);
        }
    },
    activated() {
        this.data.userIsPlayer = false;
        this.data.room.data = {}
    },
    computed: {

    },
    methods: {
        async RefreshRoom() {
            try {
                let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
                this.room = Room.data;
                console.log("[REFRESH ROOM]: " + JSON.stringify(this.room));
                this.checkUserPlayingInRoom();
                this.returnFreePlaces();
            } catch(error) {
                console.error("[InsideRoom.RefreshRoom] Room not loaded. Server returns an error: " + error);
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
                console.error("[SendMessage] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EndPoem() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EndPoem, this.room.data.id);
                console.log("[EndPoem]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                console.error("[EndPoem] RoomsList not loaded. Server returns an error: " + error)
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
                console.error("[LeaveRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EnterRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EnterRoom, this.room.data.id);
                console.log("[ENTER ROOM]: " + JSON.stringify(answer));
                this.RefreshRoom();
            } catch(error) {
                console.error("[EnterRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        getDate(str) {
            var date = new Date(str);
            console.log("Date in getDate(): " + str);
            return date.toLocaleString('ru', this.options)
        },
        checkUserPlayingInRoom() {
            console.log("userIsPlayer = " + this.userIsPlayer)
            for(let player in this.room.data.players) { 
                console.log("PLAYER: " + this.room.data.players[player] + " | " + this.$store.getters.GET_ID)
                if(this.$store.getters.GET_ID == this.room.data.players[player]) {
                    console.log("[Player] User plying in this room" + ": " + this.room.data.players[player] + " = " + this.$store.getters.GET_ID);
                    this.userIsPlayer = true
                } 
            }
            console.log("userIsPlayer = " + this.userIsPlayer)
        },
        returnFreePlaces() {
            this.free_places = this.room.data.places - this.room.data.players.length;
            console.log("FreePlaces: " + this.free_places);
        }         
    }
}

</script>

<style scoped>
.other-avatars-style {
    margin: 3px;
    padding: auto;
    border-style: solid;
    border-color: rgb(49, 61, 131);
    border-width: 2px;
}
.current-avatar-style {
    margin: 3px;
    padding: auto;
    border-style: solid;
    border-color: #55b131;
    border-width: 2px;
}
</style>