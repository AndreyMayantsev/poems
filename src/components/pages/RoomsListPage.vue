<template>
        <WindowDefault
            caption="Выбор"
            text=""
        >
        <q-btn class="glossy" color="secondary" label=" + Создать новую комнату" v-on:click="this.$router.push({name: 'createroom'})"/>
                        <div class="">
                            <div class="q-gutter-sm">
                                <div class="q-ma-md">
                                    <q-separator/>
                                    <q-scroll-area style="margin: 0; height: 40vh;">
                                    <div v-for="room in rooms" :key="room.id" >
                                        <RoomBanner 
                                            :created_at = "room.created_at" 
                                            :places = "room.places" 
                                            :users_rooms = "room.room_users.length" 
                                            :finish_type = "room.finish_type" 
                                            :room_id = "room.id" 
                                            v-on:click="$router.push({ name: 'insideroom', params: { id:room.id }})"
                                        >                
                                        </RoomBanner>
                                    </div>
                                </q-scroll-area>
                                <q-separator/>
                            </div>
                            </div>
                        </div>
        </WindowDefault>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import RoomBanner from '../uiElements/RoomBanner.vue'
import WindowDefault from '../uiElements/window/WindowDefault.vue';
//import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

export default {
    name: "RoomsListPage",
    components: {
        RoomBanner,
        WindowDefault
    },
    data() {
        return {
            rooms: {}
        }
    },
    methods: {
        async ShowRooms() {
            try {
            let getroom = { limit:14, offset:0 }
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            this.rooms = {
                ...answer.data.data
            }
            console.log("ROOMS: " + JSON.stringify(this.rooms));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error);
                this.$router.push({ name: "auth" });
            }
        },
    },
    async created() {
        try {
            let getroom = { limit:14, offset:0 }
            let answer = await HttpRequestFactory.makeRequest(requestType.RoomsGet, getroom);
            this.rooms = {
                ...answer.data.data
            }
            console.log("ROOMS: " + JSON.stringify(this.rooms));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
        }       
    }
}

</script>

<style scoped>
</style>