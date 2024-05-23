<template>
    <div class="RoomsListPage">
        <WindowDefaultFlex
            caption="Выбор комнаты"
            text=""
        >
        <q-btn class="glossy" color="secondary" label=" + Создать новую комнату" v-on:click="this.$router.push({name: 'createroom'})"/>
                    <p></p>
                        <div class="rooms-list">
                                    <q-scroll-area 
                                    :class='{"scroll-mobile": this.$store.getters.GET_IS_MOBILE_VIEW, "scroll-desktop": !this.$store.getters.GET_IS_MOBILE_VIEW}'
                                    >
                                        <div v-for="room in rooms" :key="room.id" >
                                            <RoomBanner style="padding: 5px"
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
                        </div>
        </WindowDefaultFlex>
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import RoomBanner from '../uiElements/RoomBanner.vue'
import WindowDefaultFlex from '../uiElements/window/WindowDefaultFlex.vue';
//import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

export default {
    name: "RoomsListPage",
    components: {
        RoomBanner,
        WindowDefaultFlex
    },
    data() {
        return {
            rooms: {}
        }
    },
    methods: {
        async ShowRooms() {
            try {
            let getroom = { limit:20, offset:2 }
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
            let getroom = { limit:20, offset:2 }
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
.rooms-list {
	border:4px solid #9e64218e;
	border-radius:10px;
    background-color: #dbcab4;
	position: relative;
    padding: 5px;
}
.scroll-desktop {
    height: 45vh;
}
.scroll-mobile {
    height: 75vh;
}
</style>