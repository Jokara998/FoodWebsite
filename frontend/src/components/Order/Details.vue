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
                    <v-toolbar-title>{{food.name}} Details</v-toolbar-title>
                </v-toolbar>
                </v-app-bar>
            </v-row>

                <v-card-text>
                    <v-row>
                        <v-col cols="3">

             
                        
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
                    <v-col cols="9">
                        <v-divider></v-divider>
                        <v-list
                            three-line
                            subheader
                            style="padding:10px"
                            >
                         
                            <v-list-item>
                                <v-list-item-content style="margin-left:20px">
                                <v-list-item-title>Food Price
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
                                <v-list-item-title>Food Rate</v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-icon color="#ffbe41">
                                        mdi-star
                                    </v-icon>
                                    <span> {{food.rate}} </span></v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>

                            <v-list-item>
                                <v-list-item-content> 
                                    <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> Food Description </v-expansion-panel-header>

                                            <v-expansion-panel-content>
                                               {{food.description}}
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>   
                                </v-list-item-content>

                                <v-list-item-content>
                                  <v-expansion-panels flat hover>
                                        <v-expansion-panel >
                                            <v-expansion-panel-header> Food Availability </v-expansion-panel-header>

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
                            <v-divider></v-divider>                           
                    </v-col>
                </v-row>
            </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            food:{},
            selectedAvailability:"",
            selectedAmount:"",
            amountRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => v!=null && String(v).length <= 2 || 'Invalid.',
                v => !isNaN(v) || 'Invalid.'
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
                console.log(this.selectedAvailability+","+this.selectedAmount)
                let cartObject = {
                    food:this.food,
                    availability:this.selectedAvailability,
                    amount:this.selectedAmount
                }

                await this.$store.dispatch("setCart", cartObject)
                this.$refs.form.reset()
            }
        }
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