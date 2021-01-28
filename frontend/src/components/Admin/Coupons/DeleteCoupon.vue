<template>
    <v-container >
            <v-dialog color="dark" dark max-width="600px" v-model="dialog" persistent>

            <v-card>
                <v-card-title>
                   
                    <v-icon color="dark" left>
                        mdi-tag-plus
                    </v-icon>
                    <span class="headline">Delete Coupon [ {{coupon.code}} ]</span>
                    </v-card-title>
                    <v-card-text>
                        <template>
                            <v-form v-model="valid" ref="form" lazy-validation>
                                <v-container style="padding:15px">
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="12"
                                        >
                                          <p>
                                              This action will result in deleting coupon.
                                          </p>
                                        </v-col>
                                    </v-row>
                                
                                <v-row>
                                    <v-col
                                        cols="12"
                                        md="6"
                                    />
                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                    
                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="addC()"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-check-circle-outline
                                        </v-icon>
                                            Confirm
                                        </v-btn>
                                     </v-col>

                                    <v-col
                                        cols="12"
                                        md="3"
                                    >
                                        <v-btn
                                            color="red darken-1"
                                            text
                                            @click="dialog = false;  $refs.form.reset();"
                                        >
                                        <v-icon color="dark" left>
                                            mdi-close-circle-outline
                                        </v-icon>
                                            Close
                                        </v-btn>
                                    </v-col>
                                    
                                </v-row>

                                </v-container>
                            </v-form>
                        </template>
                    </v-card-text>

                </v-card>
            </v-dialog>

            <!--procced dialog -->
            <v-dialog
            v-model="dialogLoading"
            hide-overlay
            persistent
            width="450"
            min-height="350"
            >

            <Loader/>
               
            </v-dialog>
    </v-container>
</template>

<script>
import axios from "../../../axios/index"
import Loader from "../../Loaders/Loader"

export default {

    data(){

        return{
            dialog:false,
            dialogLoading:false,
            valid:false,
            client:{},
            coupon:{},
        };
    },

    components:{
        Loader,
    },

    methods:{
        async addC(){
            if(this.$refs.form.validate()){
                event.preventDefault()
                this.dialogLoading = true
                await axios.delete('/coupon/'+this.coupon.id,{
                    percent:this.percent,
                }).then( async()=>{
                    await this.$store.dispatch("setCoupons", this.client.email)
                    this.$refs.form.reset()
                    this.dialogLoading = false
                    this.dialog = false
                })   
               
            }
        }
        
    }
}
</script>

<style scoped>

</style>