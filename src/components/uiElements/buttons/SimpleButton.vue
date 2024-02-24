<template>
    <div class="SimpleButton">
        
        <!-- In props awaiting event name to emit is in parent component -->
        <q-btn text-color="white" :label=this.caption class="menu-font" style="background-color: #9D5734; padding: 6px; height: 30px; width: 150px" push></q-btn>
                    
    </div>
</template>

<script>
export default {
    name: "SimpleButton",
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