<template>
    <v-container>
         <v-dialog color="dark" dark max-width="500px" v-model="dialog" persistent>

                <v-card style="border:1px solid #D3D3D3" dark>
                    <v-card-title class="headline">
                        <div> Reject Order? </div>
                    </v-card-title>
                <v-form ref="form">
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                    md="12"
                                    >
                                        <v-textarea
                                            v-model="message"
                                            label="Reject Reason"
                                            :counter="50"
                                            :rules="messageRules"
                                            required
                                            rows="5"
                                        ></v-textarea>

                                </v-col>
                            </v-row>
                        </v-container>
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
                        Confirm
                    </v-btn>

                     <v-btn
                        color="red darken-1"
                        text
                        @click="dialog = false; $refs.form.reset()"
                    >
                        <v-icon color="dark" left>
                            mdi-close-circle-outline
                        </v-icon>
                        Cancel
                    </v-btn>


                    </v-card-actions>
                </v-form>
                </v-card>

            </v-dialog>

                <v-dialog color="dark" dark max-width="500px" v-model="dialog1" persistent>

                <v-card>
                    <v-card-title class="headline">
                        <div> Order State! </div>
                    </v-card-title>
                    <v-card-text>
                        <div> Order is canceled!</div>
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
                        Cancel
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
            valid:false,
            dialogLoading:false,
            dialog1:false,
            message:"",
            order:{},
            messageRules: [
                v => !!v || 'Reject reason is required',
                v => v!=null || 'Reject reason is required',
                v => v!="" || 'Reject reason is required',
                v => v!=null && v.length <= 50 || 'Reject reason must be less than 50 characters.',
            ],
        }
    },
    components:{
        Loader,
    },
    methods:{
        async confirm(){
            if(this.$refs.form.validate()){
                this.dialogLoading = true;
                await axios.patch("/order/reject/"+this.order.id,
                    {
                        state:"CANCELED",
                        message:this.message

                    }
                ).then(async ()=>{
                    await this.$store.dispatch("setOrders", "PROCESSING");
                    this.dialogLoading = false;
                    this.$refs.form.reset()
                    this.dialog = false;
                    this.dialog1 = true;
                }).catch(()=>{
                    this.dialogLoading = false
                }) 
            }
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