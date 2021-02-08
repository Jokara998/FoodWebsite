<template>
    <v-dialog
        v-model="dialog"
        style="background-color:#f7f7f7;overflow:hidden"
        width="1400"
        persistent
        elevation-12

      >
        <v-card
            style="overflow:hidden"
        >
            <v-row>
                <v-app-bar dark>
                <v-toolbar
                    dark
                    flat
                    style="margin-left:12px;width:100%"
                >
                    <v-btn
                    icon
                    dark
                    @click="dialog = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$vuetify.breakpoint.width >= 400">{{food.name}} Details</v-toolbar-title>
                    <v-toolbar-title v-else-if="$vuetify.breakpoint.width < 400"> <span style="font-size:14px">{{food.name}} Details </span> </v-toolbar-title>
                </v-toolbar>
                </v-app-bar>
            </v-row>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="3" sm="4" xs="12">

             
                        
                            <v-card elevation="0" style="background-image: linear-gradient(80deg,#313131,#313131);">
                                <v-carousel
                                :continuous="false"
                                :show-arrows="false"
                                hide-delimiter-background
                                delimiter-icon="mdi-minus"
                                height="430px"
                                >

                                <v-flex class="img-flex"
                                >
                                    <img                   
                                        :src="toBase64()"
                                    />
                                </v-flex>

                                </v-carousel>                                              
                            </v-card>                                   
                    </v-col>
                    <v-col cols="12" md="9" sm="8" xs="12">
                        <v-divider></v-divider>
                        <v-list
                            v-if="$vuetify.breakpoint.width >= 400"
                            three-line
                            subheader
                            style="padding:10px"
                            >
                         
                            <v-list-item>
                                <v-list-item-content style="margin-left:20px">
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
                                    <span style="color:#95c17e;font-size:16px"> {{food.price}} </span></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-content style="margin-left:20px">
                                <v-list-item-title>Rate</v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-icon color="#ffbe41">
                                        mdi-star
                                    </v-icon>
                                    <span v-show="food.rate.number == 0"> Not Rated </span>
                                    <span v-show="food.rate.number > 0"> {{food.rate.rate}} [users:{{food.rate.number}}] </span> </v-list-item-subtitle>

                                    
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content> 
                                    <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> Description </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                               {{food.description}}
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>   
                                </v-list-item-content>

                                <v-list-item-content>
                                  <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> Availability </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                                <v-chip-group v-for="(item, i) in this.food.availability" :key="i">
                                                    <v-icon color="dark" left>
                                                        mdi-food-fork-drink
                                                    </v-icon> 
                                                    {{item}}
                                                </v-chip-group>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>                        
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider/>

                            <v-list-item>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                            cols="10"
                                            md="8"
                                            >                                           
                                                <v-select
                                                dense
                                                filled
                                                v-model="selectedAvailability"
                                                :items="food.availability"
                                                :rules="availabilityRules"
                                                label="Select Availability"
                                                ></v-select>
                                            </v-col>                                          
                                         </v-row>

                                          <v-row>
                                            <v-col
                                            cols="3"
                                            md="3"
                                            >
                                                <v-text-field
                                                    dense
                                                    solo
                                                    v-model="selectedAmount"
                                                    :rules="amountRules"
                                                    required
                                                    class="text-center"
                                                ></v-text-field>

                                            </v-col>
                                            <v-col
                                            cols="3"
                                            md="3"
                                            >
                                            
                                                <v-btn
                                                style="margin-left:-13px"
                                                    color="green darken-1"
                                                    text
                                                    outlined
                                                    @click="addToCart()"
                                                >
                                                <v-icon color="dark" left>
                                                    mdi-cart-arrow-down
                                                </v-icon>
                                                    Add To Cart
                                                </v-btn>
                                            </v-col>

                                            
                                         </v-row>                                                                                          
                                    </v-container>
                                </v-form>

                            </v-list-item>
                            
                            </v-list>

                            <v-list
                            v-else-if="$vuetify.breakpoint.width < 400"
                            three-line
                            subheader
                            style="padding:10px"
                            >
                         
                            <v-list-item>
                                <v-list-item-content style="margin-left:20px">
                                <v-list-item-title> <span style="font-size:12px">Price</span>
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
                                            <v-icon color="#f7b05e" left top style="margin-top:-4px;font-size:12px">
                                                mdi-information-variant
                                            </v-icon>
                                            </v-btn>
                                        </template>
                                    <span style="backgroud-color:red,font-size:12px">Price for First Availability!</span>
                                    </v-tooltip>
                                </v-list-item-title>
                                <v-list-item-subtitle>  
                                    <span style="color:#95c17e;font-size:12px"> {{food.price}}€ </span></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content style="margin-left:20px">
                                <v-list-item-title> <span style="font-size:12px">Rate </span> </v-list-item-title>
                                <v-list-item-subtitle>
                                    <span v-show="food.rate.number == 0" style="font-size:12px"> Not Rated⭐ </span>
                                    <span v-show="food.rate.number > 0" style="font-size:12px"> {{food.rate.rate}}⭐ [users:{{food.rate.number}}] </span> </v-list-item-subtitle>

                                    
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content> 
                                    <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> <span style="font-size:12px">Description </span> </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                               <span style="font-size:12px"> {{food.description}} </span>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>   
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-content>
                                  <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> <span style="font-size:12px"> Availability </span> </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                                <v-chip-group v-for="(item, i) in this.food.availability" :key="i">
                                                    <v-icon color="dark" left style="font-size:12px">
                                                        mdi-food-fork-drink
                                                    </v-icon> 
                                                    <span style="font-size:12px">{{item}} </span>
                                                </v-chip-group>
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>                        
                                </v-list-item-content>
                            </v-list-item>

                            <v-divider/>

                            <v-list-item>
                                <v-form v-model="valid" ref="form" lazy-validation>
                                    <v-container>
                                        <v-row>
                                            <v-col
                                            cols="12"
                                            md="8"
                                            >                                           
                                                <v-select
                                                dense
                                                filled
                                                v-model="selectedAvailability"
                                                :items="food.availability"
                                                :rules="availabilityRules"
                                                label="Select Availability"
                                                ></v-select>
                                            </v-col>                                          
                                         </v-row>

                                          <v-row>
                                            <v-col
                                            cols="12"
                                            md="3"
                                            >
                                                <v-text-field
                                                    dense
                                                    filled
                                                    label="Amount"
                                                    v-model="selectedAmount"
                                                    :rules="amountRules"
                                                    required
                                                    class="text-center"
                                                ></v-text-field>

                                            </v-col>
                                            <v-col
                                            cols="12"
                                            md="3"
                                            >
                                            
                                                <v-btn
                                                style="margin-left:0px"
                                                    color="green darken-1"
                                                    text
                                                    outlined
                                                    @click="addToCart()"
                                                >
                                                <v-icon color="dark" left>
                                                    mdi-cart-arrow-down
                                                </v-icon>
                                                   Add to Cart
                                                </v-btn>
                                            </v-col>

                                            
                                         </v-row>                                                                                          
                                    </v-container>
                                </v-form>

                            </v-list-item>
                            
                            </v-list>
                            <v-divider></v-divider> 
                            <v-row>
                                <v-col cols="10"/>   
                                <v-col cols="12" md="3" >    
                                <v-btn x-medium block color="blue darken-1" @click="showComments()">
                                        <v-icon>
                                        mdi-comment-text
                                    </v-icon> 
                                    Comments
                                </v-btn>     
                                </v-col>    
                            </v-row>               
                    </v-col>
                </v-row>
            </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>

        <ShowComments ref="commentsfood"/>

         <v-dialog
                dark
                persistent
                v-model="snackbar"
                max-width="450px"
                >
                <v-card dark style="border:1px solid #D3D3D3">
                     <v-card-title class="headline">
                        <div>  
                            <v-icon color="green darken-1">
                                mdi-check-circle
                            </v-icon>
                            Item added!
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="green darken-1"
                            text
                            @click="goToCart()"
                        >
                            <v-icon color="green darken-1">
                                mdi-cart-arrow-right
                            </v-icon>
                            <span v-if="$vuetify.breakpoint.width >= 400">Go To Cart </span>
                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px">Go To Cart </span>
                        </v-btn>

                        <v-btn
                            color="red darken-1"
                            text
                            @click="snackbar = false; dialog = false"
                        >
                            <v-icon color="red darken-1">
                                mdi-close-circle
                            </v-icon>
                            <span v-if="$vuetify.breakpoint.width >= 400">Close </span>
                            <span v-else-if="$vuetify.breakpoint.width < 400" style="font-size:10px">Close </span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
        
        </v-dialog>

        <Loader v-show="dialogLoading" />

      </v-dialog>
</template>

<script>
import ShowComments from "../Comments/ShowComments"
import axios from "../../axios/index"
import Loader from "../Loaders/Loader"

export default {
    data(){
        return{
            dialog:false,
            dialogLoading:false,
            snackbar:false,
            valid:false,
            food:{image:"", id:"",name:"",price:"", rate:{number:"",}},
            selectedAvailability:"",
            selectedAmount:"",
            amountRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => v!=null && String(v).length <= 2 || 'Invalid.',
                v => !isNaN(v) || 'Invalid.',
                v=> /^[0-9]+$/.test(v) || "Invalid.",
                v => v!=0 || 'Invalid number.',
            ],
            availabilityRules: [
                v => !!v || 'Food availability is required',
                v => v!=null || 'Food availability is required',
                v => v!="" || 'Food availability is required',
            ],

        }
    },
    methods:{
        toBase64(){
            return "data:image/png;base64, " + Buffer.from(this.food.image, "binary").toString("base64");
        },
        async addToCart(){
            if(this.$refs.form.validate()){
                let cartObject = {
                    id:this.food.id,
                    availability:this.selectedAvailability,
                    amount:this.selectedAmount,
                    type:"food",
                }

                await this.$store.dispatch("setCart", cartObject, "food")
                this.$refs.form.reset()
                this.snackbar = true;
            }
        },
        async showComments(){
            await axios.get("/rate/ratedFood/"+this.food.id).then((response) =>{
                this.$refs.commentsfood.comments = response.data
                this.$refs.commentsfood.dialog = true;

            })
        },
        async goToCart(){
            this.boolLoader = true
            const cartFood = localStorage.getItem('cartFood')
            const cartMix = localStorage.getItem('cartMix')
            await this.$store.dispatch("setCartFoodStorage", cartFood)
            await this.$store.dispatch("setCartMixStorage", cartMix)
            this.boolLoader = false;
            this.$router.push("/cart").catch(()=>{});
            
        }
    },
    components:{
        ShowComments,
        Loader,
    }
}
</script>

<style scoped>

.img-flex{
    width:470px;
    height:430px;
    margin: 0 auto; 
    padding: 15px;
    align-items: center;
    background-image: linear-gradient(80deg,#313131,#313131);
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

.food-name{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px;
    justify-content:center
}

.food-price{
    border-bottom: 2px solid #f5f5f5;
    background-color:#a6d78d;
    margin-left:10px;
    justify-content:center

}

.food-rate{
    border-bottom: 2px solid #f5f5f5;
    background-image: linear-gradient(190deg,#a6d78d, #95c17e);
    margin-right:10px;
    justify-content:center

}

.v-limit-select{
    height:70%;
    min-width: 30%;
    max-width: 30%;
}

.v-limit-select .v-list{
    
    margin-top: 35px;
    padding: 0px;
    border-radius: 2px;

}
</style>