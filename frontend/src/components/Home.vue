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

          <v-btn text @click="ordersWorkerFun()" v-show="worker()">
          <v-icon color="dark">
            mdi-truck-delivery-outline
          </v-icon>
          Orders
        </v-btn>

        <v-btn text @click="ordersDelivererFun()" v-show="deliverer()">
          <v-icon color="dark">
            mdi-truck-delivery-outline
          </v-icon>
          Orders
        </v-btn>

        <v-btn text @click="couponsFun()" v-show="admin()">
          <v-icon color="dark">
            mdi-label-percent-outline
          </v-icon>
          Coupons
        </v-btn>

         <v-btn text @click="commentsFun()" v-show="admin()">
          <v-icon color="dark">
            mdi-comment-text
          </v-icon>
          Comments
        </v-btn>


        <v-btn text @click="workers()" v-show="admin()">
          <v-icon color="dark">
            mdi-account-hard-hat
          </v-icon>
          Employees
        </v-btn>

        <v-btn text @click="clients()" v-show="admin()">
          <v-icon color="dark">
            mdi-account-group
          </v-icon>
          Clients
        </v-btn>

         <v-btn text @click="mix()" v-show="worker()">
          <v-icon color="dark">
            mdi-star-box-outline
          </v-icon>
          Mix
        </v-btn>
        
        <v-btn text @click="food()" v-show="worker()">
          <v-icon color="dark">
            mdi-hamburger
          </v-icon>
          Food
        </v-btn>

         <v-btn text @click="foodtype()" v-show="worker()">
          <v-icon color="dark">
            mdi-food
          </v-icon>
          Food Type
        </v-btn>

        <v-btn text @click="clientOrders()" v-show="clientR()">
          <v-icon color="dark">
            mdi-truck-delivery-outline
          </v-icon>
          My Orders
        </v-btn>

        <v-btn text @click="orderMix()" v-show="client()">
          <v-icon color="dark">
            mdi-star-box-outline
          </v-icon>
          Order Mix
        </v-btn>

        <v-btn text v-show="client()" @click="order_food()">
          <v-icon color="dark" >
            mdi-hamburger
          </v-icon>
          Order Food
        </v-btn>      
    
        <v-btn text v-show="client()" @click="cart_fun()">
          <v-btn
            readonly
            v-if="this.cartNumber >= 1"
            icon
            dark
            x-small
            color="red"
            outlined
          >
            <span > {{cartNumber}}</span>
          </v-btn>
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
    <v-flex v-show="boolHome">
      <v-row style="height:50px"/>
      <v-row>
        <v-col cols="7" />
        <v-col cols="5">
        <v-card dark flat style="background-color:transparent;" > 
          <v-card-title primary-title class="justify-end" style="font-size:65px; text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000;" wrap>
              Welcome 
              to
              Fast Food!
          </v-card-title>
        </v-card>
        </v-col>
      </v-row>
    </v-flex>

    <loader v-show="this.boolLoader"> </loader>


    
    <Mix app v-show="this.boolMix" />
    <Food app v-show="this.boolFood" />
    <FoodType app v-show="this.boolFoodType" />
    <Workers app v-show="this.boolWorkers" />
    <Clients app v-show="this.boolClients" />
    <ClientOrders app v-show="this.boolClientOrders" ref="clientOrders" />
    <OrderFood app ref="order" v-show="this.boolOrder" />
    <OrderMix app ref="orderMix" v-show="this.boolOrderMix" />
    <Coupon app ref="coupon" v-show="this.boolCoupon" />
    <Comments app ref="comments" v-show="this.boolComments"/>
    <OrdersDeliverer app ref="ordersDel"  v-show="this.boolOrdersDeliverer" />
    <OrdersWorker app  v-show="this.boolOrdersWorker" />
    <Cart app ref="cart" v-show="this.boolCart" />
    <Login ref="login" />
    <Register ref="register" />
   

  </v-container>
</template>

<script>
import Mix from "../views/Mix.vue";
import Food from "../views/Food.vue";
import FoodType from "../views/FoodType";
import OrderFood from "../views/OrderFood"
import OrderMix from "../views/OrderMix"
import OrdersDeliverer from "../views/OrdersDeliverer"
import OrdersWorker from "../views/OrdersWorker"
import Cart from "../views/Cart"
import ClientOrders from "../views/ClientOrders"
import Coupon from "../views/Coupon"
import Comments from "../views/Comments"
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
          boolLoader:false,
          boolFood : false,
          boolHome: true,
          boolFoodType: false,
          boolWorkers: false,
          boolClients:false,
          boolMix:false,
          boolOrder:false,
          boolCart:false,
          boolOrderMix:false,
          boolOrdersWorker:false,
          boolOrdersDeliverer:false,
          boolClientOrders:false,
          boolComments:false,
          boolCoupon:false,
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
      OrderFood,
      OrderMix,
      Cart,
      OrdersWorker,
      OrdersDeliverer,
      ClientOrders,
      Comments,
      Coupon
    },
    
    methods:{
      home(){
        this.boolFood = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolOrdersWorker = false
        this.boolOrdersDeliverer = false
        this.boolMix = false
        this.boolOrder = false;
        this.boolCart = false;
        this.boolOrderMix = false;
        this.boolClientOrders = false;
        this.boolLoader = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolHome = true

      },
      async mix(){
        this.boolMix = false
        this.boolHome = false
        this.boolFood = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolOrderMix = false;
        this.boolOrdersDeliverer = false
        this.boolOrdersWorker = false
        this.boolClientOrders = false;
        this.boolClients = false
        this.boolCart = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolOrder = false;
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setMixs");
          this.boolLoader = false;
          this.boolMix = true
        }
  
      },
      async food(){
        this.boolFood = false
        this.boolHome = false
        this.boolFoodType = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolOrdersDeliverer = false
        this.boolOrdersWorker = false
        this.boolMix = false
        this.boolOrderMix = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolClientOrders = false;
        this.boolCart = false;
        this.boolOrder = false;
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllFood");
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.boolFood = true

        }
      },
      async foodtype(){
        this.boolFoodType = false
        this.boolHome = false
        this.boolFood = false
        this.boolWorkers = false
        this.boolClients = false
        this.boolOrdersDeliverer = false
        this.boolOrderMix = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolOrdersWorker = false
        this.boolClientOrders = false;
        this.boolCart = false;
        this.boolOrder = false;
        this.boolMix = false
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.boolFoodType = true

        }
       
      },
      async order_food(){
        this.boolOrder = false;
        this.boolHome = false
        this.boolFoodType = false
        this.boolFood = false
        this.boolWorkers = false
        this.boolOrdersDeliverer = false
        this.boolOrderMix = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolClientOrders = false;
        this.boolOrdersWorker = false
        this.boolClients = false
        this.boolCart = false;
        this.boolMix = false
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.$refs.order.boolOrderTypeFood = false
          this.boolOrder = true

        }
       
      },

       async orderMix(){
        this.boolOrderMix = false;
        this.boolHome = false
        this.boolFoodType = false
        this.boolFood = false
        this.boolOrdersDeliverer = false
        this.boolWorkers = false
        this.boolOrdersWorker = false
        this.boolOrder = false;
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolClientOrders = false;
        this.boolClients = false
        this.boolCart = false;
        this.boolMix = false
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          await this.$store.dispatch("setMixs");
          this.boolLoader = false;
          this.boolOrderMix = true

        }
       
      },

       async cart_fun(){
        this.boolCart = false;
        this.boolHome = false
        this.boolOrder = false;
        this.boolFoodType = false
        this.boolOrdersDeliverer = false
        this.boolFood = false
        this.boolOrdersWorker = false
        this.boolClientOrders = false;
        this.boolWorkers = false
        this.boolCoupon = false;
        this.boolComments = false;
        this.boolOrderMix = false;
        this.boolClients = false
        this.boolMix = false
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          this.boolLoader = false;
          const cartFood = localStorage.getItem('cartFood')
          const cartMix = localStorage.getItem('cartMix')
          await this.$store.dispatch("setCartFoodStorage", cartFood)
          await this.$store.dispatch("setCartMixStorage", cartMix)
          this.boolCart = true
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
          this.boolHome = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolWorkers = false
          this.boolCoupon = false;
          this.boolComments = false;
          this.boolClientOrders = false;
          this.boolOrderMix = false;
          this.boolOrdersDeliverer = false
          this.boolOrder = false;
          this.boolOrdersWorker = false
          this.boolCart = false;
          this.boolMix = false
          this.boolLoader = true;
         if(this.token.type == "Admin"){
          await this.$store.dispatch("setClients");
          this.boolLoader = false;
          this.boolClients = true
         }
     
      },
      async workers(){
          this.boolWorkers = false
          this.boolHome = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolClients = false
          this.boolOrder = false;
          this.boolOrdersWorker = false
          this.boolClientOrders = false;
          this.boolOrderMix = false;
          this.boolCoupon = false;
          this.boolComments = false;
          this.boolOrdersDeliverer = false
          this.boolCart = false;
          this.boolMix = false
          this.boolLoader = true;
         if(this.token.type == "Admin"){
          await this.$store.dispatch("setWorkers");
          this.boolLoader = false;
          this.boolWorkers = true
        
         }
     
      },
      async ordersWorkerFun(){
          this.boolOrdersWorker = false
          this.boolWorkers = false
          this.boolHome = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolClients = false
          this.boolClientOrders = false;
          this.boolOrder = false;
          this.boolOrderMix = false;
          this.boolCoupon = false;
          this.boolComments = false;
          this.boolOrdersDeliverer = false
          this.boolCart = false;
          this.boolMix = false
          this.boolLoader = true;
          if(this.token.type == "Worker"){
            await this.$store.dispatch("setOrders", "PROCESSING");
            this.boolLoader = false;
            this.boolOrdersWorker = true
        
          }
      },
      async ordersDelivererFun(){
          this.boolLoader = true;
          this.boolOrdersDeliverer = false
          this.boolOrdersWorker = false
          this.boolWorkers = false
          this.boolHome = false
          this.boolFood = false
          this.boolClientOrders = false;
          this.boolFoodType = false
          this.boolClients = false
          this.boolCoupon = false;
          this.boolComments = false;
          this.boolOrder = false;
          this.boolOrderMix = false;
          this.boolCart = false;
          this.boolMix = false
          await this.$store.dispatch("setOrders", "READY");
          this.$refs.ordersDel.tab = "ready"
          this.boolLoader = false;
          this.boolOrdersDeliverer = true
        
      },

      async clientOrders(){
          this.boolLoader = true;
          this.boolClientOrders = false
          this.boolOrdersDeliverer = false
          this.boolOrdersWorker = false
          this.boolWorkers = false
          this.boolHome = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolClients = false
          this.boolOrder = false;
          this.boolCoupon = false;
          this.boolComments = false;
          this.boolOrderMix = false;
          this.boolCart = false;
          this.boolMix = false
          await this.$store.dispatch("setOrders", "SENT");      
          this.boolLoader = false;
          this.$refs.clientOrders.boolShow = true;
          this.$refs.clientOrders.boolShow1 = false;
          this.$refs.clientOrders.tab = "sent"
          this.boolClientOrders = true
      },
      couponsFun(){
        
      },

      async commentsFun(){
          this.boolLoader = true;
          this.boolComments = false;
          this.boolClientOrders = false
          this.boolOrdersDeliverer = false
          this.boolOrdersWorker = false
          this.boolWorkers = false
          this.boolHome = false
          this.boolFood = false
          this.boolFoodType = false
          this.boolClients = false
          this.boolOrder = false;
          this.boolCoupon = false;
          this.boolOrderMix = false;
          this.boolCart = false;
          this.boolMix = false
          await axios.get("/rate/"+0).then( async (response) =>{
              await this.$store.dispatch("setComments", response.data);      
              this.boolLoader = false;
              this.boolComments = true
          })
        
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
      admin(){
        if(this.token.type =="Admin")
          return true;
        return false;
      },
      worker(){
        if(this.token.type =="Worker")
          return true;
        return false;
      },
      deliverer(){
        if(this.token.type =="Deliverer")
          return true;
        return false;
      },
    
      client(){
         if(this.token.type == "Worker" || this.token.type =="Admin" || this.token.type =="Deliverer")
          return false;
        return true;
      },
      clientR(){
         if(this.token =="" || this.token.type == "Worker" || this.token.type =="Admin" || this.token.type =="Deliverer")
          return false;
        return true;
      },

  
    },
    mounted(){
      if(this.token != ""){
        axios.defaults.headers.common['Authorization'] = this.jwt
      }
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
      },
      cartNumber(){
        return this.$store.getters.getCartNumber;
      },
      jwt:function(){
        const t = this.$store.getters.getToken
        return t;
      },
   
    }

  }
</script>
