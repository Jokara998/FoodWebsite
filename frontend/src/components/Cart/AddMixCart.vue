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
  </v-dialog>
</template>

<script>
export default {
    data(){
        return{
            dialog:false,
            valid:false,
            mix:{},
            selectedAmount:"",
            amountRules: [
                v => !!v || 'Required',
                v => v!=null || 'Required',
                v => v!="" || 'Requiredd',
                v => v!=null && String(v).length <= 2 || 'Invalid.',
                v => !isNaN(v) || 'Invalid.'
            ],

        }
    },
    methods:{
        async addToCart(){
            if(this.$refs.form.validate()){
                let cartObject = {
                    mix:this.mix,
                    amount:this.selectedAmount,
                    type:"mix",
                }
                await this.$store.dispatch("setCart", cartObject, "mix")
                this.$refs.form.reset();
                this.dialog = false
            }
        },
        close(){
            this.$refs.form.reset();
            this.dialog = false
        }
    }
}
</script>

<style scoped>

</style>