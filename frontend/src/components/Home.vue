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

         <v-btn text @click="mix()" v-show="mixShow()">
          <v-icon color="dark">
            mdi-star-box-outline
          </v-icon>
          Mix
        </v-btn>
        
        <v-btn text @click="food()" v-show="foodShow()">
          <v-icon color="dark">
            mdi-hamburger
          </v-icon>
          Food
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

    <loader v-show="this.mixLoader"> </loader>
    <loader v-show="this.foodLoader"> </loader>
    <loader v-show="this.foodTypeLoader"> </loader>
    <loader v-show="this.clientsLoader"> </loader>
    <loader v-show="this.workersLoader"> </loader>
    
    <Mix app v-show="this.boolMix" />
    <Food app v-show="this.boolFood" />
    <FoodType app v-show="this.boolFoodType" />
    <Workers app v-show="this.boolWorkers" />
    <Clients app v-show="this.boolClients" />
    <Login ref="login" />
    <Register ref="register" />

  </v-container>
</template>

<script>
import Mix from "../views/Mix.vue";
import Food from "../views/Food.vue";
import FoodType from "../views/FoodType";
import Login from '../components/User/Login';
import Register from '../components/User/Register';
import Workers from "../components/Admin/Workers"
import Clients from "../components/Admin/Clients"
import Loader from '../components/Loaders/Loader'
import axios from "../axios/index"
import jwt_decode from 'jwt-decode'


  export default {
    name: 'Home',

    data(){

        return{
          boolFood : false,
          boolHome: true,
          boolFoodType: false,
          boolWorkers: false,
          boolClients:false,
          boolMix:false,
          mixLoader:false,
          foodLoader:false,
          foodTypeLoader:false,
          clientsLoader:false,
          workersLoader:false
        };
    },
    components:{
      Food,
      FoodType,
      Login,
      Register,
      Clients,
      Workers,
      Mix,
      Loader,
    },
    
    methods:{
      home(){
        this.boolFood = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolMix = false

      },
      async mix(){
        this.boolMix = false
        this.boolFood = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        this.mixLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setMixs");
          this.mixLoader = false;
          this.boolMix = true
        }
  
      },
      async food(){
        this.boolFood = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolMix = false
        this.foodLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllFood");
          await this.$store.dispatch("setAllTypes");
          this.foodLoader = false;
          this.boolFood = true

        }
      },
      async foodtype(){
        this.boolFoodType = false
        this.boolFood = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolMix = false
        this.foodTypeLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllTypes");
          this.foodTypeLoader = false;
          this.boolFoodType = true

        }
       
      },
      login(){
        this.$refs.login.dialog = true;
      },
      register(){
        this.$refs.register.dialog = true;
      },
      async clients(){
          this.boolClients = false;
          this.boolFood = false
          this.boolFoodType = false
          this.boolWorkers = false
          this.boolMix = false
          this.clientsLoader = true;
         if(this.token.type == "Admin"){
          await this.$store.dispatch("setClients");
          this.clientsLoader = false;
          this.boolClients = true
         }
     
      },
      async workers(){
          this.boolWorkers = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolClients = false
          this.boolMix = false
          this.workersLoader = true;
         if(this.token.type == "Admin"){
          await this.$store.dispatch("setWorkers");
          this.workersLoader = false;
          this.boolWorkers = true
        
         }
     
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
      mixShow(){
        if(this.token.type =="Worker")
          return true;
        return false;
      },
      foodShow(){
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
