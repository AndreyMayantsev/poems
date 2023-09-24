<template>
    <div class="CreateRoomPage">
        <div class="center-box">
            Введите настройки для новой игры

            <!--
            <input type="places" size="12" v-model="places" class="defaultinput" placeholder="Мест">
            <input type="rows_visible" size="12" v-model="rows_visible" class="defaultinput" placeholder="Видно строк">
            <input type="move_duration" size="12" v-model="move_duration" class="defaultinput" placeholder="Длительность хода">
            <input type="finish_type" size="12" v-model="finish_type" class="defaultinput" placeholder="Тип завершения">
            <input type="finish_time_cond" size="12" v-model="finish_time_cond" class="defaultinput" placeholder="Время хода">
            <input type="finish_moves_cond" size="12" v-model="finish_moves_cond" class="defaultinput" placeholder="Последний ход">
            <input class="startbutton" type="button" value="Создать" v-on:click="makeRoom">
            -->
            <q-card>
                <q-tabs
                    v-model="finish_type"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    narrow-indicator
                    >
                    <q-tab name="moves" label="Ходы" />
                    <q-tab name="times" label="Время" />
                </q-tabs>

            <q-separator/>

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
                    <q-separator/>
                </div>
                <div class="q-px-lg q-pt-md">
                    <q-btn push color="primary" label="Создать" v-on:click="makeRoom"/>
                </div>

                <!-- game for steps -->

            </q-tab-panel>

            <q-tab-panel name="times">
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
                    <q-separator/>
                </div>
                <div class="q-px-lg q-pt-md">
                    <q-btn push color="primary" label="Создать" v-on:click="makeRoom"/>
                </div>

                <!-- game for times -->

            </q-tab-panel>

            </q-tab-panels>
        </q-card>

        </div>
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
    .center-box {
        margin: 20px auto;
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
</style>