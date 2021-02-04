<template>
    <v-container >
            <v-dialog color="dark" dark max-width="900px" v-model="dialog" persistent>

                    <template>
                        <v-stepper v-model="e1">
                            <v-stepper-header>
                            <v-stepper-step
                                :complete="e1 > 1"
                                step="1"
                            >
                                Orderer Information
                            </v-stepper-step>

                            <v-divider></v-divider>

                            <v-stepper-step
                                :complete="e1 > 2"
                                step="2"
                            >
                               Order Preview
                            </v-stepper-step>
                            
                            </v-stepper-header>

                            <v-stepper-items>
                            <v-stepper-content step="1">
                                    <v-card>
                                        <v-card-text style="padding:40px">
                                                <v-form ref="addressForm" v-model="valid" lazy-validation>
                                                    <v-row>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="name" counter="30" :rules="nameRules" label="Name" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-shield-account-outline
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="surname" counter="30" :rules="surnameRules" label="Surname" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-shield-account-outline
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="address" counter="30" :rules="addressRules" label="Address" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-map-marker
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="12" md="6">
                                                            <v-text-field v-model="phone" counter="15" :rules="phoneRules" hint="Telephone:0645896236" label="Telephone" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-phone
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>  

                                                        <v-col cols="12" md="6">
                                                             <v-text-field outlined  v-show="this.token != '' " v-model="coupon" counter="15" :rules="couponRules" label="Coupon">
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-label-percent-outline
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>    
                                                        <v-col cols="12" md="6">
                                                            
                                                            <v-checkbox
                                                                v-show="this.token != '' "
                                                                v-model="checkbox"
                                                            >
                                                             <template v-slot:label>
                                                                    <div>
                                                                    <span v-if="$vuetify.breakpoint.width >= 420"> Use profile information </span>
                                                                    <span v-else-if="$vuetify.breakpoint.width < 420" style="font-size:12px"> Use profile information </span>
                                                                    <v-tooltip top color="primary">
                                                                        <template v-slot:activator="{ on }">
                                                                        <span
                                                                            style="color:#005eb6;font-size:20px"
                                                                            v-on="on"
                                                                        >
                                                                            ?
                                                                        </span>
                                                                        </template>
                                                                        <span v-if="$vuetify.breakpoint.width >= 420"> Use profile information(fullname, phone and address) for order delivery? </span>
                                                                        <span v-else-if="$vuetify.breakpoint.width < 420" style="font-size:12px">Use profile information(fullname, phone and address) for order delivery? </span>
                                                                        
                                                                    </v-tooltip>
                                                                    </div>
                                                                </template>
                                                            </v-checkbox>                                                          
                                                        </v-col>
                                                    </v-row>
                                                    <v-divider />
                                                    <v-row>
                                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                                        </v-col>
                                                        <v-spacer></v-spacer>
                                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                                            <v-btn x-medium block color="primary darken-1" @click="addressForm()"> Continue </v-btn>
                                                        </v-col>
                                                        <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end style="margin-right:10px">
                                                            <v-btn x-medium block color="red darken-1" @click="dialog=false; $refs.addressForm.reset();e1=1"> Close </v-btn>
                                                        </v-col>
                                                    </v-row>                                                                                          
                                                </v-form>
                                        </v-card-text>
                                    </v-card>
                                   

                                
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                     <v-card> 
                                        <v-card-text style="padding:20px">
                                                <v-form ref="finalForm" v-model="valid2" lazy-validation>
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
                                                                            <span class="hidden-sm-and-down" style="font-size:16px">{{name}} {{surname}}</span>
                                                                            <span class="hidden-md-and-up" style="font-size:8px">{{name}} {{surname}}</span>
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
                                                                            <span class="hidden-sm-and-down" style="font-size:16px">{{address}}</span>
                                                                            <span class="hidden-md-and-up" style="font-size:8px">{{address}}</span>
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
                                                                            <span class="hidden-sm-and-down" style="font-size:16px">{{phone}}</span>
                                                                            <span class="hidden-md-and-up" style="font-size:8px">{{phone}}</span>
                                                                            
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
                                                                    v-for="(item) in this.cartFood" :key="item.id" 
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
                                                                    v-for="(item) in this.cartMix" :key="item.id" 
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
                                                    <v-row>
                                                        <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                                        </v-col>
                                                        <v-spacer></v-spacer>
                                                        <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                                                            <v-btn x-medium block color="primary darken-1" @click="finish()"> Finish </v-btn>
                                                        </v-col>
                                                        <v-col class="d-flex" cols="12" sm="2" xsm="12" align-end style="margin-right:10px">
                                                            <v-btn x-medium block color="red darken-1" @click="dialog=false; $refs.addressForm.reset(); e1=1; coupon = ''; realCoupon = {validate:0, coupon:undefined} "> Close </v-btn>
                                                        </v-col>
                                                    </v-row>                                                                                          
                                                </v-form>
                                        </v-card-text>
                                    </v-card>
                            </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </template>
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
            v-model="dialogSuccess"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
               <v-card dark style="border:2px solid #ffffff">
                   <v-card-title>
                        <v-icon color="green" class="hidden-sm-and-down">
                            mdi-check-circle-outline
                        </v-icon>
                         <v-icon color="green" class="hidden-md-and-up" small>
                            mdi-check-circle-outline
                        </v-icon>
                        <span class="hidden-sm-and-down"  style="font-size:25px;display:inline"> Request Successful </span>
                        <span class="hidden-md-and-up" style="font-size:18px"> Request Successful </span>
                   </v-card-title>

                   <v-card-text>
                        <span class="hidden-sm-and-down"  style="font-size:20px;display:inline"> Order received! </span>
                        <span class="hidden-md-and-up" style="font-size:13px"> Order received! </span>
                       
                   </v-card-text>

                   <v-card-actions>
                            <v-col md="8" sm="7" />
                            <v-col md="4" sm="5">
                                <v-btn color="green" @click="closeAll()" style="justify-content:end">
                                    <v-icon color="black">
                                        mdi-close-circle
                                    </v-icon>
                                    Close
                                </v-btn>
                           </v-col>
                   </v-card-actions>
               </v-card>
            </v-dialog>

             <v-dialog
            v-model="dialogError"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
               <v-card dark style="border:2px solid #ffffff">
                   <v-card-title>
                        <v-icon color="red" class="hidden-sm-and-down">
                            mdi-close-circle
                        </v-icon>
                         <v-icon color="red" class="hidden-md-and-up" small>
                            mdi-close-circle
                        </v-icon>
                       <span class="hidden-sm-and-down"  style="font-size:18px;display:inline"> Code invalid/expired! </span>
                       <span class="hidden-md-and-up" style="font-size:12px"> Code invalid or expired! </span>
                   </v-card-title>

                   <v-card-actions style="justify-content:end">
                           <v-col md="8" sm="7" />
                           <v-col md="4" sm="5">
                                <v-btn color="red" @click="closeError()" style="justify-content:end">
                                    <v-icon color="black">
                                        mdi-close-circle
                                    </v-icon>
                                    <span >Close</span>
                                </v-btn>
                           </v-col>
                   </v-card-actions>
               </v-card>
            </v-dialog>
           
     </v-container>
</template>

<script>
import axios from "../../axios/index"
import jwt_decode from "jwt-decode"
import Loader from '../Loaders/Loader'

export default {
    data(){
        return{
            dialog:false,
            dialogLoading:false,
            dialogSuccess:false,
            dialogError:false,
            valid:false,
            valid2:false,
            name:"",
            surname:"",
            address:"",
            phone:"",
            coupon:"",
            e1:1,
            checkbox:false,
            cartFood:[],
            cartMix:[],

            nameRules:[
                v => !!v || 'Name is required',
                v => v!=null || 'Name is required',
                v => v!="" || 'Name is required',
                v => v!=null && v.length <= 30 || 'Name must be less than 30 characters.',
            ],

            surnameRules:[
                v => !!v || 'Surname is required',
                v => v!=null || 'Surname is required',
                v => v!="" || 'Surname is required',
                v => v!=null && v.length <= 30 || 'Surname must be less than 30 characters.',
            ],

            addressRules:[
                v => !!v || 'Address is required',
                v => v!=null || 'Address is required',
                v => v!="" || 'Address is required',
                v => v!=null && v.length <= 30 || 'Address must be less than 30 characters.',
            ],

            phoneRules:[
                v => !!v || 'Phone is required',
                v => v!=null || 'Phone is required',
                v => v!="" || 'Phone is required',
                v => v!=null && v.length <= 15 || 'Phone must be less than 15 characters.',
                v => !isNaN(v) || 'Phone must be a number.',
            ],

            couponRules:[
                v => v!=null && v.length <= 15 || 'Coupon must have less than 15 characters or equal.',
            ],

            realCoupon:{validate:0, coupon:undefined},
        }
    },

    components:{
        Loader,
    },

    methods:{
        closeError(){
            this.dialogError = false;
            this.coupon = ""
            this.realCoupon = {validate:0, coupon:undefined}
        },
        async addressForm(){
            if(this.checkbox && this.token != ""){
                
                await axios.get("/user/"+this.token.email).then((response)=>{
                    this.name = response.data.name
                    this.surname = response.data.surname
                    this.address = response.data.address
                    this.phone = response.data.phone
                })
                this.dialogLoading = true;
                await this.checkCoupon()
                if(this.realCoupon.validate == 0 || this.realCoupon.validate == 1){
                    this.dialogLoading = false;
                    this.e1 = 2
                }else{
                    this.dialogLoading = false;
                    this.dialogError = true;
                }
            }else{
                if(this.$refs.addressForm.validate()){
                    await this.checkCoupon()
                    this.dialogLoading = true;
                    if(this.realCoupon.validate == 0 || this.realCoupon.validate == 1){
                        this.dialogLoading = false;
                        this.e1 = 2
                    }else{
                        this.dialogLoading = false;
                        this.dialogError = true;
                    }
                }
            }
        },
        // check coupon
        async checkCoupon(){
            console.log(this.coupon)
            if(this.coupon != ""){
                await axios.get("/coupon/code/"+this.coupon).then((response)=>{
                    this.realCoupon = response.data;
                })
            }
            else
                this.realCoupon = {validate:0, coupon:undefined};
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
            this.cartFood.forEach(element=>{
                let price = this.returnFinalPrice(element)
                totalPrice = +totalPrice + +price
            })

            this.cartMix.forEach(element=>{
                let price = this.returnMixFinalPrice(element.mix, element.amount)       
                totalPrice = +totalPrice + +price
            })

            if(this.realCoupon.validate == 0)
                return String(totalPrice.toFixed(2));
            else if(this.realCoupon.validate == 1){
                console.log(this.realCoupon)
                return String(totalPrice.toFixed(2) - (totalPrice.toFixed(2)*(+this.realCoupon.coupon.percent)/100))
            }
        },

       async finish(){
           event.preventDefault();
           let ordered = {food:[],mix:[]}
           for(let f of this.cartFood){
               const foodObj = {
                   id:f.food.id,
                   amount:f.amount,
                   availability:f.availability,
                   name: f.food.name,
               }
               ordered.food.push(foodObj)
           }
            for(let f of this.cartMix){
                const mixObj = {
                   id:f.mix.id,
                   amount:f.amount,
                   name: f.mix.name,
               }
               ordered.mix.push(mixObj)
           }
           if(this.token != ""){
                await axios.post("/order/"+this.token.email,{
                    name: this.name,
                    surname: this.surname,
                    address: this.address,
                    phone: this.phone,
                    price: this.returnTotalPrice(),
                    ordered: ordered
                }).then(async ()=>{
                    if(this.realCoupon.validate == 1){
                        await axios.patch("/coupon/used/"+this.realCoupon.coupon._id).then(async()=>{
                            this.dialogLoading = false;
                            this.dialogSuccess = true;
                        })
                    }else{
                        this.dialogLoading = false;
                        this.dialogSuccess = true;
                    }
                }).catch(()=>{
                    this.dialogLoading = false
                }) 
           }else{
                this.dialogLoading = true;
                await axios.post("/order",{
                    name: this.name,
                    surname: this.surname,
                    address: this.address,
                    phone: this.phone,
                    price: this.returnTotalPrice(),
                    ordered: ordered
                }).then(async ()=>{
                    this.dialogLoading = false;
                    this.dialogSuccess = true;
                    

                }).catch(()=>{
                    this.dialogLoading = false
                }) 
           }
        },
        async closeAll(){
            await this.$store.dispatch("clearCart");
            this.dialogSuccess = false
        }
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
}
</script>

<style scoped>

</style>