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
                                Order Address
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
                                                        <v-col cols="6">
                                                            <v-text-field v-model="name" counter="30" :rules="nameRules" label="Name" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-shield-account-outline
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-text-field v-model="surname" counter="30" :rules="surnameRules" label="Surname" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-shield-account-outline
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-text-field v-model="address" counter="30" :rules="addressRules" label="Address" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-map-marker
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>
                                                        <v-col cols="6">
                                                            <v-text-field v-model="phone" counter="15" :rules="phoneRules" hint="Telephone:0645896236" label="Telephone" required>
                                                                <template v-slot:prepend>                                                   
                                                                    <v-icon>
                                                                        mdi-phone
                                                                    </v-icon>
                                                                </template>
                                                            </v-text-field>
                                                        </v-col>  
                                                        <v-col cols="12">
                                                            <v-checkbox
                                                                v-show="this.token != '' "
                                                                v-model="checkbox"
                                                                label="I want to use my profile address."
                                                            ></v-checkbox>
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
                                        <v-card-text style="padding:40px">
                                                <v-form ref="finalForm" v-model="valid2" lazy-validation>
                                                    <v-row>
                                                        <v-col cols="5">
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
                                                                            Orderer Information
                                                                        </v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item>                                                          
                                                                    <v-list-item-icon>
                                                                        <v-icon>mdi-shield-account-outline</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>{{name}} {{surname}}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                 <v-list-item>
                                                                    <v-list-item-icon>
                                                                        <v-icon>mdi-map-marker</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>{{address}}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                 <v-list-item>
                                                                    <v-list-item-icon>
                                                                        <v-icon>mdi-phone</v-icon>
                                                                    </v-list-item-icon>
                                                                    <v-list-item-content>
                                                                        <v-list-item-title>{{phone}}</v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                </v-list-item-group>
                                                            </v-list>
                                                        </v-col>
                                                        <v-col cols="7">
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
                                                                            Order Information
                                                                        </v-list-item-title>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-flex
                                                                    v-for="(item) in this.cart" :key="item.id" 
                                                                >
                                                                
                                                                    <v-list-item>
                                                                        <v-list-item-content>
                                                                            <v-list-item-title>Name</v-list-item-title>
                                                                            <v-list-item-subtitle>  
                                                                                <span style="color:#95c17e;font-size:16px"> {{item.food.name}} </span>
                                                                            </v-list-item-subtitle>
                                                                        </v-list-item-content>
                                                                      
                                                                        <v-list-item-content>
                                                                            <v-list-item-title>Amount</v-list-item-title>
                                                                            <v-list-item-subtitle>  
                                                                                <span style="color:#95c17e;font-size:16px"> {{item.amount}} </span>
                                                                            </v-list-item-subtitle>
                                                                        </v-list-item-content>

                                                                        <v-list-item-content>
                                                                            <v-list-item-title>Availability</v-list-item-title>
                                                                            <v-list-item-subtitle>  
                                                                                <span style="color:#95c17e;font-size:16px"> {{item.availability}} </span>
                                                                            </v-list-item-subtitle>
                                                                        </v-list-item-content>

                                                                        <v-list-item-content>
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
                                                             
                                                                </v-list-item-group>
                                                            </v-list>
                                                        </v-col>
                                                        <v-col cols="5">
                                                         
                                                        </v-col>
                                                        <v-col cols="3">
                                                         
                                                        </v-col>
                                                        <v-col cols="4">
                                                            <span style="font-size:22px;display:inline"> Total Price:  </span>    
                                                            <v-icon color="#95c17e" style="margin-top:-11px">
                                                                    mdi-currency-eur
                                                            </v-icon>
                                                            <span style="color:#95c17e;font-size:22px;display:inline"> {{returnTotalPrice()}} </span>       
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
                                                            <v-btn x-medium block color="red darken-1" @click="dialog=false; $refs.addressForm.reset(); e1=1"> Close </v-btn>
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
     </v-container>
</template>

<script>
import axios from "../../axios/index"
import jwt_decode from "jwt-decode"
export default {
    data(){
        return{
            dialog:false,
            valid:false,
            valid2:false,
            name:"",
            surname:"",
            address:"",
            phone:"",
            e1:1,
            checkbox:false,
            cart:[],

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
        }
    },

    methods:{
        async addressForm(){
            if(this.checkbox && this.token != ""){
                
                await axios.get("/user/"+this.token.email).then((response)=>{
                    this.name = response.data.name
                    this.surname = response.data.surname
                    this.address = response.data.address
                    this.phone = response.data.phone
                })
                this.e1 = 2
            }else{
                if(this.$refs.addressForm.validate()){
                    this.e1 = 2
                }
            }
        },
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
        returnTotalPrice(){
            let totalPrice = 0
            this.cart.forEach(element=>{
                let price = element.food.price
                for(let i = 0; i < element.food.availability.length; i++){
                    if(element.food.availability[i] == element.availability){
                    if(i == 0){
                        break;
                    }else{
                        price = price + (price + (i*0.1)+2)
                    }
                    }
                }
                let total_price = element.amount * price 
                totalPrice += total_price
            })
            
            return totalPrice.toFixed(2);
        },
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