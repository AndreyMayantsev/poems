<template>
    <div class="WindowDefault column height-wrapper-100">
        <div class="col-xs-0 col-sm-2 col-md-2"></div>
        <div class="row col-xs-12 col-sm-8 col-md-8">
            <div class="col-xs-0 col-sm-2 col-md-4"></div>
                <div class="col-xs-12 col-sm-8 col-md-4">
                    <div class="window-layout flb-v">
                        <div class="window-header">
                            <p class="header-font">{{ this.caption }}</p>
                        </div> 
                        <p class="text-font">{{ this.text }}</p>
                        <slot></slot>
                    </div>
                </div>
                <div class="col-xs-0 col-sm-2 col-md-4"></div>
            </div>
        <div class="col-xs-0 col-sm-2 col-md-2"></div>
    </div>
</template>

<script>

export default {
    name: "WindowDefault",
    data() {
        return {
        
        }
    },
    props: ['caption','text'],
    components: {
        
    },
    methods: {
        enterAGame() {
            console.log('Получено событие входа в игру');
        }
    }
}
</script>

<style scoped>
.window-layout {  
    text-align: center;
    background-color: #dbcab3;
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 0 8px rgba(173, 136, 32, 0.5);
}
.window-header {  
    text-align: center;
    background-color: #dfc096;
    border-radius: 4px;
}
.menu-font {
  font-family: "LT Remark";
  font-size: 3.8rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
}
.text-font {
  font-family: "LT Remark";
  font-size: 1.2rem;
  line-height: .8;
  letter-spacing: 0;
  text-decoration-style: solid;
}
.header-font {
  font-family: "Marck Script";
  font-size: 3.5rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
}
.header-font-mini {
  font-family: "Marck Script";
  font-size: 1.8rem;
  line-height: .9;
  letter-spacing: 0;
  text-decoration-style: solid;
}
.flb-v {
    display: block;
	justify-content: center;
	align-items: center;
}
</style>