<template>
    <div class="RoomCreate">
        <div class="box">
            <h2>Создать комнату: </h2>

            <input type="places" size="12" v-model="places" class="defaultinput" placeholder="Мест">
            <input type="rows_visible" size="12" v-model="rows_visible" class="defaultinput" placeholder="Видно строк">
            <input type="move_duration" size="12" v-model="move_duration" class="defaultinput" placeholder="Длительность хода">
            <input type="finish_type" size="12" v-model="finish_type" class="defaultinput" placeholder="Тип завершения">
            <input type="finish_time_cond" size="12" v-model="finish_time_cond" class="defaultinput" placeholder="Время хода">
            <input type="finish_moves_cond" size="12" v-model="finish_moves_cond" class="defaultinput" placeholder="Последний ход">
            <input class="startbutton" type="button" value="Создать" v-on:click="makeRoom">

        </div>
    </div>
</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "RoomCreate",
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

            console.log("makeRoom: " + JSON.stringify(answer));
        }
    }
}

</script>

<style scoped>
    .box {
        opacity: 0.9;
        margin: 100px auto;
        text-align: center;
        background-color: #dbdab3;
        border-radius: 4px;
        width: 350px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(0,1,0,0.5);
    }
    .verifyedinput {
        border-bottom: 2px solid #13b953;
    }
    .defaultinput {
        padding: 6px;
        margin: 10px;
        background-color: #B0C4DE;
        color: #191970;
        outline: 0;
        border: 0;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
    }
    .startbutton {
        padding: 6px;
        margin: 6px;
        background-color: #5F9EA0;
        color: #fff;
        outline: 0;
        border: 0;
        border-bottom: 2px solid #00CED1;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
        width: 150px;
    }
    .startbutton:hover {
        color: #fff;
        background-color: #CE7A05;
    }
</style>