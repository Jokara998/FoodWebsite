<template>
  <v-dialog color="dark" dark max-width="450px" v-model="dialog" persistent>
      <v-card>
          <v-card-title>
              <v-col cols="10" v-if="$vuetify.breakpoint.width >= 420">
                Mix Name: <span style="color:#95c17e;"> {{mix.name}} </span>
              </v-col>
            <v-col cols="10" v-else-if="$vuetify.breakpoint.width < 420">
                Mix Name: 
                <div>
                    <span style="color:#95c17e;"> {{mix.name}} </span>
                </div>
              </v-col>
              <v-col cols="2">
                  <v-btn
                        color="red darken-1"
                        icon
                        @click="close()"
                    >
                    <v-icon color="dark">
                        mdi-close-circle-outline
                    </v-icon>
                    </v-btn>
              </v-col>
          </v-card-title>
          <v-card-text>
                    <v-divider/>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-container>
                                                                           
                                <v-row>
                                    <v-col
                                    cols="12"
                                    md="4"
                                    sm="7"
                                    >
                                        <v-text-field
                                            dense
                                            solo
                                            v-model="selectedAmount"
                                            :rules="amountRules"
                                            required
                                            class="text-center"
                                            label="Amount"
                                        ></v-text-field>

                                    </v-col>
                                    <v-col
                                    cols="12"
                                    md="3"
                                    sm="5"
                                    >
                                    
                                        <v-btn
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
          </v-card-text>
      </v-card>

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
import Loader from "../Loaders/Loader"
export default {
    data(){
        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            snackbar:false,
            mix:{},
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

        }
    },
    components:{
        Loader,
    },
    methods:{
        async addToCart(){
            if(this.$refs.form.validate()){
                let cartObject = {
                    id:this.mix.id,
                    amount:this.selectedAmount,
                    type:"mix",
                }
                await this.$store.dispatch("setCart", cartObject, "mix")
                this.$refs.form.reset();
                this.snackbar = true;               
            }
        },
        close(){
            this.$refs.form.reset();
            this.dialog = false
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
    }
}
</script>

<style scoped>

</style>