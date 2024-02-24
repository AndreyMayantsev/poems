<template>
    <div class="NotFound">
        <WindowDefault
            caption="Ошибка!"
            text=""
        >
        <q-icon name="warning" color="warning" size="3rem" />
        Извините, страница не найдена!
        </WindowDefault>
    </div>
</template>

<script>
import WindowDefault from '../uiElements/window/WindowDefault.vue';

export default {
    name: "NotFound",
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