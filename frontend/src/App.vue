<template>
  <v-app id="app">
      <span class="bg"/> 
      <Home/>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',

  components: {
    Home,
  },

  mounted(){
      this.$store.dispatch("setAllFood");
      this.$store.dispatch("setAllTypes");

  },

  data: () => ({
    //
  }),
};
</script>

<!-- backgroun repeat i ostatak, wrap,clip -->

<style scoped>

#app{
  font-family:"Lato", sans-serif;
}

.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('assets/wall.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center top;
    background-size: cover; 
  }
</style>
