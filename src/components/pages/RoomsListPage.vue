<template>

<div class="RoomsListPage column height-wrapper-100">
        <div class="col-2"></div>
        <div class="col-8">
            <div class="row">
                <div class="col"></div>
                    <div class="col-xs-10 col-sm-8 col-md-4">
                        <q-btn class="glossy" color="secondary" label=" + Создать новую комнату" v-on:click="this.$router.push({name: 'createroom'})"/>
                        <div class="">
                            Войдите в игру или создайте новую.
                            <div class="q-gutter-sm">
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
                            </div>
                        </div>
                    </div>
                <div class="col"></div>
            </div>
        <div class="col-2"></div>
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