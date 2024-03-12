<template>
    <div class="NoInternetConnection">
        <WindowDefault
            caption="Ошибка!"
            text=""
        >
        <q-icon name="error" color="error" size="3rem" />
        отсутствует соединение с интернет
        </WindowDefault>
    </div>
</template>

<script>
import WindowDefault from '../uiElements/window/WindowDefault.vue'
export default {
    name: "NoInternetConnection",
    data() {
        return {

        }
    },
    components: {
        WindowDefault
    },
    methods: {

    }
}

</script>

<style scoped>

</style>