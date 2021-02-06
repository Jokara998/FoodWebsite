<template>
    <v-container class="text-center" style="justify-content:center">
        <v-row style="justify-content:center">
            <v-card dark width="500px" height="320px" elevation-10>
                <v-card-title style="justify-content:center"> QR Scanner </v-card-title>
                <v-card-text> 
                    <v-row style="justify-content:center">
                        <qrcode-stream :camera="camera" style="width:220px;height:220px" @decode="onDecode"></qrcode-stream>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-row>

        <v-dialog color="dark" dark max-width="650px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div> 
                            <span v-if="$vuetify.breakpoint.width >= 400"> Confirm Delivery? </span> 
                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:18px"> Confirm Delivery? </span> 
                            
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-card> 
                            <v-card-text style="padding:20px" v-if="order">
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
                                                                <span v-if="$vuetify.breakpoint.width >= 1000"> Orderer Information </span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:18px"> Orderer Information</span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:14px"> Orderer Information</span>
                                                            </v-list-item-title>
                                                            
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <br>
                                                    <v-list-item>                                                          
                                                        <v-list-item-icon>
                                                            <v-icon v-if="$vuetify.breakpoint.width >= 400">mdi-shield-account-outline</v-icon>
                                                            <v-icon v-else-if="$vuetify.breakpoint.width < 400" small>mdi-shield-account-outline</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                <span v-if="$vuetify.breakpoint.width >= 400" style="font-size:16px">{{order.fullname}}</span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:13px">{{order.fullname}}</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                        <v-list-item>
                                                        <v-list-item-icon>
                                                            <v-icon v-if="$vuetify.breakpoint.width >= 400">mdi-map-marker</v-icon>
                                                            <v-icon v-else-if="$vuetify.breakpoint.width < 400" small>mdi-map-marker</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>
                                                            <v-list-item-title>
                                                                <span v-if="$vuetify.breakpoint.width >= 400" style="font-size:16px">{{order.address}}</span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:13px">{{order.address}}</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                        <v-list-item>
                                                        <v-list-item-icon>
                                                            <v-icon v-if="$vuetify.breakpoint.width >= 400">mdi-phone</v-icon>
                                                            <v-icon v-else-if="$vuetify.breakpoint.width < 400" small>mdi-phone</v-icon>
                                                        </v-list-item-icon>
                                                        <v-list-item-content>                                                                      
                                                            <v-list-item-title>
                                                                <span v-if="$vuetify.breakpoint.width >= 400" style="font-size:16px">{{order.phone}}</span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:13px">{{order.phone}}</span>
                                                                
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
                                                                <span v-if="$vuetify.breakpoint.width >= 1000"> Order Information </span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:18px"> Order Information</span>
                                                                <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:14px"> Order Information</span>
                                                            </v-list-item-title>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                    <v-flex
                                                        v-for="(item) in this.order.ordered.food" :key="item.id" 
                                                    >
                                                    
                                                        <v-list-item>
                                                            <v-list-item-content>
                                                                <v-list-item-title>
                                                                    <span v-if="$vuetify.breakpoint.width >= 1000" style="font-size:18px"> Name </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:15px"> Name</span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:12px"> Name</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span v-if="$vuetify.breakpoint.width >= 1000" style="font-size:18px;color:#95c17e;"> {{item.name}} [{{item.amount}}] [{{item.availability}}] </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:15px;color:#95c17e;"> {{item.name}}[{{item.amount}}][{{item.availability}}]</span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:12px;color:#95c17e;"> {{item.name}} [{{item.amount}}] [{{item.availability}}]</span>
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
                                                                     <span v-if="$vuetify.breakpoint.width >= 1000" style="font-size:18px"> Name </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:15px"> Name</span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:12px"> Name</span>
                                                                </v-list-item-title>
                                                                <v-list-item-subtitle>  
                                                                    <span v-if="$vuetify.breakpoint.width >= 1000" style="font-size:18px;color:#95c17e;"> {{item.name}} [{{item.amount}}] [mix] </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 1000 && $vuetify.breakpoint.width >= 500" style="font-size:15px;color:#95c17e;"> {{item.name}}[{{item.amount}}][mix]</span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 500" style="font-size:12px;color:#95c17e;"> {{item.name}} [{{item.amount}}] [mix]</span>
                                                                </v-list-item-subtitle>
                                                            </v-list-item-content>
                                                            
                                                        </v-list-item>
                                                    </v-flex>
                                                    
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-col>
                                            <v-col cols="7" />
                                            <v-col cols="12" lg="4" md="5" sm="5" xs="7">
                                                <span v-if="$vuetify.breakpoint.width >= 1000" style="font-size:22px;display:inline"> Total Price:  </span>   
                                                <span v-else-if="$vuetify.breakpoint.width < 1000" style="font-size:15px;display:inline"> Total Price:  </span>    
                                                <span v-if="$vuetify.breakpoint.width >= 1000" style="color:#95c17e;font-size:22px;display:inline"> {{order.price}} </span>    
                                                <span v-else-if="$vuetify.breakpoint.width < 1000" style="color:#95c17e;font-size:15px;display:inline"> {{order.price}} </span>     
                                                <v-icon v-if="$vuetify.breakpoint.width >= 1000" color="#95c17e" style="margin-top:-5px">
                                                        mdi-currency-eur
                                                </v-icon>
                                                <v-icon v-else-if="$vuetify.breakpoint.width < 1000" small color="#95c17e" style="margin-top:-1px">
                                                        mdi-currency-eur
                                                </v-icon>
                                              
                                                
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
                            @click="closeConfirmDelivery()"
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
                            <p justify-center :key="errorKey" > 
                               {{errorMessage}}
                            </p>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>

                        <v-btn
                        color="red darken-1"
                        text
                        @click="closeError()"
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
            camera:"auto",
            errorMessage:"",
            errorKey:0
        }
    },
    methods:{
        async onDecode(decodedString){
            this.camera = "off";
            await axios.get("/order/"+decodedString).then((response)=>{
                if(response.data && response.data.email == this.token.email && response.data.state == "TRANSPORT"){
                    this.order = response.data;
                    this.dialog = true;
                }else{
                    if(response.data.email != this.token.email)
                        this.errorMessage =  "Order does not exist for "+this.token.email+"!"
                    else if(response.data.state == "DELIVERED" && response.data.state != "TRANSPORT")
                        this.errorMessage =  "Order already delivered for "+this.token.email+"!"
                    this.snackbar = true;
                    this.errorKey += 1
                }
            }).catch(()=>{
                this.errorMessage =  "Order does not exist for "+this.token.email+"!"
                this.snackbar = true;
                this.errorKey += 1
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
        closeConfirmDelivery(){
            this.dialog = false;
            this.camera = "auto";
            this.$forceUpdate()
        },
        closeError(){
            this.snackbar = false;
            this.camera = "auto";
            this.$forceUpdate()
        },
       
         returnMixFinalPrice(item, amount){
            let price = this.returnMixPrice(item)
            let prc = price * parseInt(amount)
            return prc.toFixed(2)
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