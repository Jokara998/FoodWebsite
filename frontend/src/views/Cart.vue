<template>
   <v-container flat :key="cartKey">
        <br>
        <br>

        <v-card dark v-if="this.cartFood.length == 0 && this.cartMix.length == 0" >
            <v-card-title style="justify-content:center">
                Cart is empty.
            </v-card-title>
         
        </v-card>
    
        <v-card dark v-if="this.cartFood.length > 0 || this.cartMix.length > 0" width="100%" >
             <v-card-title style="justify-content:center">
               <span class="hidden-md-and-up" style="font-size:15px"> Cart </span>
               <span class="hidden-sm-and-down" style="font-size:25px"> Cart </span>
            </v-card-title>

            <v-flex
                v-for="(item,index) in this.cartFood" :key="item.id" 
            >

                <template >
                    <v-card height="410px" style="background-image:linear-gradient(80deg,#313131,#313131); padding:20px; margin:20px;">                       
                        <v-row>
                            <v-col cols="12" lg="2" class="hidden-md-and-down" >
                                <v-card>
                                    <v-carousel
                                    :continuous="false"
                                    :show-arrows="false"
                                    hide-delimiter-background
                                    delimiter-icon="mdi-minus"
                                    height="190px"
                                    >

                                    <v-flex class="img-flex"
                                    >
                                        <img                   
                                            :src="toBase64(item.food.image)"
                                        />
                                    </v-flex>

                                    </v-carousel>   
                                </v-card>    
                            </v-col> 
                            <v-col cols="12" lg="10" md="12">
                                <v-list 
                                    v-if="$vuetify.breakpoint.width >= 700"    
                                    three-line
                                    subheader
                                    >                            
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Name</v-list-item-title>
                                                <v-list-item-subtitle>  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.food.name}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                <v-list-item-title>Price 
                                                    <v-tooltip
                                                    dark 
                                                    color="#f7b05e"
                                                    top
                                                    >
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-btn
                                                            icon
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            small
                                                            readonly
                                                            >
                                                            <v-icon color="#f7b05e" left top style="margin-top:-4px">
                                                                mdi-information-variant
                                                            </v-icon>
                                                            </v-btn>
                                                        </template>
                                                    <span style="backgroud-color:red">Price for First Availability!</span>
                                                    </v-tooltip>
                                                    </v-list-item-title>
                                                <v-list-item-subtitle>  
                                                    <v-icon color="#95c17e">
                                                        mdi-currency-eur
                                                    </v-icon>
                                                    <span style="color:#95c17e;font-size:16px"> {{item.food.price}} </span>
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
                                                <v-list-item-title>Final Price</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    <v-icon color="#95c17e">
                                                        mdi-currency-eur
                                                    </v-icon>
                                                    <span style="color:#95c17e;font-size:16px"> {{returnFinalPrice(item)}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>

                                            
                                        </v-list-item>
                                </v-list>
                                <v-list 
                                    v-if="$vuetify.breakpoint.width < 700"    
                                    three-line
                                    subheader
                                    style="padding:10px"
                                    >                            
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-subtitle>  
                                                    <span style="color:#95c17e;font-size:14px"> {{item.food.name}}
                                                        [<span style="color:white;font-size:14px">{{item.amount}}</span>]
                                                    </span>
                                                </v-list-item-subtitle>                                      
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            
                                            <v-list-item-content>
                                                <v-list-item-subtitle>
                                                    
                                                    <span style="color:#95c17e;font-size:14px"> Total:{{returnFinalPrice(item)}} </span>
                                                    <v-icon color="#95c17e">                                                  
                                                        mdi-currency-eur
                                                    </v-icon>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
      
                                        </v-list-item>
                                </v-list>                                                 
                            </v-col>                     
                        </v-row>
                        <br>
                        <v-divider></v-divider>                     

                        <v-card-text>

                            <v-row style="justify-content: flex-end;">
                                    
                                <v-col class="d-flex" cols="12" lg="6" md="4" sm="4" xs="1" align-end>
                                    <v-btn x-medium block color="green darken-1" @click="editFoodItem(item, index)">
                                         <v-icon>
                                            mdi-circle-edit-outline
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 350">Edit Item</span>
                                        <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Edit Item</span>
                                    </v-btn>
                                </v-col>
                                <v-col class="d-flex" cols="12" lg="6" md="4" sm="4" xs="1" align-end>
                                    <v-btn x-medium block color="red darken-1" @click="deleteItem('food',index)">
                                        <v-icon>
                                            mdi-delete-circle-outline
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 350">Delete Item</span>
                                        <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Delete Item</span>
                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-card-text>

                    </v-card>   
                </template>  
            </v-flex>

            <!--MIX-->
            <v-flex
                v-for="(item,index) in this.cartMix" :key="item.id" 
            >
             <template>
                    <v-card height="410px" style="background-image:linear-gradient(80deg,#313131,#313131); padding:20px; margin:20px;">                       
                        <v-row>
                            <v-col cols="12" lg="2" class="hidden-md-and-down">
                                <v-card>
                                    <v-carousel
                                    :continuous="false"
                                    :show-arrows="false"
                                    hide-delimiter-background
                                    delimiter-icon="mdi-minus"
                                    height="190px"
                                    >

                                    <v-flex class="img-flex"
                                    >
                                        <img src="../assets/mix.gif">
                                    </v-flex>

                                    </v-carousel>   
                                </v-card>    
                            </v-col> 
                            <v-col cols="12" lg="10" md="12">
                                <v-list 
                                    class="hidden-sm-and-down"                  
                                    three-line
                                    subheader
                                    style="padding:10px"
                                    >                            
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-title>Name</v-list-item-title>
                                                <v-list-item-subtitle>  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.mix.name}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                            <v-list-item-content>
                                                <v-list-item-title>Price</v-list-item-title>
                                                <v-list-item-subtitle>  
                                                    <v-icon color="#95c17e">
                                                        mdi-currency-eur
                                                    </v-icon>
                                                    <span style="color:#95c17e;font-size:16px"> {{returnMixPrice(item.mix)}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-content>
                                                <v-list-item-title>Amount</v-list-item-title>
                                                <v-list-item-subtitle>  
                                                    <span style="color:#95c17e;font-size:16px"> {{item.amount}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                      
                                             <v-list-item-content>
                                                <v-list-item-title>Final Price</v-list-item-title>
                                                <v-list-item-subtitle>
                                                    <v-icon color="#95c17e">
                                                        mdi-currency-eur
                                                    </v-icon>
                                                    <span style="color:#95c17e;font-size:16px"> {{returnMixFinalPrice(item.mix, item.amount)}} </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>

                                            
                                        </v-list-item>
                                </v-list> 
                                <v-list 
                                    class="hidden-md-and-up"                  
                                    three-line
                                    subheader
                                    style="padding:10px"
                                    >                            
                                        <v-list-item>
                                            <v-list-item-content>
                                                <v-list-item-subtitle>  
                                                    <span style="color:#95c17e;font-size:14px"> {{item.mix.name}}
                                                        [<span style="color:white;font-size:14px"> {{item.amount}} </span>]
                                                    </span>
                                                </v-list-item-subtitle>                                      
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            
                                            <v-list-item-content>
                                                <v-list-item-subtitle>
                                                    
                                                    <span style="color:#95c17e;font-size:14px"> Total:{{returnMixFinalPrice(item.mix, item.amount)}} </span>
                                                    <v-icon color="#95c17e">
                                                        mdi-currency-eur
                                                    </v-icon>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
      
                                        </v-list-item>
                                </v-list>                                           
                            </v-col>                     
                        </v-row>
                        <br>
                        <v-divider></v-divider>                     

                        <v-card-text>

                            <v-row style="justify-content: flex-end; margin-top:5px">
                                    
                                <v-col class="d-flex" cols="12" lg="6" md="4" sm="4" xs="6" align-end>
                                    <v-btn x-medium block color="green darken-1" @click="editMixItem(item, index)">
                                         <v-icon>
                                            mdi-circle-edit-outline
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 350">Edit Item</span>
                                        <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Edit Item</span>

                                    </v-btn>
                                </v-col>
                                <v-col class="d-flex" cols="12" lg="6" md="4" sm="4" xs="6" align-end>
                                    <v-btn x-medium block color="red darken-1" @click="deleteItem('mix',index)">
                                        <v-icon>
                                            mdi-delete-circle-outline
                                        </v-icon> 
                                        <span v-if="$vuetify.breakpoint.width >= 350">Delete Item</span>
                                        <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Delete Item</span>

                                    </v-btn>
                                </v-col>
                            </v-row>

                        </v-card-text>

                    </v-card>   
                </template> 

            </v-flex>
            <v-flex>
                <v-card-text>

                    <v-row style="justify-content: flex-end;">
                        <v-col cols="7" />
                        <v-col cols="12" lg="3" md="4" sm="4" xs="6">
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

                    <v-row style="justify-content: flex-end; margin-top:5px">
                                    
                        <v-col class="d-flex" cols="12" lg="6" sm="4" xsm="2" align-end>
                           <v-btn medium block color="green darken-1" @click="orderFromCart()">
                                <v-icon>
                                    mdi-cash-register
                                </v-icon>
                                <span v-if="$vuetify.breakpoint.width >= 350">Order Food</span>
                                <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Order Food</span> 
                            </v-btn>   
                        </v-col>
                        <v-col class="d-flex" cols="12" lg="6" sm="4" xsm="2" align-end>
                           <v-btn medium block color="red darken-1" @click="clearCart()">
                                <v-icon>
                                    mdi-cart-remove
                                </v-icon>
                                <span v-if="$vuetify.breakpoint.width >= 350">Clear Cart</span>
                                <span v-else-if="$vuetify.breakpoint.width < 350" style="font-size:11px">Clear Cart</span>  
                            </v-btn>   
                        </v-col>
                    </v-row>
                   
                    
                </v-card-text>
            </v-flex>
            <br>
        </v-card>

         <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >
              <Loader/>
        </v-dialog>

        <EditFoodItem ref="editFoodItem" />
        <EditMixItem ref="editMixItem" />
        <OrderCart ref="orderCart" />

    </v-container>
</template>

<script>
import Loader from '../components/Loaders/Loader'
import EditFoodItem from '../components/Cart/EditFoodItem'
import EditMixItem from '../components/Cart/EditMixItem'
import OrderCart from "../components/Cart/OrderCart"
export default {

    data(){

        return{
            search: '',
            dialogLoading:'',
            headers: [
                {
                    text: '',
                    align: 'start',
                    value: 'food',
                    sortable:false,
                },
              
            ],
          
        };
    },

    components:{
        Loader,
        EditFoodItem,
        EditMixItem,
        OrderCart
    },

    methods:{
        toBase64(data){
            return "data:image/png;base64, " + Buffer.from(data.data, "binary").toString("base64");
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

            return totalPrice.toFixed(2);
        },
       
        async deleteItem(type, index){
            this.dialogLoading = true;
            let payload = {type:type, index:index}
            await this.$store.dispatch("deleteItem", payload);
            this.dialogLoading = false;
        },
        editFoodItem(item, index){
            this.$refs.editFoodItem.selectedAmount = item.amount
            this.$refs.editFoodItem.selectedAvailability = item.availability
            this.$refs.editFoodItem.item = item;
            this.$refs.editFoodItem.index = index;
            this.$refs.editFoodItem.dialog = true;
        },

        editMixItem(item, index){
            this.$refs.editMixItem.selectedAmount = item.amount
            this.$refs.editMixItem.item = item;
            this.$refs.editMixItem.index = index;
            this.$refs.editMixItem.dialog = true;
        },

        async clearCart(){
            this.dialogLoading = true;
            await this.$store.dispatch("clearCart");
            this.$forceUpdate()
            this.dialogLoading = false;

        },
        orderFromCart(){
            this.$refs.orderCart.cartFood = this.cartFood
            this.$refs.orderCart.cartMix = this.cartMix
            this.$refs.orderCart.dialog = true;
        }
    },

    computed:{     
        cartKey(){
            return this.$store.getters.getCartKey;
        },
        cartFood(){
            return this.$store.getters.getCartFood;
        },
        cartMix(){
            return this.$store.getters.getCartMix;
        }
        
    }
}
</script>

<style scoped>
.img-flex{
    width:190px;
    height:190px;
    margin: 0 auto; 
    padding: 15px;
    align-items: center;
    top: 0;
    left: 0;
    background-size: cover;
    border-radius:0px
    
}

.img-flex img{
    object-fit: contain;
    width: 100%;
    height: 100%;
    align-self:center;    

}

</style>