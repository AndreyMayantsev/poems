<template>
    <div class="Avatars">
                        <!-- USERS IN ROOM AVATARS -->
                                <div class="flb">
                                    <div v-for="user in this.roomusers.data">
                                        <div v-if="user.in_game && !user.playing_now">
                                            <q-avatar
                                            size="34px"
                                            class="overlapping"
                                            color="orange"
                                            >
                                            {{ user.id }}
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
                                    <div v-for="user in this.roomusers.data">
                                        <div v-if="user.playing_now">
                                            <q-circular-progress
                                                :value="this.progressStepTime"
                                                show-value
                                                class="text-white q-ma-md"
                                                size="46px"
                                                color="green"
                                                >
                                                <q-avatar
                                                    size="38px"  
                                                    class="overlapping"     
                                                    color="primary"                           
                                                    >
                                                {{ user.id }}
                                                </q-avatar>
                                            </q-circular-progress>    
                                        </div>
                                    </div>
                                </div>
    </div>
</template>

<script>

export default {
    name: 'Avatars',
    props: {
        roomusers: {}
    },
        
    data() {
        return {
            progressStepTime: 1,
            lastMessageTime: 0,
            timer: null
        }
    },
    created() {
        console.log('AVATARS: ' + JSON.stringify(this.roomusers));    
        this.timer = this.countDown();
    },
    mounted() {
        console.log('AVATARS: ' + JSON.stringify(this.roomusers));    
        this.setStepTime();
        console.log("Starting timer: " + this.timer);
    },
    activated() {
        this.setStepTime();
    },
    unmounted() {
        console.log("Stoping timer " + this.timer);
        clearInterval(this.timer);
    },
    methods: {
        setStepTime() {
            this.lastMessageTime = new Date(this.roomusers.last_message_at).getTime();
            const now_time = new Date().getTime();
            const max_message_time = new Date(this.lastMessageTime).getTime() + (this.roomusers.move_duration * 60000);
            console.log("Время последнего хода: " + this.lastMessageTime);
            console.log("Текущее время: " + now_time);
            console.log("Время окончания хода: " + max_message_time + " + " + this.roomusers.move_duration * 60000);
            let percent = (max_message_time - this.lastMessageTime) / 100
            this.progressStepTime = 100 - (( now_time - this.lastMessageTime ) / percent);
        },
        countDown() {
            // TODO
            // Как то сообразить обновлеиие процента после хода 
            // Отключать таймер при выходе из комнаты
            // Правильно расчитывать процент окончания хода
            // Учитывать часовой пояс (?)
            return setInterval(() => {
                if (this.progressStepTime >= 0) {
                    this.setStepTime();
                    //this.countDown();
                    console.log("--- timer ---: " + this.progressStepTime);
                    console.log("--- users ---: " + JSON.stringify(this.roomusers));
                } else {
                    clearInterval(this.timer);
                }                 
            }, 10000);      
        }
    }

}

</script>

<style scoped>
    .avatars-positions {
        margin: 3px;
        padding: 3px;
    }
    .moves-type-color {
        background-color: rgb(240, 216, 152);
    }
    .times-type-color {
        background-color: rgb(141, 190, 230);
    }
</style>