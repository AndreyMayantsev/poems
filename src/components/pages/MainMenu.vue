<template  v-on:enter-a-game="enterAGame()">
    <WindowDefault caption="Привет!" text="Создайте новую поэму или присоеденитесь к написанию существующей">
        <MenuButton caption="Присоедениться" v-on:click="enterAGame()"></MenuButton>
        <MenuButton caption="Создать новую поэму" v-on:click="enterAGame()"></MenuButton>
    </WindowDefault>

</template>

<script>
import MenuButton from '../uiElements/buttons/MenuButton.vue'
import WindowDefault from '../uiElements/window/WindowDefault.vue';

export default {
    name: "MainMenu",
    data() {
        return {
        
        }
    },
    components: {
        MenuButton,
        WindowDefault
    },
    methods: {
        enterAGame() {
            console.log('Получено событие входа в игру');
        }
    }
}
</script>

<style>

.menu-button {
        background-color: #9D5734;
        color: #fff;
        outline: 0;
        border: 0;
        border-left: 3px solid #b66b46;
        border-radius: 4px;
        font-size: 2.2em;
        text-align: center;
        cursor: pointer;
}
.menu-button:hover {
        color: #fff;
        background-color: #CE7A05;
}
.menu-button.click::after {
        color: #fff;
        background-color: #ccb595;
}
</style>