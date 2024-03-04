<template>
    <div class="RoomBanner">
        <q-btn class="center-box" push>
                <q-badge floating color="orange">{{ getDate(created_at) }}</q-badge>
                    <div v-if="this.finish_type=='moves'">   
                        <img class="border-image "
                            src="@/assets/steps.png"
                        />
                    </div>
                    <div v-else>   
                        <img class="border-image "
                            src="@/assets/times.png"
                        />
                    </div>
                    <div class="set-btn">
                        <span class="text-left text-subtitle2">№ {{ room_id }}</span><br>
                        <span class="text-lowercase text-left text-subtitle2">(Доступно)</span>
                    </div>  
        </q-btn>
    </div>
</template>

<script>

export default {
    name: 'RoomBanner',
    props: ['created_at', 'places', 'users_rooms', 'finish_type', 'room_id'],
        
    data() {
        return {
            isMovesType: false,
            options: {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric'
            }
        }
    },

    methods: {
        getDate(str) {
            var date = new Date(str);
            console.log("Date in getDate(): " + str);
            return date.toLocaleString('ru', this.options)
        }
    },
    computed: {
        finishTypeColor: function() {
            if(this.finish_type) {
                return "moves-type-color";
            } else {
                return "times-type-color";
            }
        }
    }

}

</script>

<style scoped>
    .center-box {
        max-width: 300px;
        width: 290px;
        height: 70px;
        padding: 2px;
        margin-top: 6px;
        margin-left: 3px;
    }
    .border-image {
        border-radius: 10px; 
        width: 46px; 
        height: 46px
    }
    .set-btn {
        margin: 3px;
        padding: 9px;
    }
    .moves-type-color {
        background-color: rgb(240, 216, 152);
    }
    .times-type-color {
        background-color: rgb(141, 190, 230);
    }
</style>