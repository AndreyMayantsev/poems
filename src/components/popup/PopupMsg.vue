<template>
    <div class="PopupMsg">
        <div class="PopupMsg_header"> 
            <span><i class="material-icons" @click="closePopup">close</i></span>
        </div>
        <div class="PopupMsg_text"> 
            <slot></slot>
        </div>
        <div class="PopupMsg_footer"> 
            <button class="okbutton" @click="closePopup">OK</button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'PopupMsg',
    methods: {
        closePopup() {
            this.$emit("closePopup");
        }
    }
}

</script>

<style scoped>
    .PopupMsg{
        z-index: 10;
        float: inline-end;
        padding: 22px;
        top: 200px;
        left: 300px;
        width: 400px;
        box-shadow: 0 0 10px 0 #111111;
        position: fixed;
        background: #b3c9db;
    }
    .PopupMsg_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .PopupMsg_text {
        display: flex;
        align-items: center;
    }
    .PopupMsg_footer {
        display: flex;
        align-items: center;
    }
    .okbutton {
        padding: 6px;
        margin: 6px;
        background-color: #5F9EA0;
        color: #fff;
        outline: 0;
        border: 0;
        border-bottom: 2px solid #00CED1;
        border-radius: 4px;
        font-size: 1.2em;
        text-align: center;
        cursor: pointer;
        width: 100px;
    }
    .okbutton:hover {
        color: #fff;
        background-color: #CE7A05;
    }
</style>