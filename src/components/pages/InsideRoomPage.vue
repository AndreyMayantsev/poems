<template>

<div class="InsideRoomPage">

    <div class="">
        <WindowDefaultFlex
            caption="В игре!"
            text=""
        >
            <q-card class="padding-default" style="background-color: #dfc096;">
                            <div>Приветсвуем в игре №{{ this.room.data.id }} </div>   
                            <q-separator/>
                                <!-- USERS IN ROOM AVATARS -->
                                <div class="flb padding-default">
                                    <div v-for="user in this.roomUsers">
                                        <div v-if="user.playing_now">
                                            <q-circular-progress
                                                :value="this.progressStepTime"
                                                show-value
                                                class="text-light-blue q-ma-md"
                                                size="40px"
                                                color="orange"
                                                >
                                                <q-avatar
                                                    size="32px"  
                                                    class="overlapping"                                 
                                                    >
                                                    <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
                                                    {{ user }}
                                                </q-avatar>
                                            </q-circular-progress>    
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
                            <div class="">

                                <!-- GAME CREATED -->
                                <div v-if="this.gameState == this.gameStates.GAME_CREATED"><p>Новая игра</p>
                                    <q-btn push color="primary" label="Присоедениться" v-on:click="EnterRoom()"/>
                                </div> 

                                <!-- GAME AWAIT ANOTHER PLAYERS -->
                                <div v-if="this.gameState == this.gameStates.GAME_AWAIT_ANOTHER_PLAYERS"><p>Вы присоединились! Мы ждем еще игроков...</p>
                                    <q-spinner-clock
                                    color="primary"
                                    size="5em"
                                    /><br><br>
                                    <q-btn push color="primary" label="Покинуть комнату" v-on:click="LeaveRoom()"/>
                                </div> 

                                <!-- GAME AWAIT ME -->
                                <div v-if="this.gameState == this.gameStates.GAME_AWAIT_ME"><p>Мы ждем еще игроков. Например тебя :)</p>
                                    <q-spinner-clock
                                    color="primary"
                                    size="5em"
                                    /><br><br>
                                    <q-btn push color="primary" label="Присоедениться" v-on:click="EnterRoom()"/>
                                </div>  

                                <!-- GAME ANOTHER PLAYER TURN -->
                                <div class="" v-if="this.gameState == this.gameStates.GAME_GOES_ANOTHER_PLAYERS_TURN">
                                    <p>Ход другого игрока: {{ this.room.data.current_user_id }}</p>
                                    <q-spinner-clock
                                    color="primary"
                                    size="5em"
                                    /><br><br>
                                    <q-btn push color="primary" label="Покинуть комнату" v-on:click="LeaveRoom()"/>
                                    <q-btn push color="primary" label="Стих" v-on:click="EndPoem()"/>

                                </div>

                                <!-- GAME MY TURN -->
                                <div v-if="this.gameState == this.gameStates.GAME_GOES_MY_TURN"><p>Ходите!</p>
                                    <!-- Poems messages as a chat -->    
                                    <div class="q-pa-md">
                                        <q-chat-message
                                            name="Предыдущий игрок: "
                                            :text="this.nowPoemStrings"
                                        />
                                    </div>
                                    <div class="flb">    
                                        <q-separator/>
                                        <textarea v-model="message" rows="2" cols="18"></textarea>
                                        <q-btn color="primary" icon="check" label="" v-on:click="SendMessage()" />
                                    </div>
                                </div>

                                <!-- GAME ENDED -->
                                <div v-if="this.gameState == this.gameStates.GAME_ENDED">
                                    <p>Игра завершена</p>
                                    <q-scroll-area style="height: 40vh;">
                                        
                                    </q-scroll-area>
                                </div>
                            </div>
                        </q-card>
        </WindowDefaultFlex>
    </div>

</div>

</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import { ConsoleLogger } from '../../Core-prod/Logger/ConsoleLogger';
import { GameProcessor, gameStates } from '../../Core-prod/gameProcesses/GameProcesses';
import WindowDefaultFlex from '../uiElements/window/WindowDefaultFlex.vue';
//import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

let logger = new ConsoleLogger("INSIDE ROOM");

export default {
    name: "InsideRoomPage",
    data() {
        return {
            gameState: gameStates.GAME_CREATED, 
            userIsPlayer: false,
            gameStarted: false,
            message: "",
            roomUsers: [],
            room: {
                data: {
                    players: []
                }
            },
            gameStates: gameStates,
            nowPoemStrings: [],
            endedPoem: [],
            progressStepTimeMin: 0,
            progressStepTimeMax: 0,
            progressStepTime: 8
        }
    },
    components: {
        WindowDefaultFlex
    },
    async created() {
        try {
            let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
            this.room = Room.data;
            logger.writeLogInfo("CREATED HOOK: " + JSON.stringify(this.room));
            this.gameState = GameProcessor.checkGameState(this.room.data, this.$store.getters.GET_ID);
            this.composeRoomUsers();
            
            // --- join websocket --- //

            let roomChannel = "poem_room_" + this.room.data.id +  "_user_" + this.$store.getters.GET_ID;
            logger.writeLogInfo("[WS] Подписываемся на канал: " + roomChannel);
            window.Echo.channel(roomChannel)
            .listen(".App\\Websockets\\Events\\RoomMessage", (ev)=> {
                console.log("Получено: " + JSON.stringify(ev));
                this.RefreshRoom();
                if(ev.message != null) {
                    this.nowPoemStrings = ev.message.split("\n");
                }
            });

            logger.writeLogInfo("[GAME STATE]: " + GameProcessor.checkGameState(this.room.data, this.$store.getters.GET_ID));
            this.setStepTime();
        } catch(error) {
            logger.writeLogError("[InsideRoom.Created] Room not loaded. Server returns an error: " + error);
        }
    },
    activated() {
        this.data.userIsPlayer = false;
        this.data.room.data = {}
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        async RefreshRoom() {
            try {
                let Room = await HttpRequestFactory.makeRequest(requestType.RoomGet, this.$route.params.id);
                this.room = Room.data;
                logger.writeLogInfo("[REFRESH ROOM]: " + JSON.stringify(this.room));
                logger.writeLogInfo("This game state is: " + GameProcessor.checkGameState(this.room.data, this.$store.getters.GET_ID));
                this.gameState = GameProcessor.checkGameState(this.room.data, this.$store.getters.GET_ID);
                this.composeRoomUsers();
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
        setStepTime() {
            const dateAt = new Date(this.room.data.updated_at);
            const date = new Date();
            this.progressStepTimeMin = dateAt.getTime();
            this.progressStepTimeMax = this.progressStepTimeMin + (this.room.data.move_duration * 1000);
            console.log("Time min / max: " + this.progressStepTimeMin + " / " + this.progressStepTimeMax);
            this.progressStepTime = date.getTime();
            console.log("Time now: " + this.progressStepTime);
            //one_percent
        },

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
    border-color: #e0953e;
    border-width: 2px;
}

</style>