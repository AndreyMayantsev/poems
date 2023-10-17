<template>
    <div class="fixed-center">
        <q-card class="max-width-form center-box">
            <div class="flex-box paddings">Приветсвуем в игре №{{ this.room.data.id }}  
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

                <!-- USERS IN ROOM AVATARS -->
                <div class="flex-box q-pa-md q-gutter-sm">
                    <div v-for="user in this.roomUsers">
                        <div v-if="user.playing_now">
                            <q-avatar
                            size="32px"
                            class="overlapping"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
                            {{ user }}
                            <q-badge rounded color="green" floating/>
                            </q-avatar>
                        </div>
                        <div v-if="user.in_game & !user.playing_now">
                            <q-avatar
                            size="32px"
                            class="overlapping"
                            >
                            <img :src="`https://cdn.quasar.dev/img/avatar3.jpg`">
                            {{ user }}
                            </q-avatar>
                        </div>
                        <div v-if="!user.in_game">
                            <q-avatar
                            size="32px"
                            class="overlapping"
                            icon="star"
                            >
                            +
                            </q-avatar>                           
                        </div>
                    </div>
                </div>
            <q-separator/>
            
            <!-- Await players for game -->
            <div v-if="!this.gameStarted" class="paddings">
                <p></p> 
                <q-spinner-clock
                    color="primary"
                    size="5em"
                    />
                <q-tooltip :offset="[0, 8]">QSpinnerClock</q-tooltip>
                <p></p>    
                <p>Ожмдаются игроки!</p>
            </div>

            <!-- Another player wrtten poem now -->
            
            <!-- Current player in game -->
            <!-- Poems messages as a chat -->    
            <div v-if="this.gameStarted" class="q-pa-md row justify-center paddings">
                <q-chat-message
                    name="Предыдущий игрок: "
                    :text="['Привет привет!\n Стишок в ответ!']"
                />

                <q-separator/>
                <p>Ваш ход, сэр!</p>
                <p></p>  
                <textarea v-model="message" rows="2" cols="28"></textarea>
                <q-btn color="primary" icon="check" v-on:click="SendMessage()" />
            </div>

        </q-card>

        <!-- <h4> Играют пользователи ({{ this.room.data.players.length }} из {{ this.room.data.places }}): </h4> -->

        <h6> Ход игрока: {{ this.room.data.current_user_id }} </h6>
        <h6 v-if="this.room.data.finish_type=='moves'">
            Сделано {{ this.room.data.messages_count }} ходов из {{ this.room.data.finish_moves_cond }}
        </h6>
        <h6 v-if="this.room.data.finish_type=='time'">
            Игра закончится {{ this.getDate(this.room.data.finish_time_cond) }}
        </h6>  
        <textarea v-model="message" rows="2" cols="18"></textarea>
            <q-btn color="primary" icon="check" label="Отправить" v-on:click="SendMessage()" />
            <q-btn color="primary" label="Завершить" v-on:click="EndPoem()" />
            <q-btn round color="secondary" icon="check" /><q-icon name="print" color="teal" size="4.4em" />
            <input class="startbutton" type="button" value="Отправить" v-on:click="SendMessage()"/>
   
        </div>

</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import { ConsoleLogger } from '../../Core-prod/Logger/ConsoleLogger'

let logger = new ConsoleLogger("INSIDE ROOM");

export default {
    name: "InsideRoomPage",
    data() {
        return {
            userIsPlayer: false,
            gameStarted: false,
            message: "",
            roomUsers: [],
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
            logger.writeLogInfo("CREATED HOOK: " + JSON.stringify(this.room));
            this.checkUserPlayingInRoom();
            this.composeRoomUsers();
            this.isGameStarted();
        } catch(error) {
            logger.writeLogError("[InsideRoom.Created] Room not loaded. Server returns an error: " + error);
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
                logger.writeLogInfo("[REFRESH ROOM]: " + JSON.stringify(this.room));
                this.checkUserPlayingInRoom();
                this.composeRoomUsers();
                this.isGameStarted();
            } catch(error) {
                logger.writeLogError("[InsideRoom.RefreshRoom] Room not loaded. Server returns an error: " + error);
            }
        },
        async SendMessage() {
            let messageBody = { message: this.message };
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.SendMessage, messageBody, this.room.data.id);
                this.message = "";
                logger.writeLogInfo("[SendMessage]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                logger.writeLogError("[SendMessage] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EndPoem() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EndPoem, this.room.data.id);
                logger.writeLogInfo("[EndPoem]: " + JSON.stringify(answer));
                this.RefreshRoom()
            } catch(error) {
                logger.writeLogError("[EndPoem] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async LeaveRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.LeaveRoom, this.room.data.id);
                logger.writeLogInfo("[LeaveRoom]: " + JSON.stringify(answer));
                if (answer.data.success == true) {
                    this.$router.push({ name: "roomslist" });
                }
            } catch(error) {
                logger.writeLogError("[LeaveRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        async EnterRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EnterRoom, this.room.data.id);
                logger.writeLogInfo("[ENTER ROOM]: " + JSON.stringify(answer));
                this.RefreshRoom();
                this.composeRoomUsers();
            } catch(error) {
                logger.writeLogError("[EnterRoom] RoomsList not loaded. Server returns an error: " + error)
            }
        },
        getDate(str) {
            var date = new Date(str);
            logger.writeLogInfo("Date in getDate(): " + str);
            return date.toLocaleString('ru', this.options)
        },
        checkUserPlayingInRoom() {
            logger.writeLogInfo("userIsPlayer = " + this.userIsPlayer)
            for(let player in this.room.data.players) { 
                logger.writeLogInfo("PLAYER: " + this.room.data.players[player] + " | " + this.$store.getters.GET_ID)
                if(this.$store.getters.GET_ID == this.room.data.players[player]) {
                    logger.writeLogInfo("[Player] User plying in this room" + ": " + this.room.data.players[player] + " = " + this.$store.getters.GET_ID);
                    this.userIsPlayer = true
                } 
            }
            logger.writeLogInfo("userIsPlayer = " + this.userIsPlayer)
        },
        composeRoomUsers() {
            let _usersList = []
            logger.writeLogInfo("Максимально пользователей " + this.room.data.places);
            logger.writeLogInfo("Пользователи в игре " + this.room.data.players)
            for(let user in this.room.data.players) {
                let _tmpUser = {
                    id: this.room.data.players[user],
                    in_game: true,
                    playing_now: this.room.data.players[user] == this.room.data.current_user_id ? true : false
                }
                logger.writeLogInfo("REAL USER " + JSON.stringify(_tmpUser));
                _usersList.push(_tmpUser);
            }
            for(let i = 1; i < this.room.data.places - this.room.data.players.length + 1; i++) {
                let _tmpUser = {
                    id: 0,
                    in_game: false,
                    playing_now: false
                 }
                _usersList.push(_tmpUser);
            }
            logger.writeLogInfo("Список пользователей " + JSON.stringify(_usersList));
            this.roomUsers = _usersList;
        },
        isGameStarted() {
            this.gameStarted = this.room.data.places === this.room.data.players.length ? true : false;
            logger.writeLogInfo("GAME STATE: " + this.gameStarted);
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
.paddings {
    margin: 3px;
    padding: 3px;
}
</style>