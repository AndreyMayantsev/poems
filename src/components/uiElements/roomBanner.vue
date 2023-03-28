<template>
    <div class="roomBanner">
        <q-btn color="deep-orange" push>
            <div class="row items-center no-wrap">
            <q-icon left name="map" />
                <div class="text-center">
                    Свободно {{ places }} мест<br> 
                </div>
            </div>
        </q-btn>
    </div>
</template>

<script>

export default {
    name: "roomBanner",
    props: ['created_at', 'places', 'users_rooms', 'finish_type'],
    data() {
        return {

        }
    },

    methods: {

    }
}

</script>

<style scoped>

</style>