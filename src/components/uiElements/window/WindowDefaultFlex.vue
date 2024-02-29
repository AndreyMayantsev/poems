<template>
    <div class="WindowDefaultFlex height-100-mobile flb">
    <div class="window-layout flb"
    :class='{"fill-page-for-mobile": this.$store.getters.GET_IS_MOBILE_VIEW}'
    >
        <div>
            <div class="window-header">
                <p class="header-font">{{ this.caption }}</p>
            </div> 
            <div class="text-font">{{ this.text }}</div>
            <div>
            <p></p>
                 <slot></slot>
            </div>
            </div>
        </div>
    </div>    
</template>

<script>

export default {
    name: "WindowDefaultFlex",
    data() {
        return {
        
        }
    },
    props: ['caption','text'],
    components: {
        
    },
    methods: {

    }
}
</script>

<style scoped>
.flb {
    display: flex;
	justify-content: center;
	align-items: center;
}
.flb-v {
    flex-direction: column;
    justify-content: center;
	align-items: center;
}
.test {
    background-color: yellow;
    padding: 2%;
	border:  4mm ridge rgba(211, 220, 50, .6);;
}
.height-100 {
	height: 100%
}
.fill-page-for-mobile {
    height: 100%;
    width: 100%;
}
.window-layout {  
    text-align: center;
    background-color: #dbcab3;
    border-radius: 4px;
    padding: 12px;
    box-sizing: border-box;
    box-shadow: 0 0 8px rgba(173, 136, 32, 0.5);
    min-width: 350px;
    max-width: 500px;
}
.window-header {  
    text-align: center;
    background-color: #dfc096;
    border-radius: 4px;
}
.menu-font {
  font-family: "LT Remark";
  font-size: 3rem;
  line-height: 1.2;
  letter-spacing: 1;
  text-decoration-style: solid;
}
.text-font {
  font-family: "LT Remark";
  font-size: 1.2rem;
  line-height: 1;
  letter-spacing: 1;
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
.height-100-mobile {
    height: 100vh;
}
</style>