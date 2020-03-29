<template>
  <div id="app" class="app" v-cloak>
    <router-view/>
  </div>
</template>
<script>
import {mapState} from "vuex";
import { Toast } from 'vant';
export default {
  name: "App",
  data() {
    return {
    };
  },
  methods:{
  },
 created(){
    let that=this;
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  font-family: $fontFamily;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  background-color:#fff;
  overflow: hidden;
  font-size: $font24;
}
</style>
