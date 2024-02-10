<template>

    <div class="CreateRoomPageRedesign column height-wrapper-100">
        <div class="col-xs-1 col-sm-2 col-md-3"></div>
            <div class="row">
                <div class="col-xs-8 col-sm-4 col-md-2">

                    <div class=""> 

                        <img class="border-image "
                                    src="@/assets/steps.png"
                                /><br>
                                Игра завершается после определенного количества шагов, стихотворение публикуется.
                                <!-- game for steps -->
                                <div class="q-px-lg q-pt-md">
                                    <q-slider
                                    v-model="places"
                                    :min="3"
                                    :max="8"
                                    />
                                    <q-badge>Количество игроков: {{ places }}</q-badge>
                                </div>
                                <div class="q-px-lg q-pt-md">
                                    <q-slider
                                    v-model="rows_visible"
                                    :min="1"
                                    :max="4"
                                    />
                                    <q-badge>Количество видимых строк: {{ rows_visible }}</q-badge>
                                </div>
                                <div class="q-px-lg q-pt-md">
                                    <q-slider
                                    v-model="move_duration"
                                    :min="1"
                                    :max="60"
                                    />
                                    <q-badge>Длительность хода (минут): {{ move_duration }}</q-badge>
                                </div>
                                <div class="q-px-lg q-pt-md">
                                    <q-slider
                                    v-model="finish_moves_cond"
                                    :min="1"
                                    :max="60"
                                    />
                                    <q-badge>Количество ходов: {{ finish_moves_cond }}</q-badge>
                                    <q-separator/>
                                </div>
                                <div class="q-px-lg q-pt-md">
                                    <q-btn push color="primary" label="Создать" v-on:click="makeRoom"/>
                                </div>

                    </div>    

                </div>
            </div>
        <div class="col-xs-1 col-sm-2 col-md-3"></div>
    </div>
 
</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';

export default {
    name: "CreateRoomPageRedesign",
    data() {
        return {
            is_public: true,
            places: 3,
            rows_visible: 2,
            move_duration: 60,
            finish_type: "moves",
            finish_time_cond: 60000,
            finish_moves_cond: 28,
            slide: 'first'
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
    .center-box {
        margin: auto;
        text-align: center;
        border-radius: 4px;
        padding: 10px;
        max-width: 330px;
    }
    .border-image {
        border-radius: 10px; 
        width: 48px; 
        height: 48px
    }
    .custom-caption {
        text-align: center;
        padding: 12px;
        color: white;
        background-color: rgba(0, 0, 0, .3)
    }
</style>