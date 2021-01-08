<template>
  <v-container>
    <v-app-bar app flat dark color="dark">

     <v-toolbar :key="navbarKey" flat>

      <v-toolbar-title> 
        <v-btn  @click="home()" text style="height:60px;font-size:20px;"> 
          <v-icon large color="dark">
            mdi-home
          </v-icon>
          Fast Food 
        </v-btn>
        </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>

        <v-btn text @click="workers()" v-show="workersShow()">
          <v-icon color="dark">
            mdi-briefcase
          </v-icon>
          Workers
        </v-btn>

        <v-btn text @click="clients()" v-show="clientsShow()">
          <v-icon color="dark">
            mdi-account-group
          </v-icon>
          Clients
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
    <Workers app v-show="this.boolWorkers" />
    <Clients app v-show="this.boolClients" />
    <Login ref="login" />
    <Register ref="register" />

  </v-container>
</template>

<script>
import Menu from "../views/Menu.vue";
import FoodType from "../views/FoodType";
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import Workers from "../components/Admin/Workers"
import Clients from "../components/Admin/Clients"
import axios from "../axios/index"
import jwt_decode from 'jwt-decode'


  export default {
    name: 'Home',

    data(){

        return{
          boolMenu : false,
          boolHome: true,
          boolFoodType: false,
          boolWorkers: false,
          boolClients:false,
        };
    },
    components:{
      Menu,
      FoodType,
      Login,
      Register,
      Clients,
      Workers
    },
    
    methods:{
      home(){
        this.boolMenu = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false

      },
      menu(){
        if(this.token.type == "Worker"){
          this.$store.dispatch("setAllFood");
          this.$store.dispatch("setAllTypes");
        }
        this.boolMenu = true
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        
      },
      foodtype(){
        if(this.token.type == "Worker")
          this.$store.dispatch("setAllTypes");
        this.boolMenu = false
        this.boolFoodType = true
        this.boolWorkers = false
        this.boolClients = false
      },
      login(){
        this.$refs.login.dialog = true;
      },
      register(){
        this.$refs.register.dialog = true;
      },
      clients(){
         if(this.token.type == "Admin")
          this.$store.dispatch("setClients");
        this.boolMenu = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = true
      },
      workers(){
         if(this.token.type == "Admin")
          this.$store.dispatch("setWorkers");
        this.boolMenu = false
        this.boolFoodType = false
        this.boolWorkers = true
        this.boolClients = false
       
      },
      logout(){
        axios.get("/user/logout").then(async()=>{
          await localStorage.removeItem("Authorization")
          await delete axios.defaults.headers.common["Authorization"];
          await this.$store.dispatch("setToken", "")
          await this.$store.dispatch("setNavbarKey")
          await this.home()
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
      workersShow(){
        if(this.token.type =="Admin")
          return true;
        return false;
      },
      clientsShow(){
        if(this.token.type =="Admin")
          return true;
        return false;
      },
      menuShow(){
        if(this.token.type =="Worker")
          return true;
        return false;
      },
      foodtypeShow(){
         if(this.token.type =="Worker")
          return true;
        return false;
      },
      orderShow(){
         if(this.token.type == "Worker" || this.token.type =="Admin" || this.token.type =="Deliverer")
          return false;
        return true;
      },
      cartShow(){
         if(this.token.type == "Worker" || this.token.type =="Admin" || this.token.type =="Deliverer")
          return false;
        return true;
      }

  
    },
    mounted(){
    
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
