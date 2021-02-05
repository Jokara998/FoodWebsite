<template>
    <v-container>
         <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card dark style="border:1px solid #D3D3D3">
                    <v-card-title class="headline">
                        <div class="hidden-xs-only"> Confirm Order Delivery? </div>
                        <div class="hidden-sm-and-up"> Confirm? </div>
                    </v-card-title>
                    <v-card-text>
                        <div class="hidden-xs-only">Confirm that order is delivered?</div>
                        <div class="hidden-sm-and-up"> Confirm Delivery? </div>
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
                        @click="close()"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        <span class="hidden-xs-only"> Close </span>
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
    </v-container>
</template>

<script>
import axios from '../../axios/index'
import Loader from "../../components/Loaders/Loader"
export default {
    data(){
        return{

            dialog:false,
            dialog1:false,
            dialogLoading:false,
            valid:false,
            order:{}
        }
    },
    components:{
        Loader,
    },
    methods:{
        async confirm(){
            this.dialogLoading = true;
            await axios.patch("/order/"+this.order.id,
                {
                    state:"DELIVERED"
                }
            ).then(async ()=>{
                await this.$store.dispatch("setOrders", "TRANSPORT");
                this.dialogLoading = false;
                this.dialog = false;
                this.dialog1 = true;
            }).catch(()=>{
                this.dialogLoading = false
            }) 
        },
        close(){
            this.dialog1 = false; 
            this.$parent.$forceUpdate();
        }
    }
}
</script>

<style scoped>

</style>