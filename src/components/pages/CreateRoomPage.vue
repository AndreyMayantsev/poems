<template>

<div class="CreateRoomPage">

    <WindowDefaultFlex
            caption="Новая игра"
            text=""
        >
            <q-separator/>
            <q-card>
                                <q-tabs
                                    v-model="finish_type"
                                    dense
                                    class="text-grey"
                                    active-color="primary"
                                    indicator-color="primary"
                                    narrow-indicator
                                    >
                                    <q-tab name="moves" label="Ходы" />
                                    <q-tab name="time" label="Время" />
                                </q-tabs>
                            <q-tab-panels v-model="finish_type" animated>
                            <q-tab-panel name="moves">
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
                                </div>
                                <div class="q-px-lg q-pt-md">
                                <SimpleButton class="padding-el" caption="Создать" v-on:click="makeRoom"></SimpleButton>
                                </div>
                            </q-tab-panel>
                            <q-tab-panel name="time">
                                <img class="border-image "
                                    src="@/assets/times.png"
                                /><br>
                                Игра завершается по прошествии определенного времени, стихотворение публикуется.
                                <!-- game for times -->
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
                                    v-model="finish_time_cond"
                                    :min="10"
                                    :max="180"
                                    />
                                    <q-badge>Длительность игры (минут): {{ finish_time_cond }}</q-badge>
                                    
                                </div>
                                <div class="q-px-lg q-pt-md">
                                <SimpleButton class="padding-el" caption="Создать" v-on:click="makeRoom"></SimpleButton>
                                </div>
                            </q-tab-panel>
                            </q-tab-panels>
                        </q-card>

        </WindowDefaultFlex>
</div>

</template>

<script>
import { HttpRequestFactory } from '../../Core-prod/api/requests/HttpRequestFactory';
import { requestType } from '../../Core-prod/api/dataTypes';
import WindowDefaultFlex from '../uiElements/window/WindowDefaultFlex.vue';
import SimpleButton from '../uiElements/buttons/SimpleButton.vue';

export default {
    name: "CreateRoomPage",
    data() {
        return {
            is_public: true,
            places: 3,
            rows_visible: 2,
            move_duration: 60,
            finish_type: "moves",
            finish_time_cond: 60000,
            finish_moves_cond: 28
        }
    },
    components: {
        WindowDefaultFlex,
        SimpleButton
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
            console.log("MakeRoom: " + JSON.stringify(answer));
            let makedRoom = answer.data.data.id;
            this.$router.push({name: "insideroom", params: { id: makedRoom }});
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
.padding-el {
    padding: 1px;
}
</style>