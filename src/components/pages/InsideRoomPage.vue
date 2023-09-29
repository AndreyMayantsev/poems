<template>
    <div class="InsideRoomPage fixed-center">
        
        <q-card class="max-width-form center-box">

            Приветсвуем в игре №{{ this.room.data.id }}            
            <q-separator/>

            <div v-if="this.room.data.players.length > 0">
                <!-- USERS IN ROOM AVATARS -->
                <div class="flex-box">
                    <div v-for="user in this.room.data.players" >
                        <div v-if="user == this.room.data.current_user_id" class="q-pa-md q-gutter-sm" style="height: 60px">
                            <q-avatar
                            size="36px"
                            class="overlapping"
                            style="border: 3px solid rgb(29, 180, 29);"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
                            {{ user }}
                            </q-avatar>
                        </div>
                        <div v-if="user != this.room.data.current_user_id" class="q-pa-md q-gutter-sm" style="height: 60px">
                            <q-avatar
                            size="32px"
                            class="overlapping"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`">
                            {{ user }}
                            </q-avatar>
                        </div>
                     </div>
                     <q-space />

                     <!-- MENU IN HEAD OF FORM -->
                     <div class="q-pa-md q-gutter-md">
                        <q-btn color="primary" label="+" icon="home">
                        <q-menu auto-close>
                            <q-list style="min-width: 100px">
                            <q-item clickable>
                                <q-item-section>Присоединиться</q-item-section>
                            </q-item>
                            <q-item clickable>
                                <q-item-section>Покинуть комнату</q-item-section>
                            </q-item>
                            <q-separator />
                            </q-list>
                        </q-menu>
                        </q-btn>
                    </div>

                </div>
            </div>
            <div v-if="this.room.data.players.length == 0">
                    В комнате пока нет участников
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

        <h4> Ход игрока: {{ this.room.data.current_user_id }} </h4>
        <h4 v-if="this.room.data.finish_type=='moves'">
            Сделано {{ this.room.data.messages_count }} ходов из {{ this.room.data.finish_moves_cond }}
        </h4>
        <h4 v-if="this.room.data.finish_type=='time'">
            Игра закончится {{ this.getDate(this.room.data.finish_time_cond) }}
        </h4>  
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
            console.log("INSIDE ROOM: " + JSON.stringify(this.room));
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
        getDate(str) {
            var date = new Date(str);
            console.log("Date in getDate(): " + str);
            return date.toLocaleString('ru', this.options)
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