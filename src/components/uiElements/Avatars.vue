<template>
    <div class="Avatars">
                        <!-- USERS IN ROOM AVATARS -->
                                <div class="flb">
                                    <div v-for="user in this.roomusers.data">
                                        <div v-if="user.playing_now">
                                            <q-circular-progress
                                                :value="this.progressStepTime"
                                                show-value
                                                class="text-white q-ma-md"
                                                size="40px"
                                                color="orange"
                                                >
                                                <q-avatar
                                                    size="34px"  
                                                    class="overlapping"     
                                                    color="primary"                           
                                                    >
                                                {{ user.id }}
                                                </q-avatar>
                                            </q-circular-progress>    
                                        </div>
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
            progressStepTime: 0.9,
            roomUsers: []
        }
    },
    mounted() {
        console.log('AVATARS: ' + JSON.stringify(this.roomUsers));
        console.log('AVATARS: ' + JSON.stringify(this.roomusers));
    },
    activated() {
        console.log('AVATARS: ' + JSON.stringify(this.roomUsers));
        console.log('AVATARS: ' + JSON.stringify(this.props));
    },
    methods: {
        setStepTime() {
            const dateAt = new Date(this.room.data.updated_at);
            const date = new Date();
            this.progressStepTimeMin = dateAt.getTime();
            this.progressStepTimeMax = this.progressStepTimeMin + (this.room.data.move_duration * 1000);
            console.log("Time min / max: " + this.progressStepTimeMin + " / " + this.progressStepTimeMax);
            this.progressStepTime = date.getTime();
            console.log("Time now: " + this.progressStepTime);
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