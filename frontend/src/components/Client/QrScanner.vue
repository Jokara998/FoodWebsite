<template>
    <v-container class="text-center" style="justify-content:center">
        <v-row style="justify-content:center">
            <v-card dark width="500px" height="320px" elevation-10>
                <v-card-title style="justify-content:center"> QR Scanner </v-card-title>
                <v-card-text> 
                    <v-row style="justify-content:center">
                        <qrcode-stream style="width:220px;height:220px" @decode="onDecode"></qrcode-stream>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>

        <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div class="hidden-xs-only"> Confirm Order Delivery? </div>
                        <div class="hidden-sm-and-up"> Confirm? </div>
                    </v-card-title>
                    <v-card-text>
                        <v-card> 
                            <v-card-text style="padding:20px">
                                    <v-form ref="finalForm">
                                        <v-row>
                                            <v-col cols="12" md="5">
                                                <v-list
                                                    nav
                                                    dense
                                                    disabled
                                                >
                                                    <v-list-item-group
                                                    color="primary"
                                                    >
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="title">
                                                                <span class="hidden-xs-only"> Orderer Information </span>
                                                                <span class="hidden-sm-and-up" style="font-size:16px"> Orderer</span>
                                                            </v-list-item-title>
                                                            
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <br>
                                                    <v-list-item>                                                          
                                                        <v-list-item-icon>
                                                            <v-icon class="hidden-sm-and-down">mdi-shield-account-outline</v-icon>
                                                            <v-icon class="hidden-md-and-up" small>mdi-shield-account-outline</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                <span class="hidden-sm-and-down" style="font-size:16px">{{order.fullname}}</span>
                                                                <span class="hidden-md-and-up" style="font-size:8px">{{order.fullname}}</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                        <v-list-item>
                                                        <v-list-item-icon>
                                                            <v-icon class="hidden-sm-and-down">mdi-map-marker</v-icon>
                                                            <v-icon class="hidden-md-and-up" small>mdi-map-marker</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                <span class="hidden-sm-and-down" style="font-size:16px">{{order.address}}</span>
                                                                <span class="hidden-md-and-up" style="font-size:8px">{{order.address}}</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                        <v-list-item>
                                                        <v-list-item-icon>
                                                            <v-icon class="hidden-sm-and-down">mdi-phone</v-icon>
                                                            <v-icon class="hidden-md-and-up" small>mdi-phone</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>                                                                      
                                                            <v-list-item-title>
                                                                <span class="hidden-sm-and-down" style="font-size:16px">{{order.phone}}</span>
                                                                <span class="hidden-md-and-up" style="font-size:8px">{{order.phone}}</span>
                                                                
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-col>
                                            <v-col cols="12" md="7">
                                                <v-list
                                                    nav
                                                    dense
                                                    disabled
                                                >
                                                    <v-list-item-group
                                                    color="primary"
                                                    >
                                                    <v-list-item>
                                                        <v-list-item-content>
                                                            <v-list-item-title class="title">
                                                                <span class="hidden-xs-only"> Order Information </span>
                                                                <span class="hidden-sm-and-up" style="font-size:16px"> Order</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-flex
                                                        v-for="(item) in this.order.ordered.food" :key="item.id" 
                                                    >
                                                    
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    <span class="hidden-sm-and-down" style="font-size:16px">Name</span>
                                                                    <span class="hidden-md-and-up" style="font-size:8px">Name</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span class="hidden-sm-and-down" style="color:#95c17e;font-size:16px"> {{item.food.name}} </span>
                                                                    <span class="hidden-md-and-up" style="color:#95c17e;font-size:8px"> {{item.food.name}}[{{item.amount}}] </span>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                            
                                                            <v-list-item-content>
                                                                <v-list-item-title>  
                                                                    <span class="hidden-sm-and-down" style="font-size:16px">Amount[Availability]</span>
                                                                    <span class="hidden-md-and-up" style="font-size:8px">Availability</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span class="hidden-sm-and-down" style="color:#95c17e;font-size:16px"> {{item.amount}} [{{item.availability}}] </span>
                                                                    <span class="hidden-md-and-up"  style="color:#95c17e;font-size:8px">  {{item.availability}} </span>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>

                                                            <v-list-item-content class="hidden-sm-and-down">
                                                                <v-list-item-title>Price</v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    <span style="color:#95c17e;font-size:16px"> {{returnFinalPrice(item)}} </span>
                                                                    <v-icon color="#95c17e" style="margin-top:-3px">
                                                                        mdi-currency-eur
                                                                    </v-icon>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>

                                                            
                                                        </v-list-item>
                                                    </v-flex>

                                                        <v-flex
                                                        v-for="(item) in this.order.ordered.mix" :key="item.id" 
                                                    >
                                                    
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    <span class="hidden-sm-and-down" style="font-size:16px">Name</span>
                                                                    <span class="hidden-md-and-up" style="font-size:8px">Name</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span class="hidden-sm-and-down" style="color:#95c17e;font-size:16px"> {{item.mix.name}} </span>
                                                                    <span class="hidden-md-and-up" style="color:#95c17e;font-size:8px"> {{item.mix.name}}[mix]</span>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                            
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    <span class="hidden-sm-and-down" style="font-size:16px">Amount[Availability]</span>
                                                                    <span class="hidden-md-and-up" style="font-size:8px">Availability</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span class="hidden-sm-and-down" style="color:#95c17e;font-size:16px"> {{item.amount}} [mix] </span>
                                                                    <span class="hidden-md-and-up"  style="color:#95c17e;font-size:8px">  mix </span>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>


                                                            <v-list-item-content class="hidden-sm-and-down">
                                                                <v-list-item-title>Price</v-list-item-title>
                                                                <v-list-item-subtitle>
                                                                    <span style="color:#95c17e;font-size:16px"> {{returnMixFinalPrice(item.mix, item.amount)}} </span>
                                                                    <v-icon color="#95c17e" style="margin-top:-3px">
                                                                        mdi-currency-eur
                                                                    </v-icon>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>

                                                            
                                                        </v-list-item>
                                                    </v-flex>
                                                    
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-col>
                                            
                                            <v-col cols="7" />
                                            <v-col cols="12" lg="4" md="5" sm="5" xs="7">
                                                <span class="hidden-md-and-up" style="font-size:15px;display:inline"> Total Price:  </span>    
                                                <span class="hidden-sm-and-down" style="font-size:22px;display:inline"> Total Price:  </span>    
                                                <v-icon small class="hidden-md-and-up" color="#95c17e" style="margin-top:-5px">
                                                        mdi-currency-eur
                                                </v-icon>
                                                <v-icon class="hidden-sm-and-down" color="#95c17e" style="margin-top:-11px">
                                                        mdi-currency-eur
                                                </v-icon>
                                                <span class="hidden-md-and-up" style="color:#95c17e;font-size:15px;display:inline"> {{returnTotalPrice()}} </span>  
                                                <span class="hidden-sm-and-down" style="color:#95c17e;font-size:22px;display:inline"> {{returnTotalPrice()}} </span>      
                                            </v-col>
                                                                                    
                                        </v-row>
                                        <v-divider />
                                                                                                                                
                                    </v-form>
                            </v-card-text>
                        </v-card>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
            
                        <v-btn
                            color="green darken-1"
                            text
                            @click="confirm()"
                        >
                            <v-icon color="dark" left>
                                mdi-check-circle-outline
                            </v-icon>
                            <span class="hidden-xs-only"> Confirm </span>
                        </v-btn>

                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialog = false"
                        >
                            <v-icon color="dark" left>
                                mdi-close-circle-outline
                            </v-icon>
                            <span class="hidden-xs-only"> Cancel </span>
                        </v-btn>


                    </v-card-actions>
                </v-card>

            </v-dialog>
            
            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
              <Loader/>
            </v-dialog>

            <v-dialog
                color="dark"
                max-width="400px"
                v-model="snackbar"
                centered
                dark
                >
                    <v-card elevation="8" dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div> 
                           <span style="display:inline;color:#E53935">Order Message </span>
                            <v-icon medium color="red darken-1">
                                mdi-alert-circle-outline
                            </v-icon> 
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-flex> 
                            <p justify-center > 
                                Order does not exist for {{token.email}}!
                            </p>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>

                        <v-btn
                        color="red darken-1"
                        text
                        @click="snackbar = false"
                        >
                        Close
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>

            <v-dialog color="dark" dark max-width="500px" v-model="dialog1" persistent>

                <v-card>
                    <v-card-title class="headline">
                        <div> Order State! </div>
                    </v-card-title>
                    <v-card-text>
                        <div> Order delivered!</div>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                     <v-btn
                        color="red darken-1"
                        text
                        @click="closeDelivery()"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Close </span>
                    </v-btn>


                    </v-card-actions>
                </v-card>

            </v-dialog>
    </v-container>
</template>


<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import axios from "../../axios/index"
import Loader from "../Loaders/Loader"
import jwt_decode from "jwt-decode"
export default {
    data(){
        return{
            dialog:false,
            dialogLoading:false,
            order:{ordered:{food:[],mix:[]}, id:"", fullname:"",address:"", phone:""},
            snackbar:false,
            dialog1:false,
        }
    },
    methods:{
        async onDecode(decodedString){
            await axios.get("/order/"+decodedString).then((response)=>{
                if(response.data && response.data.email == this.token.email){
                    this.order = response.data;
                    this.dialog = true;
                }else{
                    this.snackbar = true;
                }
            }).catch(()=>{
                this.snackbar = true;
            })
        },
        async confirm(){
            this.dialogLoading = true;
            await axios.patch("/order/"+this.order.id,
                {
                    state:"DELIVERED"
                }
            ).then(async ()=>{
                this.dialogLoading = false;
                this.dialog = false;
                this.dialog1 = true;
            }).catch(()=>{
                this.dialogLoading = false
            }) 
        },
        closeDelivery(){
            this.dialog1 = false; 
            this.$router.push("/")
        },
        // one Food Price
        returnFinalPrice(item){
            let price = item.food.price
            for(let i = 0; i < item.food.availability.length; i++){
                if(item.food.availability[i] == item.availability){
                   if(i == 0){
                       break;
                   }else{
                       price = price + (price + (i*0.1)+2)
                   }
                }
            }
            let total_price = item.amount * price // jos availability
            return total_price.toFixed(2);
        },
        // one MIX price
         returnMixPrice(item){
            let price = 0
            for(let i of item.food){
                let ind = 0
                for(let index in i.availability){
                    if(item.availability[0] == i.availability[index]){
                        ind = index
                        break;
                    }
                }
                if(ind == 0)
                    price += i.price
                else
                    price += i.price + (i.price + (ind*0.1)+2)
            }
            
            let total = price
            let prc = total - price*item.discount/100
            prc = prc.toFixed(2)
            return prc
        },
         returnMixFinalPrice(item, amount){
            let price = this.returnMixPrice(item)
            let prc = price * parseInt(amount)
            return prc.toFixed(2)
        },


        // Total Order Price
        returnTotalPrice(){
            let totalPrice = 0
            this.order.ordered.food.forEach(element=>{
                let price = this.returnFinalPrice(element)
                totalPrice = +totalPrice + +price
            })

            this.order.ordered.mix.forEach(element=>{
                let price = this.returnMixFinalPrice(element.mix, element.amount)       
                totalPrice = +totalPrice + +price
            })

            return String(totalPrice.toFixed(2));
            
        },
    },
    computed:{
        token:function(){
            const t = this.$store.getters.getToken
            if(t != "")
                return jwt_decode(t);
            return t;
        },
    },
    components:{
        QrcodeStream,
        Loader
    }
}
    
</script>

<style scoped>

</style>