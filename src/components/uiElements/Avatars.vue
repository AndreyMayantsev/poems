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
            progressStepTime: 80,
            roomUsers: []
        }
    },
    created() {
        console.log('AVATARS: ' + JSON.stringify(this.roomusers));    
        this.setStepTime()
   
    },
    mounted() {
        console.log('AVATARS: ' + JSON.stringify(this.roomusers));    
        this.setStepTime()
        this.countDown() 
    },
    activated() {

    },
    methods: {
        setStepTime() {
            const last_message_time = new Date(this.roomusers.last_message_at).getTime();
            const now_time = new Date().getTime();
            const max_message_time = new Date(last_message_time).getTime() + (this.roomusers.move_duration * 1000);
            console.log("TIME = [ min | now | max ]: " + last_message_time + " | " + now_time + " | " + max_message_time);
            let percent = (max_message_time - last_message_time) / 100
            console.log("PERCENT CALC = " + percent + " | " + (now_time - last_message_time));
            let pr_percent = ( now_time - last_message_time ) / percent;
            console.log("prPERCENT = " + pr_percent);

            return pr_percent

        },
        countDown() {
            // TODO
            // Отключать таймер при выходе из комнаты
            // Правильно расчитывать провцент окончания хода
            // Учитывать часовой пояс (?)
            return setTimeout(() => {
                if (this.setStepTime() <= 100) {
                    this.countDown();
                }                
                console.log("--- timer ---: ");
            }, 6000);      
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