<template>
    <div class="InsideRoomPage">
        <h1> Внутри комнаты {{ roomid }}</h1>
    </div>
</template>

<script>

import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "InsideRoomPage",
    data() {
        return {
            roomid: null,
            created_at: null,
            updated_at: null,
            is_public: null,
            places: null,
            rows_visible: null,
            move_duration: null,
            finish_type: null,
            finish_time_cond: null,
            finish_moves_cond: null,
            players:[],
            messages_count: null,
            current_user_id: null,
            users_rooms:[]
        }
    },
    created() {
       this.roomid = this.$route.params.id;
       this.openRoom();
    },
    methods: {
                // Id of this rum must be set
        async openRoom() {
            try {
                let answer = await HttpRequestFactory.makeRequest(requestType.EnterRoom, this.roomid);
                console.log("INSIDE: " + JSON.stringify(answer));
            } catch(error) {
                console.log("[RoomsList] RoomsList not loaded. Server returns an error: " + error)
            }
        }
    }
}

</script>

<style scoped>
</style>