<template>
    <div class="CreateRoomPage">
        <h1> Создать комнату </h1>
        <input type="places" size="12" v-model="places" class="defaultinput" placeholder="Мест">
            <input type="rows_visible" size="12" v-model="rows_visible" placeholder="Видно строк">
            <input type="move_duration" size="12" v-model="move_duration" placeholder="Длительность хода">
            <select v-model="finish_type">
                <option>moves</option>
                <option>time</option>
            </select>
            <input type="finish_time_cond" size="12" v-model="finish_time_cond" placeholder="Время хода">
            <input type="finish_moves_cond" size="12" v-model="finish_moves_cond" placeholder="Последний ход">
            <input type="button" value="Создать" v-on:click="makeRoom">
    </div>

</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "CreateRoomPage",
    data() {
        return {
            is_public: true,
            places: 2,
            rows_visible: 2,
            move_duration: 14000,
            finish_type: "moves",
            finish_time_cond: 60000,
            finish_moves_cond: 28
        }
    },

    methods: {
        async makeRoom() {
            let createroom = { 
                is_public: this.is_public,
                places: this.places,
                rows_visible: this.rows_visible,
                move_duration: this.move_duration,
                finish_type: this.finish_type,
                finish_time_cond: this.finish_time_cond,
                finish_moves_cond: this.finish_moves_cond                
            }
            console.log("Пытаюсь создать комнату с данными: " + JSON.stringify(createroom));
            let answer = await HttpRequestFactory.makeRequest(requestType.MakeRoom, createroom);
            this.$router.push({name: "roomslist"});
            console.log("makeRoom: " + JSON.stringify(answer));
        }
    }
}

</script>

<style scoped>
</style>