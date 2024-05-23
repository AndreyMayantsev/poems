<template>
    <div class="NotFound window-content">
        <WindowDefaultFlex
            caption="Ошибка!"
            text=""
        >
        <q-icon name="warning" color="warning" size="3rem" />
        Извините, страница не найдена!
        </WindowDefaultFlex>
    </div>
</template>

<script>
import WindowDefaultFlex from '../uiElements/window/WindowDefaultFlex.vue';

export default {
    name: "NotFound",
    data() {
        return {

        }
    },
    components: {
        WindowDefaultFlex
    },
    methods: {

    }
}

</script>

<style scoped>
</style>