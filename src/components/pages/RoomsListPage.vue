<template>
    <div class="RoomsListPage">
        <q-btn class="glossy" color="secondary" label=" + Создать новую комнату" v-on:click="this.$router.push({name: 'createroom'})"/>
        <div class="q-pa-md">
            Войдите в игру или создайте новую.
            <div class="row justify-center q-gutter-sm">
                <div v-for="room in rooms" :key="room.id" >
                    <RoomBanner 
                        :created_at = "room.created_at" 
                        :places = "room.places" 
                        :users_rooms = "room.users_rooms.length" 
                        :finish_type = "room.finish_type" 
                        :room_id = "room.id" 
                        v-on:click="$router.push({ name: 'insideroom', params: { id:room.id }})"
                    >                
                    </RoomBanner>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import RoomBanner from '../uiElements/RoomBanner.vue'

export default {
    name: "RoomsListPage",
    components: {
        RoomBanner
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