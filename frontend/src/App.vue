<template>
  <v-app id="app">
      <span class="bg"/> 
      <Home/>
  </v-app>
</template>

<script>
import Home from './components/Home';
import jwt_decode from "jwt-decode"
import axios from './axios/index'


export default {
  name: 'App',

  components: {
    Home,
  },

  async mounted(){
      if(this.token != ""){
        axios.defaults.headers.common['Authorization'] = this.jwt
      }
      if(this.token.type == "Client" || this.token ==""){

        if(localStorage.getItem('cartFood') === null)
          localStorage.setItem("cartFood", JSON.stringify([]))
        if(localStorage.getItem('cartMix') === null)
          localStorage.setItem("cartMix", JSON.stringify([]))

        const cartFood = localStorage.getItem('cartFood')
        const cartMix = localStorage.getItem('cartMix')
      
        await this.$store.dispatch("setCartFoodStorage", cartFood)
        await this.$store.dispatch("setCartMixStorage", cartMix)
      }
      this.$store.dispatch("setAllFood");
      this.$store.dispatch("setAllTypes");
  },

  computed:{
      token:function(){
      const t = this.$store.getters.getToken
      if(t != "")
        return jwt_decode(t);
      return t;
    },
    jwt:function(){
      const t = this.$store.getters.getToken
      return t;
    },
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
