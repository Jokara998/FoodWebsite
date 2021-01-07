<template>
  <v-container>
    <v-app-bar app flat dark color="dark">

     <v-toolbar :key="navbarKey" flat>

      <v-toolbar-title> <v-btn  @click="home()" text style="height:60px"> Fast Food </v-btn></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-btn text @click="home()" >
          <v-icon color="dark">
            mdi-home
          </v-icon>
          Home
        </v-btn>
        
        <v-btn text @click="menu()" v-show="menuShow()">
          <v-icon color="dark">
            mdi-silverware
          </v-icon>
          Menu
        </v-btn>

         <v-btn text @click="foodtype()" v-show="foodtypeShow()">
          <v-icon color="dark">
            mdi-food
          </v-icon>
          Food Type
        </v-btn>


        <v-btn text v-show="orderShow()">
          <v-icon color="dark" >
            mdi-hamburger
          </v-icon>
          Order Food
        </v-btn>      
    
        <v-btn text v-show="cartShow()">
          <v-icon color="dark">
            mdi-cart-variant
          </v-icon>
          Cart
        </v-btn>

        
        <v-btn text @click="login()" v-show="loginShow()">
          <v-icon color="dark">
            mdi-account
          </v-icon>
          Log in
        </v-btn>

        <v-btn text @click="register()" v-show="loginShow()">
          <v-icon color="dark">
            mdi-account-plus
          </v-icon>
          Register
        </v-btn>

        <v-btn text @click="logout()" v-show="logoutShow()">
          <v-icon color="dark">
            mdi-account-arrow-right
          </v-icon>
          Log out
        </v-btn>

      </v-toolbar-items>
      
    </v-toolbar>

    </v-app-bar>
    

    <br>
    <br>
    
    <Menu app v-show="this.boolMenu" />
    <FoodType app v-show="this.boolFoodType" />
    <Login ref="login" />
    <Register ref="register" />

  </v-container>
</template>

<script>
import Menu from "../views/Menu.vue";
import FoodType from "../views/FoodType";
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import axios from "../axios/index"
import jwt_decode from 'jwt-decode'


  export default {
    name: 'Home',

    data(){

        return{
          boolMenu : false,
          boolHome: true,
          boolFoodType: false,
        };
    },
    components:{
      Menu,
      FoodType,
      Login,
      Register
    },
    
    methods:{
      home(){
        this.boolMenu = false
        this.boolFoodType = false

      },
      menu(){
        this.boolMenu = true
        this.boolFoodType = false
      },
      foodtype(){
        this.boolMenu = false
        this.boolFoodType = true
      },
      login(){
        this.$refs.login.dialog = true;
      },
      register(){
        this.$refs.register.dialog = true;
      },
      logout(){
        axios.get("/user/logout").then(async()=>{
          await localStorage.removeItem("Authorization")
          await delete axios.defaults.headers.common["Authorization"];
          await this.$store.dispatch("setToken", "")
          await this.$store.dispatch("setNavbarKey")
          await this.$router.push("/")
        })
     

      },
      // SHOW NAVBAR BUTTONS
      loginShow(){
        if(this.token == "")
          return true;
        return false;
      },
      logoutShow(){
        if(this.token != "")
          return true;
        return false;
      },
      menuShow(){
        return true;
      },
      foodtypeShow(){
        return true;
      },
      orderShow(){
        return true;
      },
      cartShow(){
        return true;
      }

  
    },
    mounted(){
        this.$store.dispatch("setAllFood");
        this.$store.dispatch("setAllTypes");

    },

    computed:{
      navbarKey(){
        return this.$store.getters.getNavbarKey;
      },
      token:function(){
        const t = this.$store.getters.getToken
        if(t != "")
          return jwt_decode(t);
        return t;
      }
    }

  }
</script>
