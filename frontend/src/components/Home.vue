<template>
  <v-container>
    
    <v-app-bar app flat dark color="dark">

     <v-toolbar :key="navbarKey" flat>

      <v-toolbar-title> 
        

        <v-btn  @click="home()" icon style="height:60px;font-size:10px;" class="hidden-lg-and-up"> <!-- xs,sm,md -->
          <v-icon medium color="dark">
            mdi-home
          </v-icon>
        </v-btn>
        
        <v-btn @click="home()" text style="height:60px;font-size:20px;" class="hidden-md-and-down" > <!-- lg,xl-->
          <v-icon large color="dark">
            mdi-home
          </v-icon>
          Fast Food 
        </v-btn>
        </v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="$vuetify.breakpoint.width < 1120">
        <v-menu offset-y dark>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon  v-on="on"/>
          </template>

          <v-list>
            <v-list-item-group>

              <v-list-item v-show="worker()" @click="ordersWorkerFun()">
                <v-list-item-icon>
                  <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Orders </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-show="deliverer()" @click="ordersDelivererFun()">
                <v-list-item-icon>
                  <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Orders </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

               <v-list-item @click="couponsClient()" v-show="clientR()">
                <v-list-item-icon>
                  <v-icon>mdi-label-percent-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> My Coupons </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="couponsFun()" v-show="admin()">
                <v-list-item-icon>
                  <v-icon>mdi-label-percent-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Coupons </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="commentsFun()" v-show="admin()">
                <v-list-item-icon>
                  <v-icon>mdi-comment-text</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Comments </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="workers()" v-show="admin()">
                <v-list-item-icon>
                  <v-icon>mdi-account-hard-hat</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Employees </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

               <v-list-item @click="clients()" v-show="admin()">
                <v-list-item-icon>
                  <v-icon>mdi-account-group</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Clients </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

               <v-list-item @click="mix()" v-show="worker()">
                <v-list-item-icon>
                  <v-icon>mdi-star-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Mix </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="food()" v-show="worker()">
                <v-list-item-icon>
                  <v-icon>mdi-hamburger</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Food </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="foodtype()" v-show="worker()">
                <v-list-item-icon>
                  <v-icon>mdi-food</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Food Type </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="clientOrders()" v-show="clientR()">
                <v-list-item-icon>
                  <v-icon>mdi-truck-delivery-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> My Orders </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="orderMix()" v-show="client()">
                <v-list-item-icon>
                  <v-icon>mdi-star-box-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Order Mix </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-show="client()" @click="order_food()">
                <v-list-item-icon>
                  <v-icon>mdi-hamburger</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Order Food </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-show="client()" @click="cart_fun()">
                <v-list-item-icon>
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
                </v-list-item-icon>
                <v-list-item-icon>
                  <v-icon>mdi-cart-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Cart </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="login()" v-show="loginShow()">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Log in </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="register()" v-show="loginShow()">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Register </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-show="clientR()" @click="qrscanner()">
                <v-list-item-icon>
                  <v-icon>mdi-qrcode-scan</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> QR Scanner </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-list-item @click="logout()" v-show="logoutShow()">
                <v-list-item-icon>
                  <v-icon>mdi-account-arrow-right</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title> Log out </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

            </v-list-item-group>
          </v-list>
        </v-menu>
      </div>

      <v-toolbar-items v-if="$vuetify.breakpoint.width >= 1120">

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

        <v-btn text @click="couponsClient()" v-show="clientR()">
          <v-icon color="dark">
            mdi-label-percent-outline
          </v-icon>
          My Coupons
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

        <v-btn text v-show="clientR()" @click="qrscanner()">
          <v-icon color="dark">
            mdi-qrcode-scan
          </v-icon>
          QR Scanner
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

    <v-main>
      <br>
      <br>
      <loader v-show="this.boolLoader"> </loader>
      <router-view v-show="this.boolRouter"> </router-view>
    </v-main>

    <Login ref="login" />
    <Register ref="register" />
   

  </v-container>
</template>

<script>

import Login from '../components/User/Login';
import Register from '../components/User/Register';
import Loader from '../components/Loaders/Loader'
import axios from "../axios/index"
import jwt_decode from 'jwt-decode'



  export default {
    name: 'Home',

    data(){

        return{
          boolLoader:false,
          boolRouter:false,
        };
    },
    components:{
     
      Login,
      Register,
      Loader,
    
    },
    
    methods:{
      home(){
        this.$router.push("/").catch(()=>{});
        this.$forceUpdate();
      },
      async mix(){
        this.boolRouter = false;
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setMixs");
          this.boolLoader = false;
          this.$router.push("/mix").catch(()=>{});
          this.boolRouter = true
        }
  
      },
      async food(){
        this.boolRouter = false;
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllFood");
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.$router.push("/food").catch(()=>{});
          this.boolRouter = true;

        }
      },
      async foodtype(){
        this.boolRouter = false;
        this.boolLoader = true;
        if(this.token.type == "Worker"){
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.$router.push("/foodtype").catch(()=>{});
          this.boolRouter = true;

        }
       
      },
      async order_food(){
        this.boolRouter = false;
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          await this.$store.dispatch("setAllTypes");
          this.boolLoader = false;
          this.$router.push("/orderfood").catch(()=>{});
          this.boolRouter = true
        }
       
      },

       async orderMix(){
        this.boolRouter = false;
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          await this.$store.dispatch("setMixs");
          this.boolLoader = false;
          this.$router.push("/ordermix").catch(()=>{});
          this.boolRouter = true

        }
       
      },

       async cart_fun(){
        this.boolRouter = false;
        this.boolLoader = true
        if(this.token.type == "Client" || this.token ==""){
          const cartFood = localStorage.getItem('cartFood')
          const cartMix = localStorage.getItem('cartMix')
          await this.$store.dispatch("setCartFoodStorage", cartFood)
          await this.$store.dispatch("setCartMixStorage", cartMix)
          this.boolLoader = false;
          this.$router.push("/cart").catch(()=>{});
          this.boolRouter = true
        }
       
      },
      login(){
        this.$refs.login.dialog = true;
      },
      register(){
        this.$refs.register.dialog = true;
      },
      async clients(){
          this.boolRouter = false;
          this.boolLoader = true;
          if(this.token.type == "Admin"){
            await this.$store.dispatch("setClients");
            this.boolLoader = false;
            this.$router.push("/clients").catch(()=>{});
            this.boolRouter = true
          }
     
      },
      async workers(){
        this.boolRouter = false;
        this.boolLoader = true;
        if(this.token.type == "Admin"){
          await this.$store.dispatch("setWorkers");
          this.boolLoader = false;
          this.$router.push("/workers").catch(()=>{});
          this.boolRouter = true
      
        }
     
      },
      async ordersWorkerFun(){
          this.boolRouter = false;
          this.boolLoader = true;
          if(this.token.type == "Worker"){
            await this.$store.dispatch("setOrders", "PROCESSING");
            this.boolLoader = false;
            this.$router.push("/ordersworker").catch(()=>{});
            this.boolRouter = true
        
          }
      },
      async ordersDelivererFun(){
          this.boolRouter = false;
          this.boolLoader = true;
          //await this.$store.dispatch("setOrders", "READY");
          this.boolLoader = false;
          this.$router.push("/ordersdeliverer").catch(()=>{});
          this.boolRouter = true
        
      },

      async clientOrders(){
          this.boolRouter = false;
          this.boolLoader = true;
          //await this.$store.dispatch("setOrders", "SENT");      
          this.boolLoader = false;
          this.$router.push("/clientorders").catch(()=>{});
          this.boolRouter = true
      },
      async couponsFun(){
          this.boolRouter = false;
          this.boolLoader = true;
          if(this.token.type == "Admin"){
            await this.$store.dispatch("setClientsApproved");      
            this.boolLoader = false;
            this.$router.push("/coupon").catch(()=>{});
            this.boolRouter = true
          }
      },

      async couponsClient(){
          this.boolRouter = false;
          this.boolLoader = true;
          if(this.token.type == "Client"){
            await this.$store.dispatch("setCoupons", this.token.email)
            this.boolLoader = false;
            this.$router.push("/clientCoupons").catch(()=>{});
            this.boolRouter = true
          }
      },

      async commentsFun(){
          this.boolRouter = false;
          this.boolLoader = true;
          if(this.token.type == "Admin"){
            await axios.get("/rate/"+0).then( async (response) =>{
                await this.$store.dispatch("setComments", response.data);      
                this.boolLoader = false;
                this.$router.push("/comments").catch(()=>{});
                this.boolRouter = true
            })
          }
        
      },
      async qrscanner(){
        this.boolRouter = false;
        this.boolLoader = true;
        this.boolLoader = false;
        await this.$router.push("/qrscanner").catch(()=>{});
        this.boolRouter = true

      },

      logout(){
        axios.get("/user/logout").then(async()=>{
          localStorage.removeItem("Authorization")
          delete axios.defaults.headers.common["Authorization"];
          await this.$store.dispatch("setToken", "")
          await this.$store.dispatch("setNavbarKey")
          await this.home()
          this.$forceUpdate();
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
