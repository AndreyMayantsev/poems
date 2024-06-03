<template>

    <div class="FinishedGamePage">
    
        <div class="">
            <WindowDefaultFlex
                caption="Игра завершена!"
                text=""
            >
                <q-card class="padding-default" style="background-color: #dfc096;">

                                <q-separator/>
                                <div class="">
                                        <q-scroll-area style="height: 60vh;">
                                            <div v-for="string in this.finishedPoem" class="header-font-micro">
                                                <span >{{ string }}</span>
                                            </div>
                                        </q-scroll-area>
                                </div>
                                <q-separator/>

                                <!-- USERS IN ROOM AVATARS -->
                                    <div class="flb padding-half">
                                        <div v-for="user in this.roomUsers">
                                            <q-avatar
                                                size="32px"  
                                                class="overlapping"   
                                                style="margin: 5px"                              
                                                >
                                                <img :src="`https://cdn.quasar.dev/img/avatar1.jpg`">
                                                {{ user }}
                                            </q-avatar>

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
    
    
    let logger = new ConsoleLogger("INSIDE ROOM");
    
    export default {
        name: "FinishedGamePage",
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
                nowPoemStrings: ["*** ***** *****","* **** *** ********"],
                finishedPoem: [],
                gameProgressInPercent: 0.9,
                progressStepTime: 0.4
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
                this.EndPoem();
            } catch(error) {
                logger.writeLogError("[InsideRoom.Created] Room not loaded. Server returns an error: " + error);
            }
        },
        activated() {

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
                    this.gameProgressInPercent = GameProcessor.calculateGameProgressPercent(this.room.data);
                    this.EndPoem();
                } catch(error) {
                    logger.writeLogError("[InsideRoom.RefreshRoom] Room not loaded. Server returns an error: " + error);
                }
            },
            async EndPoem() {
                try {
                    let answer = await HttpRequestFactory.makeRequest(requestType.EndPoem, this.room.data.id);
                    logger.writeLogInfo("[EndPoem]: " + JSON.stringify(answer));
                    this.finishedPoem = answer.data.data.poem.split("\n");
                    logger.writeLogInfo(this.finishedPoem);
                } catch(error) {
                    logger.writeLogError("[EndPoem] RoomsList not loaded. Server returns an error: " + error)
                }
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
            },
            async letsStart() {
                let started = await HttpRequestFactory.makeRequest(requestType.StartRoom, this.$route.params.id);
                logger.writeLogInfo("Игра началась в: " + JSON.stringify(started))
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
        border-color: #e0953e;
        border-width: 2px;
    }
    .previous-message {
        border:4px solid #9e64218e;
        border-radius:10px;
        height:auto;
        width:99%;
        background-color: #dbcab4;
        position:relative;
        padding: 5px;
    }
    .previous-message-font {
        font-family: "Marck Script";
        font-size: 1.4rem;
        line-height: .6;
        letter-spacing: .1;
        text-decoration-style: solid;
    }
    </style>