<template>
    <div class="MenuButton">
        
        <!-- In props awaiting event name to emit is in parent component -->
        <q-btn text-color="white" :label=this.caption class="menu-font" style="background-color: #9D5734; padding: 10px; height: 60px; width: 250px" push></q-btn>
                    
    </div>
</template>

<script>
export default {
    name: "MenuButton",
    data() {
        return {

        }
    },
    props: ['caption'],
    methods: {

    }
}
</script>

<style>

</style>